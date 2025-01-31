import { useState } from 'react'

import { Button } from '@/components/button'
import type { UploadStudent } from '@/http/students/upload-students'

import { StudentCard } from './student-card'
import { UploadForm } from './upload-form'

export function Upload() {
  const [students, setStudents] = useState<UploadStudent[]>([])

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

  return (
    <div className="bg-zinc-900 h-screen grid grid-cols-12">
      <div className="flex items-center justify-center col-span-4 border-r border-zinc-700">
        <UploadForm onSuccess={setStudents} />
      </div>

      <div className="h-screen flex flex-col gap-4 items-end col-span-8 px-16 py-8">
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

            <div className="w-full overflow-y-scroll space-y-3 pr-4">
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
    </div>
  )
}
