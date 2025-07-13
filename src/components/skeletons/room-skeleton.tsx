import { Skeleton } from "@/components/ui/skeleton"

export function RoomSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl mb-2">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="w-32 h-10 rounded-md" /> {/* Voltar ao Início */}
          <div className="flex gap-2">
            <Skeleton className="w-44 h-10 rounded-md" /> {/* Sala #code */}
            <Skeleton className="w-36 h-10 rounded-md" /> {/* Gravar Áudio */}
          </div>
        </div>
        <Skeleton className="mb-2 h-10 w-72 rounded" /> {/* Título */}
        <Skeleton className="h-6 w-56 rounded" /> {/* Subtítulo */}
      </div>

      <div className="mb-8">
        {/* Formulário de pergunta */}
        <div className="p-6 border rounded-xl flex flex-col gap-4">
          <Skeleton className="h-6 w-40 mb-2" /> {/* Título do card */}
          <Skeleton className="h-4 w-64 mb-4" /> {/* Descrição */}
          <Skeleton className="h-24 w-full mb-4 rounded" /> {/* Textarea */}
          <Skeleton className="h-10 w-32 rounded" /> {/* Botão */}
        </div>
      </div>

      {/* Lista de perguntas */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-56 mb-2" /> {/* Título da lista */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border rounded-xl flex flex-col gap-4">
            <div className="flex items-start space-x-3">
              <Skeleton className="size-8 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Skeleton className="size-8 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}