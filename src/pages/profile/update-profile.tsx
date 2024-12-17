import { Eye, EyeOff, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

interface UpdateProfileProps {
  open: boolean
  setOpen(): void
}

export function UpdateProfile({ open, setOpen }: UpdateProfileProps) {
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    open && (
      <div
        onClick={setOpen}
        className="absolute inset-0 z-10 flex justify-center bg-black/25 py-8"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-1/2 rounded-lg bg-zinc-800 p-6"
        >
          <X
            onClick={setOpen}
            className="absolute top-6 right-6 text-zinc-300 cursor-pointer"
          />

          <h1 className="text-zinc-300 text-xl font-semibold">Editar perfil</h1>

          <div className="h-full flex flex-col justify-between py-8">
            <form className="space-y-4">
              <h2 className="text-zinc-300 font-normal">Informações básicas</h2>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-zinc-400 font-medium text-sm"
                >
                  Nome
                </label>

                <Input id="name" />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="birthdate"
                  className="text-zinc-400 font-medium text-sm"
                >
                  Data de nascimento
                </label>

                <Input id="birthdate" type="date" />
              </div>

              <div className="flex justify-end gap-2">
                <Button className="bg-yellow-500 text-zinc-950">Salvar</Button>
              </div>
            </form>

            <form className="space-y-4">
              <h2 className="text-zinc-300 font-normal">Trocar senha</h2>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-zinc-400 font-medium text-sm"
                >
                  Senha atual
                </label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full"
                  />

                  {showPassword ? (
                    <Eye
                      onClick={handleShowPassword}
                      className="absolute size-5 right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      onClick={handleShowPassword}
                      className="absolute size-5 right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="new_password"
                  className="text-zinc-400 font-medium text-sm"
                >
                  Nova senha
                </label>

                <div className="relative">
                  <Input
                    id="new_password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full"
                  />

                  {showPassword ? (
                    <Eye
                      onClick={handleShowPassword}
                      className="absolute size-5 right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      onClick={handleShowPassword}
                      className="absolute size-5 right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="confirm_password"
                  className="text-zinc-400 font-medium text-sm"
                >
                  Confirmar senha
                </label>

                <div className="relative">
                  <Input
                    id="confirm_password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full"
                  />

                  {showPassword ? (
                    <Eye
                      onClick={handleShowPassword}
                      className="absolute size-5 right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      onClick={handleShowPassword}
                      className="absolute size-5 right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button className="bg-yellow-500 text-zinc-950">Salvar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}
