import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const WaitersTab = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: waiters, isLoading } = useQuery({
    queryKey: ['waiters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('waiters')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newWaiter: any) => {
      const { error } = await supabase
        .from('waiters')
        .insert([newWaiter]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waiters'] });
      resetForm();
      toast({ title: "Garçom adicionado com sucesso!" });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar garçom",
        description: error.message,
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const { error } = await supabase
        .from('waiters')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waiters'] });
      resetForm();
      toast({ title: "Garçom atualizado!" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('waiters')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waiters'] });
      toast({ title: "Garçom removido!" });
    }
  });

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPhone("");
    setIsAvailable(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const waiterData = {
      name,
      phone,
      is_available: isAvailable,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, ...waiterData });
    } else {
      createMutation.mutate(waiterData);
    }
  };

  const handleEdit = (waiter: any) => {
    setEditingId(waiter.id);
    setName(waiter.name);
    setPhone(waiter.phone);
    setIsAvailable(waiter.is_available);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Editar Garçom" : "Novo Garçom"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Garçom</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">WhatsApp (com DDD)</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="13991234567"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="available"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
              <Label htmlFor="available">Disponível (em serviço)</Label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? "Atualizar" : <><Plus className="h-4 w-4 mr-2" /> Adicionar</>}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Garçons Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : waiters && waiters.length > 0 ? (
            <div className="space-y-2">
              {waiters.map((waiter) => (
                <div
                  key={waiter.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{waiter.name}</h3>
                    <p className="text-sm text-muted-foreground">WhatsApp: {waiter.phone}</p>
                    {waiter.is_available ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded inline-block mt-1">
                        Disponível
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded inline-block mt-1">
                        Indisponível
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(waiter)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(waiter.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhum garçom cadastrado ainda.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
