import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Bookmark, Ellipsis, Heart, MessageCircle } from 'lucide-react'

import { TAILWIND_COLORS } from '@/constants/tailwind-colors'

interface PostProps {
  id: string
  content: string
  publishedAt: string
  updatedAt: string | null
}

export function Post({ content, publishedAt, updatedAt }: PostProps) {
  const bgColor =
    TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)].bg_color

  const textColor =
    TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)]
      .text_color

  return (
    <div className="w-[432px] space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-zinc-300" />
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

      <div className={`w-full min-h-32 rounded-md p-4 ${bgColor} pink`}>
        <p className={`text-sm ${textColor}`}>{content}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-400">
          <Heart className="size-5 cursor-pointer transition-opacity hover:opacity-50" />
          <MessageCircle className="size-5 cursor-pointer transition-opacity hover:opacity-50" />
        </div>

        <Bookmark className="size-5 text-zinc-400 cursor-pointer transition-opacity hover:opacity-50" />
      </div>
    </div>
  )
}
