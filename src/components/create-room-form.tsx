import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCreateRoom } from "@/http/use-create-room";
import { useNavigate } from "react-router-dom";

const createRoomSchema = z.object({
  name: z.string().min(3, { message: 'Inclua no mínimo 3 caracteres.' }),
  description: z.string(),
})

const enterTheRoomSchema = z.object({
  code: z.string().min(6, { message: 'O código precisa conter no mínimo 8 caracteres.' }),
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>
type EnterTheRoomFormData = z.infer<typeof enterTheRoomSchema>

export function CreateRoomForm() {

  const navigate = useNavigate()

  const { mutateAsync: createRoom } = useCreateRoom()

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    }
  })

  const enterTheRoomForm = useForm<EnterTheRoomFormData>({
    resolver: zodResolver(enterTheRoomSchema),
    defaultValues: {
      code: ''
    }
  })

  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    await createRoom({
      name,
      description
    })
    createRoomForm.reset()
  }

  async function handleEnterRoom({ code }: EnterTheRoomFormData) {
    navigate(`/room/${code}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>Crie uma nova sala para começar a fazer perguntas e
          receber respostas da IA</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da sala</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o nome da sala" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Digite o nome da sala" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button type="submit" className="w-full">
              Criar sala
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-muted" />
          <span className="text-sm text-muted-foreground">ou entre em uma sala</span>
          <div className="flex-1 h-px bg-muted" />
        </div>

        <Form {...enterTheRoomForm}>
          <form
            onSubmit={enterTheRoomForm.handleSubmit(handleEnterRoom)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={enterTheRoomForm.control}
              name="code"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Código da sala</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o código da sala" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button type="submit" className="w-full">
              Entrar na sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}