import { File, Trash2 } from 'lucide-react'
import { type ChangeEvent, type MouseEvent, useRef, useState } from 'react'

export function UploadForm() {
  const [fileName, setFileName] = useState('')
  const [base64, setBase64] = useState('')

  const inputFileRef = useRef<HTMLInputElement>(null)

  function handleInputClick() {
    inputFileRef.current?.click()
  }

  function handleRemoveClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()

    if (inputFileRef.current) {
      inputFileRef.current.value = ''
      setFileName('')
      setBase64('')
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files

    if (files && files.length > 0) {
      const file = files[0]

      setFileName(file.name)

      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
          setBase64(e.target.result.replace('data:text/csv;base64,', ''))
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="h-40 w-64">
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
    </div>
  )
}
