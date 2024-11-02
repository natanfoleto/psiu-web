import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useState } from 'react'

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <div className="w-screen h-screen flex bg-zinc-900">
      <div className="h-full w-3/5 border-r-[1px] border-zinc-800 p-8">
        <h1 className="text-zinc-200 text-3xl">Psiuuu!</h1>
      </div>

      <div className="h-full w-2/5 relative flex items-center justify-center p-12">
        <h1 className="absolute top-8 left-8 text-zinc-200 font-medium">
          psiuuu!
        </h1>

        <div className="w-full bg-zinc-800 py-12 px-20 rounded-md">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LogIn className="text-yellow-600" />
              <h1 className="text-2xl text-zinc-300">Faça seu login</h1>
            </div>

            <p className="text-sm text-zinc-400">
              Entre com suas informações de cadastro.
            </p>
          </div>

          <form className="mt-6 space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="ra" className="text-zinc-400 text-sm">
                RA
              </label>

              <input
                id="ra"
                type="text"
                className="h-10 rounded-md bg-transparent text-zinc-400 text-sm border-2 border-zinc-600 outline-none px-4 focus:border-yellow-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-zinc-400 text-sm">
                Senha
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full h-10 rounded-md bg-transparent text-zinc-400 text-sm border-2 border-zinc-600 outline-none px-4 focus:border-yellow-500"
                />

                {showPassword ? (
                  <Eye
                    onClick={handleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                  />
                ) : (
                  <EyeOff
                    onClick={handleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe" className="text-zinc-400 text-xs">
                  Lembre-me
                </label>
              </div>

              <a href="#" className="text-xs text-yellow-500 font-semibold">
                Esqueci minha senha
              </a>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <button className="w-full bg-yellow-500 rounded-md font-semibold text-zinc-900 py-2">
                ENTRAR
              </button>

              <a href="" className="text-yellow-500 text-xs hover:underline">
                Não tem uma conta?{' '}
                <span className="font-semibold">Fale aqui</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
