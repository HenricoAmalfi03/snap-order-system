import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Waiter {
  id: string;
  name: string;
  phone: string;
  is_available: boolean;
}

const Cart = () => {
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedWaiter, setSelectedWaiter] = useState("");
  const [waiters, setWaiters] = useState<Waiter[]>([]);
  const [loadingWaiters, setLoadingWaiters] = useState(true);

  // 🔹 Buscar garçons reais do Supabase
  useEffect(() => {
    async function fetchWaiters() {
      try {
        const { data, error } = await supabase
          .from("waiters")
          .select("id, name, phone, is_available")
          .order("created_at", { ascending: true });

        if (error) throw error;
        setWaiters(data || []);
      } catch (err) {
        console.error("Erro ao buscar garçons:", err);
        toast({
          title: "Erro ao carregar garçons",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setLoadingWaiters(false);
      }
    }

    fetchWaiters();
  }, [toast]);

  // 🔹 Enviar pedido via WhatsApp
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
    if (!waiter) {
      toast({
        title: "Garçom inválido",
        description: "Selecione um garçom disponível.",
        variant: "destructive",
      });
      return;
    }

    const message = `*Novo Pedido*\n\nNome: ${customerName}\nMesa: ${tableNumber}\nPagamento: ${paymentMethod}\n\n*Itens:*\n- X-Burger - R$ 25,90\n\nTotal: R$ 25,90`;
    const whatsappUrl = `https://wa.me/${waiter.phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

        {/* Cart Items */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Itens do Pedido</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <div>
                <h3 className="font-medium">X-Burger</h3>
                <p className="text-sm text-muted-foreground">R$ 25,90</p>
              </div>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="pt-4 flex justify-between items-center">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-bold text-2xl text-primary">R$ 25,90</span>
            </div>
          </div>
        </div>

        {/* Customer Info Form */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Seus Dados</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="table">Número da Mesa</Label>
              <Input
                id="table"
                placeholder="Ex: 5"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Forma de Pagamento</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            {["debito", "credito", "pix", "dinheiro"].map((method) => (
              <div key={method} className="flex items-center space-x-2">
                <RadioGroupItem value={method} id={method} />
                <Label htmlFor={method}>{method.toUpperCase()}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Waiter Selection */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Escolha o Garçom</h2>
          {loadingWaiters ? (
            <p>Carregando garçons...</p>
          ) : waiters.length === 0 ? (
            <p>Nenhum garçom disponível.</p>
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

        {/* Send Button */}
        <Button
          size="lg"
          className="w-full gap-2 text-lg"
          onClick={handleSendOrder}
        >
          <Send className="h-5 w-5" />
          Enviar Pedido
        </Button>
      </main>
    </div>
  );
};

export default Cart;
