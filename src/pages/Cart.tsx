import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrationsuprabase/client"; // ✅ usa seu cliente existente

const Cart = () => {
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedWaiter, setSelectedWaiter] = useState("");
  const [waiters, setWaiters] = useState<
    { id: string; name: string; phone: string; is_available: boolean }[]
  >([]);
  const [loadingWaiters, setLoadingWaiters] = useState(true);

  // 🔹 Buscar garçons da tabela "waiters"
  useEffect(() => {
    const fetchWaiters = async () => {
      setLoadingWaiters(true);
      const { data, error } = await supabase
        .from("waiters")
        .select("id, name, phone, is_available")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Erro ao carregar garçons:", error);
        toast({
          title: "Erro ao carregar garçons",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setWaiters(data || []);
      }
      setLoadingWaiters(false);
    };

    fetchWaiters();
  }, [toast]);

  const handleSendOrder = () => {
    if (!customerName || !tableNumber || !paymentMethod || !selectedWaiter) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos antes de enviar o pedido.",
        variant: "destructive",
      });
      return;
    }

    const waiter = waiters.find((w) => w.id === selectedWaiter);
    const message = `*Novo Pedido*\n\nNome: ${customerName}\nMesa: ${tableNumber}\nPagamento: ${paymentMethod}\n\n*Itens:*\n- X-Burger - R$ 25,90\n\nTotal: R$ 25,90`;

    if (waiter?.phone) {
      const whatsappUrl = `https://wa.me/${waiter.phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } else {
      toast({
        title: "Erro",
        description: "Garçom selecionado não possui número válido.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/menu">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Cardápio
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Finalizar Pedido</h1>

        {/* ... Itens e dados do cliente permanecem iguais ... */}

        {/* 🔹 Escolha do Garçom */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Escolha o Garçom</h2>

          {loadingWaiters ? (
            <p className="text-muted-foreground">Carregando garçons...</p>
          ) : waiters.length === 0 ? (
            <p className="text-muted-foreground">Nenhum garçom cadastrado.</p>
          ) : (
            <RadioGroup value={selectedWaiter} onValueChange={setSelectedWaiter}>
              {waiters.map((waiter) => (
                <div key={waiter.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={waiter.id}
                    id={`waiter-${waiter.id}`}
                    disabled={!waiter.is_available}
                  />
                  <Label htmlFor={`waiter-${waiter.id}`}>
                    {waiter.name} {!waiter.is_available && "(Indisponível)"}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        <Button size="lg" className="w-full gap-2 text-lg" onClick={handleSendOrder}>
          <Send className="h-5 w-5" />
          Enviar Pedido
        </Button>
      </main>
    </div>
  );
};

export default Cart;
