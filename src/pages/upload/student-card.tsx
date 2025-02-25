import { type UploadStudent } from '@/http/students/upload-students'

interface StudentCardProps {
  student: UploadStudent
}

export function StudentCard({ student }: StudentCardProps) {
  function handleCopyStudent() {
    const data = `${student.ra};${student.name};${student.birthdate};${student.password}`

    const textArea = document.createElement('textarea')

    textArea.value = data
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    alert('Estudante foi copiado para a área de transfêrencia.')
  }

  return (
    <div
      onClick={handleCopyStudent}
      className="
        flex 
        items-center 
        justify-between 
        bg-zinc-800 
        rounded-md 
        p-5 
        text-zinc-400 
        cursor-pointer 
        border
        border-transparent
        transition-colors
        hover:border-zinc-600 
      "
      title="Copiar dados do estudante"
    >
      <div className="flex items-center gap-4">
        <span>#</span>

        <div>
          <h1 className="text-zinc-200 font-semibold text-center">RA</h1>
          <p className="text-sm text-center">{student.ra}</p>
        </div>
      </div>

      <div>
        <h2 className="text-zinc-200 font-semibold text-center">Nome</h2>
        <p className="text-sm text-center">{student.name}</p>
      </div>

      <div>
        <h2 className="text-zinc-200 font-semibold text-center">
          Data de nasc.
        </h2>
        <p className="text-sm text-center">{student.birthdate}</p>
      </div>

      <div>
        <h2 className="text-zinc-200 font-semibold text-center">Senha</h2>
        <p className="text-sm text-center">{student.password}</p>
      </div>
    </div>
  )
}
