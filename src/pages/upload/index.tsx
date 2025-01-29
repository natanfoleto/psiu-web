import { UploadForm } from './upload-form'

export function Upload() {
  return (
    <div className="bg-zinc-900 h-screen grid grid-cols-12">
      <div className="flex items-center justify-center col-span-4 border-r border-zinc-700">
        <UploadForm />
      </div>

      <div className="col-span-8"></div>
    </div>
  )
}
