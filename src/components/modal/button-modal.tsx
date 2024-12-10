import type { ReactNode } from 'react'

interface ButtonModalProps {
  children: ReactNode
  onClick(): void
  className?: string
}

export function ButtonModal({
  children,
  onClick,
  className = '',
}: ButtonModalProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        py-4
        text-sm
        border-t-[1px]
        border-zinc-700
        ${className}
      `}
    >
      {children}
    </button>
  )
}
