import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url?: string;
  is_available: boolean;
  is_promotion: boolean;
}

const Menu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega categorias e produtos do Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        const [{ data: catData, error: catError }, { data: prodData, error: prodError }] =
          await Promise.all([
            supabase.from("categories").select("id, name").order("display_order", { ascending: true }),
            supabase
              .from("products")
              .select("id, name, description, price, image_url, category_id, is_available, is_promotion")
              .order("created_at", { ascending: true }),
          ]);

        if (catError) throw catError;
        if (prodError) throw prodError;

        setCategories(catData || []);
        setProducts(prodData || []);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === selectedCategory)
    : products;

  const addToCart = (productId: string) => {
    setCart((prev) => [...prev, productId]);
  };

  if (loading) {
    return <div className="p-8 text-center text-lg">Carregando cardápio...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link to="/cart">
                <Button variant="default" size="sm" className="gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Carrinho ({cart.length})
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Nosso Cardápio</h1>

        {/* Categorias */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Lista de produtos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              Nenhum produto encontrado.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.is_promotion && (
                    <Badge className="absolute top-2 right-2 bg-destructive">
                      Promoção
                    </Badge>
                  )}
                  {!product.is_available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="secondary">Indisponível</Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      disabled={!product.is_available}
                      onClick={() => addToCart(product.id)}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Menu;
