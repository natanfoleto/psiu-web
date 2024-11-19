import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Heart } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { TAILWIND_COLORS } from '@/constants/tailwind-colors'
import { getRandomAdjective } from '@/utils/get-random-adjective'

import { Avatar } from '../avatar'
import type { Reaction } from '.'

export interface CommentProps {
  id: string
  postId: string
  content: string
  commentedAt: string
  updatedAt: string | null
  reactions: Reaction[]
}

export function Comment({
  content,
  commentedAt,
  updatedAt,
  reactions,
}: CommentProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const paragraphRef = useRef<HTMLParagraphElement | null>(null)

  function handleToggleExpanded() {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    if (paragraphRef.current) {
      setIsOverflowing(paragraphRef.current.scrollHeight > 160)
    }
  }, [])

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
    <div className="grid grid-cols-12 items-center gap-3">
      <div className="col-span-11 flex items-start gap-3">
        <Avatar src={avatar} className={`w-10 h-10 ${colors.bg_color}`} />

        <div>
          <p
            ref={paragraphRef}
            className={`
              text-zinc-400 
              text-sm 
              overflow-hidden 
              ${isExpanded ? '' : isOverflowing ? 'h-40' : ''}
            `}
          >
            <span className="text-zinc-300 text-sm font-semibold mr-2">
              {adjective}
            </span>
            {content}
          </p>

          {isOverflowing && (
            <button
              onClick={handleToggleExpanded}
              className="
                  text-sm 
                  text-zinc-400 
                  cursor-pointer 
                  transition-colors 
                  hover:text-zinc-300
                "
            >
              {isExpanded ? 'ver menos...' : 'ver mais...'}
            </button>
          )}

          <div className="space-x-3 text-zinc-500 text-xs font-medium mt-2">
            <time>
              {formatDistanceToNow(updatedAt || commentedAt, {
                locale: ptBR,
              })}{' '}
              {updatedAt && '(editado)'}
            </time>

            <span className="cursor-pointer transition-colors hover:text-zinc-300">
              {reactions.length} reações
            </span>
          </div>
        </div>
      </div>

      <Heart className="col-span-1 size-4 text-zinc-300 cursor-pointer transition-opacity hover:opacity-50" />
    </div>
  )
}
