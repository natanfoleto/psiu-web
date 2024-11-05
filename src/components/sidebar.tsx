import {
  Bell,
  CirclePlus,
  Compass,
  House,
  MessageCircleMore,
  Search,
} from 'lucide-react'

export function Sidebar() {
  return (
    <div className="h-screen w-64 flex flex-col justify-between bg-zinc-900 px-6 py-8">
      <div className="space-y-12">
        <div className="px-4">
          <h1 className="text-zinc-300 text-xl font-medium">Psiuuu!</h1>
        </div>

        <nav>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 text-zinc-300 cursor-pointer rounded-md p-4 hover:bg-zinc-800 transition-colors">
              <House />
              Página inicial
            </li>

            <li className="flex items-center gap-3 text-zinc-300 cursor-pointer rounded-md p-4 hover:bg-zinc-800 transition-colors">
              <Search />
              Pesquisa
            </li>

            <li className="flex items-center gap-3 text-zinc-300 cursor-pointer rounded-md p-4 hover:bg-zinc-800 transition-colors">
              <Compass />
              Explorar
            </li>

            <li className="flex items-center gap-3 text-zinc-300 cursor-pointer rounded-md p-4 hover:bg-zinc-800 transition-colors">
              <MessageCircleMore />
              Mensagens
            </li>

            <li className="flex items-center gap-3 text-zinc-300 cursor-pointer rounded-md p-4 hover:bg-zinc-800 transition-colors">
              <Bell />
              Notificações
            </li>

            <li className="flex items-center gap-3 text-zinc-300 cursor-pointer rounded-md p-4 hover:bg-zinc-800 transition-colors">
              <CirclePlus />
              Criar
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <button className="w-full flex items-center gap-3 text-zinc-300 cursor-pointer rounded-md p-4 hover:bg-zinc-800 transition-colors">
          <div className="size-8 bg-zinc-300 rounded-full" />
          Perfil
        </button>
      </div>
    </div>
  )
}
