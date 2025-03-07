import { HTTPError } from 'ky'
import { Eye, EyeOff, X } from 'lucide-react'
import { type FormEvent, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useAuth } from '@/contexts/auth'

interface UpdateProfileProps {
  open: boolean
  setOpen(): void
}

export function UpdateProfile({ open, setOpen }: UpdateProfileProps) {
  const { student, onUpdateStudent, onUpdatePassword } = useAuth()

  const [name, setName] = useState(student?.name || '')
  const [birthdate, setBirthdate] = useState(student?.birthdate || '')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  async function handleSubmitStudent(event: FormEvent) {
    event.preventDefault()

    try {
      const { result, message } = await onUpdateStudent({
        name,
        birthdate,
      })

      if (result === 'success') {
        toast.success(message)
      }
    } catch (error) {
      console.log(error)

      if (error instanceof HTTPError) {
        const { message } = await error.response.json()

        toast.error(message)
      }
    }
  }

  async function handleSubmitPassword(event: FormEvent) {
    event.preventDefault()

    try {
      const { result, message } = await onUpdatePassword({
        password,
        newPassword,
        confirmNewPassword,
      })

      if (result === 'success') {
        toast.success(message)
      }
    } catch (error) {
      console.log(error)

      if (error instanceof HTTPError) {
        const { message } = await error.response.json()

        toast.error(message)
      }
    }
  }

  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        event.stopPropagation()
        setOpen()
      }
    },
    [open, setOpen],
  )

  useEffect(() => {
    if (open) document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open, handleEsc])

  const studentIsDirty =
    student && (student.name !== name || student.birthdate !== birthdate)

  const passwordIsDirty = password && newPassword && confirmNewPassword

  return (
    open && (
      <div
        onClick={setOpen}
        className="absolute inset-0 z-10 flex justify-center bg-black/25 sm:p-8 p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative lg:w-1/2 w-full rounded-lg bg-zinc-800 p-6 overflow-y-auto"
        >
          <X
            onClick={setOpen}
            className="absolute top-6 right-6 text-zinc-300 cursor-pointer"
          />

          <h1 className="text-zinc-300 text-xl font-semibold">Editar perfil</h1>

          <div className="h-full flex flex-col justify-between py-8">
            <form onSubmit={handleSubmitStudent} className="space-y-4">
              <h2 className="text-zinc-300 font-normal">Informações básicas</h2>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-zinc-400 font-medium text-sm"
                >
                  Nome
                </label>

                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="birthdate"
                  className="text-zinc-400 font-medium text-sm"
                >
                  Data de nascimento
                </label>

                <Input
                  id="birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="submit"
                  disabled={!studentIsDirty}
                  className="bg-yellow-500 text-zinc-950 disabled:bg-zinc-600"
                >
                  Salvar
                </Button>
              </div>
            </form>

            <form onSubmit={handleSubmitPassword} className="space-y-4">
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  htmlFor="confirm_new_password"
                  className="text-zinc-400 font-medium text-sm"
                >
                  Confirmar senha
                </label>

                <div className="relative">
                  <Input
                    id="confirm_new_password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                <Button
                  type="submit"
                  disabled={!passwordIsDirty}
                  className="bg-yellow-500 text-zinc-950 disabled:bg-zinc-600"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}
