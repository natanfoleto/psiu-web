import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Bookmark, Ellipsis, Heart, MessageCircle } from 'lucide-react'
import { useState } from 'react'

import { TAILWIND_COLORS } from '@/constants/tailwind-colors'

import { Avatar } from '../avatar'
import { PostPreview } from './post-preview'

interface PostProps {
  id: string
  content: string
  publishedAt: string
  updatedAt: string | null
}

export function Post({ content, publishedAt, updatedAt }: PostProps) {
  const [modalPreview, setModalPreview] = useState(false)

  function handleModalPreview() {
    setModalPreview(!modalPreview)
  }

  const colors =
    TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)]

  return (
    <div>
      <div className="w-[432px] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10" />

            <h1 className="text-zinc-300 text-sm font-semibold">natanfoleto</h1>

            <time className="text-zinc-500 text-sm">
              {formatDistanceToNow(updatedAt || publishedAt, {
                locale: ptBR,
              })}{' '}
              {updatedAt && '(editado)'}
            </time>
          </div>

          <Ellipsis className="text-zinc-500 size-5 cursor-pointer transition-colors hover:text-zinc-400" />
        </div>

        <div
          className={`w-full min-h-32 rounded-md p-4 ${colors.bg_color} pink`}
        >
          <p className={`text-sm ${colors.text_color}`}>{content}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <Heart className="size-5 cursor-pointer transition-opacity hover:opacity-50" />
            <MessageCircle
              onClick={handleModalPreview}
              className="size-5 cursor-pointer transition-opacity hover:opacity-50"
            />
          </div>

          <Bookmark className="size-5 text-zinc-400 cursor-pointer transition-opacity hover:opacity-50" />
        </div>
      </div>

      <PostPreview open={modalPreview} setOpen={handleModalPreview} />
    </div>
  )
}
