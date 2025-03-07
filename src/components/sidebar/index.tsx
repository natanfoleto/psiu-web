import {
  Bell,
  CirclePlus,
  CircleUserRound,
  Compass,
  House,
  MessageCircleMore,
  Search,
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/contexts/auth'

import { Avatar } from '../avatar'
import { SidebarLink } from './sidebar-link'

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const { student } = useAuth()

  const avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${student?.name}`

  const pathname = location.pathname

  return (
    <div>
      <div className="h-screen w-80 hidden flex-col justify-between bg-zinc-900 px-6 py-8 2md:flex">
        <div className="space-y-12">
          <div className="px-4">
            <h1 className="text-zinc-300 text-xl font-medium">Psiuuu!</h1>
          </div>

          <nav className="space-y-2">
            <SidebarLink href="/">
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
            <Avatar
              src={avatar}
              name="Natan Foleto"
              className="size-8 bg-zinc-200"
              onError={(e) => console.log(e)}
            />

            <span className="max-w-full overflow-x-hidden text-nowrap truncate">
              {student?.name || 'Perfil'}
            </span>
          </SidebarLink>
        </div>
      </div>

      <div className="z-50 fixed bottom-0 left-0 right-0 h-12 flex items-center justify-around bg-zinc-900 2md:h-0">
        <button onClick={() => navigate('/')}>
          <House
            strokeWidth={pathname === '/' ? 3 : 2}
            className="text-zinc-300 size-5 2md:invisible visible"
          />
        </button>

        <button onClick={() => navigate('/')}>
          <Search
            strokeWidth={pathname === '/search' ? 3 : 2}
            className="text-zinc-300 size-5 2md:invisible visible"
          />
        </button>

        <button onClick={() => navigate('/')}>
          <Compass
            strokeWidth={pathname === '/explorer' ? 3 : 2}
            className="text-zinc-300 size-5 2md:invisible visible"
          />
        </button>

        <button onClick={() => navigate('/profile')}>
          <CircleUserRound
            strokeWidth={pathname === '/profile' ? 3 : 2}
            className="text-zinc-300 size-5 2md:invisible visible"
          />
        </button>
      </div>
    </div>
  )
}
