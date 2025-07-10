import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSendAuthCode } from '@/http/use-send-auth-code'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod/v4'

const authenticateUserSchema = z.object({
  email: z.email({ message: 'Insira um e-mail válido' }),
})

type AuthenticateUserFormData = z.infer<typeof authenticateUserSchema>

export function Auth() {

  const { mutateAsync: sendAuthCode } = useSendAuthCode()

  const authenticateUserForm = useForm<AuthenticateUserFormData>({
    resolver: zodResolver(authenticateUserSchema),
    defaultValues: {
      email: '',
    }
  })

  async function handleAuthenticateUser({ email }: AuthenticateUserFormData) {
    sendAuthCode({
      email
    })
  }

  return (
    <div
      className='h-full mx-auto flex flex-col justify-center gap-6'
    >
      <Label className='text-center text-2xl font-bold'>Acessar conta</Label>
      <Form {...authenticateUserForm}>
        <form
          onSubmit={authenticateUserForm.handleSubmit(handleAuthenticateUser)}
          className="flex flex-col gap-4"
        >


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

          <Button type="submit" disabled={authenticateUserForm.formState.isSubmitting} className="w-full font-bold py-5 cursor-pointer">
            Continuar
          </Button>
        </form>
      </Form>

      <p className='text-sm text-zinc-400'>
        Ainda não tem acesso? <strong className='underline'><Link to='/create-account'>Criar conta</Link></strong>
      </p>
    </div>
  )
}