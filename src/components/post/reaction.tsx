import { Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function Reaction() {
  const [open, setOpen] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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
      className="relative py-3"
    >
      <Heart className="size-5 cursor-pointer transition-opacity hover:opacity-50" />

      {open && (
        <div
          className="
          absolute 
          -top-10 
          left-1/2 
          -translate-x-1/2 
          flex 
          items-center
          gap-2
          rounded-md 
          p-2
          bg-zinc-700
          animate-slide-up
        "
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
