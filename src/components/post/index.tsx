import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Bookmark, Ellipsis, MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

import { TAILWIND_COLORS } from '@/constants/tailwind-colors'
import type { IPost } from '@/http/posts/types'
import { getRandomAdjective } from '@/utils/get-random-adjective'

import { Avatar } from '../avatar'
import { Options } from './options'
import { PostPreview } from './post-preview'
import { Reaction } from './reaction'

export interface PostProps {
  post: IPost
}

export function Post({
  post: { id, content, publishedAt, updatedAt, comments, reactions },
}: PostProps) {
  const [modalPreview, setModalPreview] = useState(false)
  const [modalOptions, setModalOptions] = useState(false)

  function handleModalPreview() {
    setModalPreview(!modalPreview)
  }

  function handleModalOptions() {
    setModalOptions(!modalOptions)
  }

  const colors = useMemo(
    () => TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)],
    [],
  )

  const adjective = useMemo(() => getRandomAdjective(), [])
  const avatar = useMemo(
    () => `https://api.dicebear.com/9.x/adventurer/svg?seed=${adjective}`,
    [adjective],
  )

  return (
    <div>
      <div className="w-[432px] space-y-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar
              src={avatar}
              className={`size-10 object-cover ${colors.bg_color}`}
            />

            <h1 className="text-zinc-300 text-sm font-semibold">{adjective}</h1>

            <time className="text-zinc-500 text-sm">
              {formatDistanceToNow(updatedAt || publishedAt, {
                locale: ptBR,
              })}{' '}
              {updatedAt && '(editado)'}
            </time>
          </div>

          <Ellipsis
            onClick={handleModalOptions}
            className="text-zinc-500 size-5 cursor-pointer transition-colors hover:text-zinc-400"
          />
        </div>

        <div
          className={`w-full min-h-32 rounded-md p-4 ${colors.bg_color} pink`}
        >
          <p className={`text-sm ${colors.text_color}`}>{content}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <Reaction className="size-5" />

            <MessageCircle
              onClick={handleModalPreview}
              className="size-5 cursor-pointer transition-opacity hover:opacity-50"
            />
          </div>

          <Bookmark className="size-5 text-zinc-400 cursor-pointer transition-opacity hover:opacity-50" />
        </div>
      </div>

      <PostPreview
        post={{ id, content, publishedAt, updatedAt, comments, reactions }}
        user={{ name: adjective, avatar }}
        backgroundColor={colors.bg_color}
        open={modalPreview}
        setOpen={handleModalPreview}
      />

      <Options open={modalOptions} setOpen={handleModalOptions} />
    </div>
  )
}
