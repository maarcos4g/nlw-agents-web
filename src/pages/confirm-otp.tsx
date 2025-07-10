import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { useConfirmCode } from '@/http/use-confirm-code'
import { useSendAuthCode } from '@/http/use-send-auth-code'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'

const confirmCodeSchema = z.object({
  code: z.string().min(6, { message: 'Seu código precisa ter pelo menos 6 caracteres' }),
})

type ConfirmCodeFormData = z.infer<typeof confirmCodeSchema>

export function ConfirmOtp() {

  const { mutateAsync: sendAuthCode } = useSendAuthCode()
  const { mutateAsync: confirmCode } = useConfirmCode()

  const authenticateUserForm = useForm<ConfirmCodeFormData>({
    resolver: zodResolver(confirmCodeSchema)
  })

  async function handleConfirmCode({ code }: ConfirmCodeFormData) {
    confirmCode({
      code
    })
  }

  function handleResendCode() {
    sendAuthCode({
      email: sessionStorage.getItem('@email') ?? ''
    })
  }

  return (
    <div
      className='h-full mx-auto flex flex-col justify-center gap-6'
    >
      <Label className='text-center text-2xl font-bold'>Confirmação</Label>
      <Form {...authenticateUserForm}>
        <form
          onSubmit={authenticateUserForm.handleSubmit(handleConfirmCode)}
          className="flex flex-col gap-4"
        >

          <FormField
            control={authenticateUserForm.control}
            name="code"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Código de confirmação</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className='space-x-2'>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <Button type="submit" className="w-96 font-bold py-5 cursor-pointer">
            Entrar
          </Button>
        </form>
      </Form>

      <p className='text-sm text-zinc-400 space-x-1'>
        Não recebeu o código? {' '}
        <Button onClick={handleResendCode} variant="ghost" className='underline p-0 cursor-pointer'>Reenviar</Button>
      </p>
    </div>
  )
}