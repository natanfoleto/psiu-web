import { HTTPError } from 'ky'
import { File, Trash2 } from 'lucide-react'
import {
  type ChangeEvent,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import {
  type UploadStudent,
  uploadStudent,
} from '@/http/students/upload-students'

interface UploadFormProps {
  onSuccess: Dispatch<SetStateAction<UploadStudent[]>>
}

export function UploadForm({ onSuccess }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')

  const inputFileRef = useRef<HTMLInputElement>(null)

  function handleInputClick() {
    inputFileRef.current?.click()
  }

  function handleRemoveClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()

    if (inputFileRef.current) {
      inputFileRef.current.value = ''
      setFileName('')
      setFile(null)
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files

    if (files && files.length > 0) {
      const file = files[0]

      setFileName(file.name)
      setFile(file)
    }
  }

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    try {
      event.preventDefault()

      if (!file) return alert('Selecione um arquivo para upload')

      const formData = new FormData()

      formData.append('file', file)

      const { result, data } = await uploadStudent({ formData })

      if (result === 'success') {
        onSuccess(data)

        setFileName('')
        setFile(null)
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
    <div className="h-40 w-64 space-y-4">
      <form
        onClick={handleInputClick}
        className="
          w-full 
          h-full 
          flex 
          flex-col 
          justify-center 
          items-center 
          border-[1px] 
          border-dashed 
          border-zinc-500
          cursor-pointer 
          rounded-md
        "
      >
        <input
          ref={inputFileRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          hidden
        />

        <File className="text-zinc-600" />

        <p className="flex items-center text-zinc-500 text-center gap-1 text-sm w-40 mt-3">
          {fileName || 'Selecione um arquivo para upload'}
          {fileName && (
            <button onClick={handleRemoveClick}>
              <Trash2 className="size-5 text-zinc-600" />
            </button>
          )}
        </p>
      </form>

      <Button
        onClick={handleSubmit}
        className="bg-green-600 w-full disabled:bg-green-800"
        disabled={!file}
      >
        Enviar
      </Button>
    </div>
  )
}
