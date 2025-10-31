import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UtensilsCrossed, ShoppingCart, UserCog } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const handleContact = () => {
    const phone = "5513991597827"; // coloque seu número
    const message = "Olá! gostaria de saber mais sobre o projeto";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Garçom Online</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/admin">
              <Button variant="outline" size="sm" className="gap-2">
                <UserCog className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-foreground">
              Bem-vindo ao nosso
              <span className="block text-primary mt-2">Cardápio Digital</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Navegue pelo nosso cardápio, monte seu pedido e envie direto para o garçom.
              Rápido, fácil e sem complicações!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/menu" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-lg px-8">
                <UtensilsCrossed className="h-5 w-5" />
                Ver Cardápio
              </Button>
            </Link>
            <Link to="/cart" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-lg px-8">
                <ShoppingCart className="h-5 w-5" />
                Meu Carrinho
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Cardápio Completo</h3>
              <p className="text-muted-foreground text-sm">
                Navegue por todas as categorias e encontre seus pratos favoritos
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Pedido Fácil</h3>
              <p className="text-muted-foreground text-sm">
                Monte seu carrinho e envie tudo de uma vez pelo WhatsApp
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCog className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Atendimento Rápido</h3>
              <p className="text-muted-foreground text-sm">
                Escolha seu garçom e receba seu pedido com agilidade
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border p-4 text-center text-sm text-muted-foreground">
        Desenvolvido com <span className="text-red-500">❤️</span> pelo técnico Henrico Amalfi!{" "}
        Gostou do projeto?{" "}
        <button
          onClick={handleContact}
          className="underline text-primary hover:text-primary/80"
        >
          Entre em contato clicando aqui
        </button>
      </footer>
    </div>
  );
};

export default Index;
