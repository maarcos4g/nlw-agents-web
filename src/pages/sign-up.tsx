import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateAccount } from '@/http/use-create-account'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod/v4'

const signUserSchema = z.object({
  name: z.string({ message: 'Insira seu nome' }).min(3, { message: 'Seu nome precisa conter ao menos 3 caracteres' }),
  email: z.email(),
})

type SignUserFormData = z.infer<typeof signUserSchema>

export function SignUp() {

  const { mutateAsync: createAccount } = useCreateAccount()

  const authenticateUserForm = useForm<SignUserFormData>({
    resolver: zodResolver(signUserSchema),
    defaultValues: {
      email: '',
      name: ''
    }
  })

  async function handleCreateUser({ email, name }: SignUserFormData) {
    createAccount({
      name,
      email
    })
  }

  return (
    <div
      className='h-full mx-auto flex flex-col justify-center gap-6'
    >
      <Label className='text-center text-2xl font-bold'>Criar conta</Label>
      <Form {...authenticateUserForm}>
        <form
          onSubmit={authenticateUserForm.handleSubmit(handleCreateUser)}
          className="flex flex-col gap-4"
        >

          <FormField
            control={authenticateUserForm.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Seu nome</FormLabel>
                  <FormControl>
                    <Input {...field} className='w-96 py-5' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={authenticateUserForm.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Seu e-mail</FormLabel>
                  <FormControl>
                    <Input {...field} className='w-96 py-5' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />


          <Button type="submit" className="w-full font-bold py-5 cursor-pointer">
            Continuar
          </Button>
        </form>
      </Form>

      <p className='text-sm text-zinc-400'>
        Já tem acesso? <strong className='underline'><Link to='/auth'>Entrar</Link></strong>
      </p>
    </div>
  )
}