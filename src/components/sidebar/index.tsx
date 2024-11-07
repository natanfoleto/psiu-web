import {
  Bell,
  CirclePlus,
  Compass,
  House,
  MessageCircleMore,
  Search,
} from 'lucide-react'

import { SidebarLink } from './sidebar-link'

export function Sidebar() {
  return (
    <div className="h-screen w-80 flex flex-col justify-between bg-zinc-900 px-6 py-8">
      <div className="space-y-12">
        <div className="px-4">
          <h1 className="text-zinc-300 text-xl font-medium">Psiuuu!</h1>
        </div>

        <nav className="space-y-2">
          <SidebarLink href="/feed">
            <House />
            Página inicial
          </SidebarLink>

          <SidebarLink href="/">
            <Search />
            Pesquisa
          </SidebarLink>

          <SidebarLink href="/">
            <Compass />
            Explorar
          </SidebarLink>

          <SidebarLink href="/">
            <MessageCircleMore />
            Mensagens
          </SidebarLink>

          <SidebarLink href="/">
            <Bell />
            Notificações
          </SidebarLink>

          <SidebarLink href="/">
            <CirclePlus />
            Criar
          </SidebarLink>
        </nav>
      </div>

      <div>
        <SidebarLink href="/profile">
          <div className="size-8 bg-zinc-300 rounded-full" />
          Perfil
        </SidebarLink>
      </div>
    </div>
  )
}
