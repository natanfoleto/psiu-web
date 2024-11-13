import { Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Avatar } from '../avatar'

export function Comment() {
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

  return (
    <div>
      <div className="grid grid-cols-12 items-center gap-3">
        <div className="col-span-11 flex items-start gap-3">
          <Avatar className="min-w-10 min-h-10" />

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
                natanfoleto
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
          </div>
        </div>

        <Heart className="col-span-1 size-4 text-zinc-300" />
      </div>
    </div>
  )
}
