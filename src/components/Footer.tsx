import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          Desenvolvido com <Heart className="h-4 w-4 text-red-500 fill-red-500" /> pelo técnico Henrico Amalfi - WhatsApp (13) 99159-7827
        </p>
      </div>
    </footer>
  );
};
