import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data - will be replaced with backend data later
const mockCategories = [
  { id: 1, name: "Lanches" },
  { id: 2, name: "Porções" },
  { id: 3, name: "Pastéis" },
  { id: 4, name: "Bebidas" },
];

const mockProducts = [
  {
    id: 1,
    name: "X-Burger",
    description: "Hambúrguer artesanal com queijo, alface e tomate",
    price: 25.90,
    categoryId: 1,
    image: "/placeholder.svg",
    available: true,
    onSale: false,
  },
  {
    id: 2,
    name: "Batata Frita",
    description: "Porção de batatas fritas crocantes",
    price: 18.00,
    categoryId: 2,
    image: "/placeholder.svg",
    available: true,
    onSale: true,
  },
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = selectedCategory
    ? mockProducts.filter((p) => p.categoryId === selectedCategory)
    : mockProducts;

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

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
            <Link to="/cart">
              <Button variant="default" size="sm" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Carrinho ({cart.length})
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Nosso Cardápio</h1>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          {mockCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.onSale && (
                  <Badge className="absolute top-2 right-2 bg-destructive">
                    Promoção
                  </Badge>
                )}
                {!product.available && (
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
                    disabled={!product.available}
                    onClick={() => addToCart(product.id)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Menu;
