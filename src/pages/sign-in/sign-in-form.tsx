import { HTTPError } from 'ky'
import { Eye, EyeOff } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { authenticateWithPassword } from '@/http/auth/authenticate-with-password'

export function SignInForm() {
  const navigate = useNavigate()

  const [ra, setRa] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const { result, message, data } = await authenticateWithPassword({
        ra,
        password,
      })

      console.log({ result, message, data })

      if (result === 'success') {
        toast.success(message)

        // Setar o token nos cookies

        navigate('/')
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        const { message } = await error.response.json()

        toast.error(message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="ra" className="text-zinc-400 text-sm">
          RA
        </label>

        <Input
          id="ra"
          value={ra}
          onChange={(e) => setRa(e.target.value)}
          type="text"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-zinc-400 text-sm">
          Senha
        </label>

        <div className="relative">
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            className="w-full"
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
          <input
            type="checkbox"
            id="rememberMe"
            className="
              appearance-none 
              size-4 
              border-2 
              border-zinc-600 
              rounded-sm 
              checked:border-4 
              checked:border-yellow-500 
              checked:bg-zinc-950 
              focus:outline-none
            "
          />

          <label htmlFor="rememberMe" className="text-zinc-400 text-xs">
            Lembre-me
          </label>
        </div>

        <a href="#" className="text-xs text-yellow-500 font-semibold">
          Esqueci minha senha
        </a>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <Button className="w-full font-semibold bg-yellow-500 text-zinc-900 py-2">
          ENTRAR
        </Button>

        <a href="" className="text-yellow-500 text-xs hover:underline">
          Não tem uma conta? <span className="font-semibold">Fale aqui</span>
        </a>
      </div>
    </form>
  )
}
