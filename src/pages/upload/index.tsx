import { HTTPError } from 'ky'
import { type FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { SafeModal } from '@/components/modal/safe-modal'
import { authenticateUpload } from '@/http/auth/authenticate-upload'
import type { UploadStudent } from '@/http/students/upload-students'

import { StudentCard } from './student-card'
import { UploadForm } from './upload-form'

export function Upload() {
  const navigate = useNavigate()

  const [students, setStudents] = useState<UploadStudent[]>([])

  const [password, setPassword] = useState('')
  const [modalPassword, setModalPassword] = useState(false)

  useEffect(() => setModalPassword(true), [])

  useEffect(() => {
    if (modalPassword) {
      const handleRightClick = (e: MouseEvent) => e.preventDefault()
      const handleKeyDown = (e: KeyboardEvent) => {
        const blockedKeys = ['F12', 'I', 'J', 'C', 'U']

        if (
          blockedKeys.includes(e.key) ||
          (e.ctrlKey && e.shiftKey && blockedKeys.includes(e.key)) ||
          (e.metaKey && e.altKey && blockedKeys.includes(e.key))
        ) {
          e.preventDefault()
        }
      }

      document.addEventListener('contextmenu', handleRightClick)
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('contextmenu', handleRightClick)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [modalPassword])

  function handleCopyStudents() {
    const data = students
      .map(
        (student) =>
          `${student.ra};${student.name};${student.birthdate};${student.password}`,
      )
      .join('\n')

    const textArea = document.createElement('textarea')

    textArea.value = data
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    alert('Todos os estudantes foram copiados para a área de transfêrencia.')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const { result } = await authenticateUpload({
        password,
      })

      if (result === 'success') {
        setModalPassword(false)
      }
    } catch (error) {
      console.log(error)

      if (error instanceof HTTPError) {
        const { message } = await error.response.json()

        toast.error(message)
      }
    }
  }

  return (
    <div className="bg-zinc-900 min-h-screen grid grid-cols-12">
      <div
        className="
          flex 
          flex-col 
          items-center 
          justify-center 
          pt-8
          pb-24
          col-span-12 
          border-b 
          border-zinc-700
          lg:col-span-4
          lg:py-0
          lg:border-r
          lg:border-b-0
        "
      >
        <h1
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 text-zinc-200 font-medium cursor-pointer lg:block hidden"
        >
          psiuuu!
        </h1>

        <UploadForm onSuccess={setStudents} />
      </div>

      <div
        className="
          h-screen 
          flex 
          flex-col 
          gap-4 
          items-center 
          col-span-12 
          px-8 
          py-8
          lg:col-span-8
          lg:items-end
          lg:px-16
        "
      >
        {students.length ? (
          <>
            <div className="flex items-center gap-2">
              <Button onClick={() => setStudents([])} className="bg-red-600">
                Limpar
              </Button>

              <Button onClick={handleCopyStudents} className="bg-green-600">
                Copiar tudo
              </Button>
            </div>

            <div className="w-full overflow-y-scroll overflow-x-auto space-y-3 pr-4">
              {students.map((student) => (
                <StudentCard key={student.ra} student={student} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-zinc-400 text-sm">
              Faça o upload de um arquivo CSV para cadastrar os estudantes.
            </p>
          </div>
        )}
      </div>

      <SafeModal
        title="Autenticação necessária"
        description="Digite a senha para liberar a página de upload."
        open={modalPassword}
      >
        <form onSubmit={handleSubmit} className="border-t border-zinc-700">
          <div className="flex flex-col items-center gap-1 p-8">
            <label htmlFor="password" className="text-zinc-300 font-semibold">
              Senha de acesso
            </label>

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:border-red-500 text-center sm:text-left"
              placeholder="Chave secreta"
              required
            />
          </div>

          <button className="w-full py-4 text-red-500 text-sm border-t-[1px] border-zinc-700">
            Enviar
          </button>
        </form>
      </SafeModal>
    </div>
  )
}
