import { Grid3x3, LogOut, SquarePen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'

export function Profile() {
  const navigate = useNavigate()

  return (
    <div className="w-full px-16 py-8 space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="size-28" />

        <div>
          <h1 className="text-zinc-200 font-medium">Natan Foleto</h1>
          <p className="text-zinc-400 text-sm">RA2017193635</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button className="bg-zinc-900">
          <SquarePen className="size-4 mr-2" />
          Editar perfil
        </Button>

        <Button onClick={() => navigate('/sign-in')} className="bg-zinc-900">
          <LogOut className="size-4 mr-2" />
          Sair
        </Button>
      </div>

      <div className="space-y-1">
        <Button className="text-xs text-zinc-400 py-1.5 transition-colors hover:bg-zinc-700">
          <Grid3x3 className="size-3 mr-2" />
          PUBLICAÇÕES
        </Button>

        <div className="w-full border-t border-zinc-700"></div>
      </div>
    </div>
  )
}
