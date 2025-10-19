import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Login Card - Will be replaced with actual auth later */}
        <div className="max-w-md mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Área Administrativa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full">Entrar</Button>
            </CardContent>
          </Card>
        </div>

        {/* Admin Dashboard - Will be shown after login */}
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Painel Administrativo</h1>

          <Tabs defaultValue="categories" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="categories">Categorias</TabsTrigger>
              <TabsTrigger value="products">Produtos</TabsTrigger>
              <TabsTrigger value="waiters">Garçons</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
            </TabsList>

            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Categorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Funcionalidade será implementada com backend
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Funcionalidade será implementada com backend
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="waiters">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Garçons</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Funcionalidade será implementada com backend
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Usuários</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Apenas super admin (kernelpanic10190@gmail.com) pode gerenciar usuários
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
