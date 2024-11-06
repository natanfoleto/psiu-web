import { LogOut, SquarePen } from 'lucide-react'

export function Profile() {
  return (
    <div className="px-16 py-8 space-y-8">
      <div className="flex items-center gap-4">
        <div className="bg-zinc-400 size-28 rounded-full" />

        <div>
          <h1 className="text-zinc-200 font-medium">Natan Foleto</h1>
          <p className="text-zinc-400 text-sm">RA2017193635</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 bg-zinc-900 text-zinc-300 text-sm py-3 px-4 rounded-md transition-opacity hover:opacity-75">
          <SquarePen className="size-4" />
          Editar perfil
        </button>

        <button className="flex items-center gap-2 bg-zinc-900 text-zinc-300 text-sm py-3 px-4 rounded-md transition-opacity hover:opacity-75">
          <LogOut className="size-4" />
          Sair
        </button>
      </div>

      {/* <p className="text-zinc-300 text-xs">23 publicações</p> */}
    </div>
  )
}
