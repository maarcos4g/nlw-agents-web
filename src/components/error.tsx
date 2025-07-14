import { AlertTriangle } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

type ErrorParams = {
  title: string
  description: string
}

export function Error(params:ErrorParams) {
  return (
    <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center py-24 gap-6">
      <div className="flex flex-col items-center gap-2">
        <AlertTriangle className="size-12 text-destructive" />
        <h2 className="text-2xl font-bold text-destructive">{params.title}</h2>
        <p className="text-muted-foreground text-center max-w-md">
          {params.description}
        </p>
      </div>
      <Link to="/">
        <Button variant="outline">Voltar ao início</Button>
      </Link>
    </div>
  )
}