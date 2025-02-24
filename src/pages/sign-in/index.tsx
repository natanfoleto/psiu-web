import { LogIn } from 'lucide-react'

import { SignInForm } from './sign-in-form'

export function SignIn() {
  return (
    <div className="w-screen h-screen grid grid-cols-12 bg-zinc-900">
      <div
        className="
          relative 
          h-full 
          col-span-7 
          hidden
          items-center 
          border-r-[1px] 
          border-zinc-800 
          bg-sign-in 
          bg-cover 
          bg-center 
          px-16
          xl:flex
        "
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <h1 className="text-zinc-50 text-6xl font-bold text-center">
          O ser humano é tudo aquilo que a educação faz dele!
        </h1>
      </div>

      <div
        className="
          col-span-12 
          relative 
          flex 
          items-center 
          justify-center 
          p-8
          xl:col-span-5
          xl:h-full
          sm:p-12
        "
      >
        <h1 className="absolute top-4 left-8 text-zinc-200 font-medium sm:top-8">
          psiuuu!
        </h1>

        <div
          className="
            w-full 
            bg-zinc-800 
            py-8 
            px-8 
            rounded-md 
            sm:w-5/6 
            md:w-2/3 
            lg:w-1/2 
            xl:w-full
            sm:px-20
            sm:py-12
          "
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LogIn className="text-yellow-600" />
              <h1 className="text-xl sm:text-2xl text-zinc-300">
                Faça seu login
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400">
              Entre com suas informações de cadastro.
            </p>
          </div>

          <SignInForm />
        </div>
      </div>
    </div>
  )
}
