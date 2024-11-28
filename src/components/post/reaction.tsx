import { HTTPError } from 'ky'
import { Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { usePost } from '@/contexts/post'
import { EnumTypeReaction } from '@/http/reactions/types'

interface ReactionProps {
  className?: string
  position?: 'top' | 'left'
  postId?: string
  commentId?: string
}

export function Reaction({
  className = '',
  position = 'top',
  postId,
  commentId,
}: ReactionProps) {
  const { onCreatePostReaction } = usePost()

  const [open, setOpen] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const positionReaction =
    position === 'top'
      ? '-top-10 left-1/2 -translate-x-1/2'
      : position === 'left'
        ? '-top-1/2 -left-0 -translate-x-full'
        : ''

  const paddingReaction =
    position === 'top' ? 'py-3' : position === 'left' ? 'px-3' : ''

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  function handleMouseMove() {
    if (!open) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Configura o timeout para abrir o modal após 500ms
      timeoutRef.current = setTimeout(() => {
        handleOpen()
      }, 250)
    }
  }

  function handleMouseLeave() {
    if (open) handleClose()

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  async function handleReact(type: EnumTypeReaction) {
    try {
      if (postId) {
        const { result } = await onCreatePostReaction({ postId, type })

        if (result === 'success') handleClose()
      }

      if (commentId) {
        // Cria a reação do comentrário
      }
    } catch (error) {
      console.log(error)

      if (error instanceof HTTPError) {
        const { message } = await error.response.json()

        toast.error(message)
      }
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${paddingReaction}`}
    >
      <Heart
        className={`cursor-pointer transition-opacity hover:opacity-50 ${className}`}
      />

      {open && (
        <div
          className={`
            absolute 
            ${positionReaction}
            flex 
            items-center
            gap-2
            rounded-md 
            p-2
            bg-zinc-700
            
          `}
        >
          <button
            onClick={() => handleReact(EnumTypeReaction.APOIO)}
            className="hover:scale-[132.5%]"
          >
            ❤️
          </button>

          <button
            onClick={() => handleReact(EnumTypeReaction.ENTENDO_VOCE)}
            className="hover:scale-[132.5%]"
          >
            🙌
          </button>

          <button
            onClick={() => handleReact(EnumTypeReaction.FORCA)}
            className="hover:scale-[132.5%]"
          >
            💪
          </button>

          <button
            onClick={() => handleReact(EnumTypeReaction.TRISTEZA)}
            className="hover:scale-[132.5%]"
          >
            😢
          </button>

          <button
            onClick={() => handleReact(EnumTypeReaction.ESTAMOS_JUNTOS)}
            className="hover:scale-[132.5%]"
          >
            🤝
          </button>
        </div>
      )}
    </div>
  )
}
