import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="h-screen container mx-auto max-w-4xl">
      <div className="h-full flex flex-col items-center justify-center py-24 gap-6">
        <div className="flex flex-col items-center gap-2">
          <Ban className="size-12 text-destructive" />
          <h2 className="text-2xl font-bold text-destructive">
            Esta página não existe.
          </h2>
          <p className="text-muted-foreground text-center max-w-md">
            A URL que você acessou está incorreta ou a página foi removida. Verifique o endereço ou volte para a página inicial.
          </p>
        </div>
        <Link to="/">
          <Button variant="outline">Voltar ao início</Button>
        </Link>
      </div>
    </div>
  )
}