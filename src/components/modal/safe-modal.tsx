import { type ReactNode } from 'react'

interface SafeModalProps {
  title: string
  description?: string
  open: boolean
  children: ReactNode
}

export function SafeModal({
  title,
  description,
  open,
  children,
}: SafeModalProps) {
  return (
    open && (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 py-24">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[400px] rounded-lg bg-zinc-800"
        >
          <div className="text-center space-y-1.5 p-8">
            <h1 className="text-zinc-300">{title}</h1>
            <p className="text-zinc-400 text-xs">{description}</p>
          </div>

          {children}
        </div>
      </div>
    )
  )
}
