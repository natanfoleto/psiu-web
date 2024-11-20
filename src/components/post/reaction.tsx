import { Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ReactionProps {
  className?: string
  position?: 'top' | 'left'
}

export function Reaction({ className = '', position = 'top' }: ReactionProps) {
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
          <button onClick={handleClose} className="hover:scale-[132.5%]">
            ❤️
          </button>

          <button onClick={handleClose} className="hover:scale-[132.5%]">
            🙏
          </button>

          <button onClick={handleClose} className="hover:scale-[132.5%]">
            💪
          </button>

          <button onClick={handleClose} className="hover:scale-[132.5%]">
            😢
          </button>

          <button onClick={handleClose} className="hover:scale-[132.5%]">
            🤝
          </button>
        </div>
      )}
    </div>
  )
}
