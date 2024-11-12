import type { ImgHTMLAttributes } from 'react'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
}

export function Avatar({ className = '', ...rest }: AvatarProps) {
  return (
    <img {...rest} alt="" className={`bg-zinc-200 rounded-full ${className}`} />
  )
}
