import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Heart, MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

import { TAILWIND_COLORS } from '@/constants/tailwind-colors'
import { useAuth } from '@/contexts/auth'
import type { IPost } from '@/http/posts/types'
import { getRandomAdjective } from '@/utils/get-random-adjective'

import { PostPreview } from './post-preview'

export interface PostProps {
  post: IPost
}

export function Post({
  post: { id, isOwner, content, publishedAt, updatedAt, comments, reactions },
}: PostProps) {
  const { student } = useAuth()

  const [modalPreview, setModalPreview] = useState(false)

  function handleModalPreview() {
    setModalPreview(!modalPreview)
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

  const reaction = reactions.find((reaction) => reaction.isOwner)

  return (
    <>
      <div
        onClick={handleModalPreview}
        className={`relative h-full flex items-center justify-center overflow-hidden p-8 ${colors.bg_color}`}
      >
        <p className={`text-sm line-clamp-[10] ${colors.text_color}`}>
          {content}
        </p>

        <div
          className="
            absolute 
            flex 
            flex-col
            items-center 
            justify-around 
            inset-0 
            cursor-pointer 
            bg-black/25
            opacity-0
            transition-opacity
            hover:opacity-100
          "
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-white">
              <Heart className="fill-white size-5" />
              <span className="font-semibold text-sm">{reactions.length}</span>
            </div>

            <div className="flex items-center gap-1.5 text-white">
              <MessageCircle className="fill-white size-5" />
              <span className="font-semibold text-sm">{comments.length}</span>
            </div>
          </div>

          <time className="text-white text-xs">
            {formatDistanceToNow(updatedAt || publishedAt, {
              locale: ptBR,
              addSuffix: true,
            })}{' '}
            {updatedAt && '(editado)'}
          </time>
        </div>
      </div>

      <PostPreview
        post={{
          id,
          isOwner,
          content,
          publishedAt,
          updatedAt,
          comments,
          reactions,
        }}
        reaction={reaction}
        user={{ name: isOwner ? `${student?.name} (você)` : adjective, avatar }}
        backgroundColor={colors.bg_color}
        open={modalPreview}
        setOpen={handleModalPreview}
      />
    </>
  )
}
