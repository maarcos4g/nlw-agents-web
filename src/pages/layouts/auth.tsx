import illustration from '@/assets/Illustration.svg'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {

  return (
    <div className="container relative min-h-screen grid grid-cols-2 flex-col items-center justify-center px-0">
      <div
        className='h-full w-full flex flex-col justify-end border-r border-zinc-600 bg-zinc-900 px-20 pb-20 gap-4'
      >
        <img
          src={illustration}
          alt="Ilustração LetMeAsk"
          className='w-80 h-96'
        />

        <h2 className='text-4xl text-zinc-100 font-bold'>Toda pergunta tem <br /> sua resposta.</h2>
        <span className='text-2xl text-zinc-500'>Aprenda e compartilhe conhecimento <br /> com outras pessoas.</span>
      </div>

      <Outlet />
    </div>
  )
}