import { Grid3x3, List, LogOut, SquarePen } from 'lucide-react'
import { useState } from 'react'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { ModalConfirm } from '@/components/modal/modal-confirm'
import { Post } from '@/components/post/post-card-2'
import { useAuth } from '@/contexts/auth'
import { usePost } from '@/contexts/post'

import { UpdateProfile } from './update-profile'

export function Profile() {
  const { student, signOut } = useAuth()
  const { postsByStudent } = usePost()

  const [modalUpdateProfile, setModalUpdateProfile] = useState(false)
  const [modalConfirmLogout, setModalConfirmLogout] = useState(false)

  function handleModalUpdateProfile() {
    setModalUpdateProfile(!modalUpdateProfile)
  }

  function handleModalConfirmLogout() {
    setModalConfirmLogout(!modalConfirmLogout)
  }

  const avatar = 'https://api.dicebear.com/9.x/adventurer/svg?seed=natanfoleto'

  return (
    <div className="w-full">
      <div className="w-full h-screen px-16 py-8 space-y-8 overflow-y-auto">
        <div className="flex items-center gap-4">
          <Avatar
            src={avatar}
            name="Natan Foleto"
            className="size-28 bg-zinc-200 text-zinc-800 text-5xl font-medium"
          />

          <div>
            <h1 className="text-zinc-200 font-medium">{student?.name}</h1>
            <p className="text-zinc-400 text-sm">{student?.ra}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleModalUpdateProfile} className="bg-zinc-900">
            <SquarePen className="size-4 mr-2" />
            Editar perfil
          </Button>

          <Button onClick={handleModalConfirmLogout} className="bg-zinc-900">
            <LogOut className="size-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Button className="text-xs text-zinc-400 py-1.5 transition-colors hover:bg-zinc-700">
              <Grid3x3 className="size-3 mr-2" />
              PUBLICAÇÕES
            </Button>

            <Button className="text-xs text-zinc-400 py-1.5 transition-colors hover:bg-zinc-700">
              <List className="size-3 mr-2 text-white" />
              ATIVIDADES RECENTES
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-1 w-full border-t border-zinc-700 py-4">
            {postsByStudent.map((post) => (
              <div key={post.id} className="aspect-square">
                <Post
                  post={{
                    id: post.id,
                    isOwner: post.isOwner,
                    content: post.content,
                    publishedAt: post.publishedAt,
                    updatedAt: post.updatedAt,
                    comments: post.comments,
                    reactions: post.reactions,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <UpdateProfile
        open={modalUpdateProfile}
        setOpen={handleModalUpdateProfile}
      />

      <ModalConfirm
        title="Saindo"
        description="Deseja realmente sair?"
        open={modalConfirmLogout}
        setOpen={handleModalConfirmLogout}
        onConfirm={signOut}
      />
    </div>
  )
}
