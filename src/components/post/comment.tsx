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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Consequatur blanditiis
            eum omnis, earum dicta eligendi eius repellat magnam aspernatur
            consequuntur quae, cum itaque est vitae facilis voluptatibus saepe
            illum ipsam? Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Voluptate, harum! Quod, libero quo mollitia ab recusandae quia
            odit expedita enim voluptatum modi aspernatur, eveniet suscipit?
            Totam eveniet quo esse in? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Placeat quasi, maxime aliquid doloribus at
            suscipit in illum debitis repellat quas iusto! A explicabo nam,
            ducimus dignissimos magnam suscipit nostrum quidem!
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
            <time>2sem</time>

            <span className="cursor-pointer transition-colors hover:text-zinc-300">
              13 reações
            </span>
          </div>
        </div>
      </div>

      <Heart className="col-span-1 size-4 text-zinc-300 cursor-pointer transition-opacity hover:opacity-50" />
    </div>
  )
}
