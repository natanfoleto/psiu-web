import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Bookmark, Ellipsis, MessageCircle, X } from 'lucide-react'
import { type FormEvent, useRef, useState } from 'react'

import type { IPost } from '@/http/posts/types'

import { Avatar } from '../avatar'
import { Comment } from './comment'
import { Options } from './options'
import { Reaction } from './reaction'

interface PostPreviewProps {
  post: IPost
  user?: {
    name: string
    avatar: string
  }
  backgroundColor?: string
  open: boolean
  setOpen(): void
}

export function PostPreview({
  post,
  user,
  backgroundColor,
  open,
  setOpen,
}: PostPreviewProps) {
  const [comment, setComment] = useState('')
  const [modalOptions, setModalOptions] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleModalOptions() {
    setModalOptions(!modalOptions)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
  }

  return (
    open && (
      <div
        onClick={setOpen}
        className="absolute inset-0 z-10 flex justify-center bg-black/25 py-8"
      >
        <X
          onClick={setOpen}
          className="absolute top-4 right-8 text-zinc-300 cursor-pointer"
        />

        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[1280px] grid grid-cols-12 rounded-lg bg-zinc-800"
        >
          <div className="col-span-7 flex justify-center items-center p-6">
            <p className="text-zinc-300 text-center">{post.content}</p>
          </div>

          <div className="flex flex-col col-span-5 bg-zinc-950 rounded-r-lg">
            <div className="flex justify-between border-b-[1px] border-zinc-900 p-6">
              <div className="flex items-center gap-3">
                <Avatar
                  src={user?.avatar}
                  className={`size-10 ${backgroundColor}`}
                />

                <div>
                  <h1 className="text-zinc-300 text-sm font-semibold">
                    {user?.name}
                  </h1>

                  <time className="text-zinc-500 text-xs">
                    {formatDistanceToNow(post.updatedAt || post.publishedAt, {
                      locale: ptBR,
                    })}{' '}
                    {post.updatedAt && '(editado)'}
                  </time>
                </div>
              </div>

              <Ellipsis
                onClick={handleModalOptions}
                className="text-zinc-500 size-5 cursor-pointer transition-colors hover:text-zinc-400"
              />
            </div>

            <div
              className="overflow-y-scroll overflow-x-hidden space-y-8 flex-1 border-b-[1px] border-zinc-900 p-6"
              style={{ maxHeight: 'calc(100vh - 258px)' }}
            >
              {post.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={{
                    id: comment.id,
                    postId: comment.postId,
                    content: comment.content,
                    commentedAt: comment.commentedAt,
                    updatedAt: comment.updatedAt,
                    reactions: comment.reactions,
                  }}
                />
              ))}
            </div>

            <div className="border-b-[1px] border-zinc-900 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Reaction className="size-5" />

                  <MessageCircle
                    onClick={() => inputRef.current?.focus()}
                    className="size-5 cursor-pointer transition-opacity hover:opacity-50"
                  />
                </div>

                <Bookmark className="size-5 text-zinc-400 cursor-pointer transition-opacity hover:opacity-50" />
              </div>

              <p className="text-xs text-zinc-400 cursor-pointer hover:underline">
                <strong>{post.reactions.length}</strong> pessoas reagiram essa
                publicação
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                ref={inputRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Adicione um comentário"
                className="flex-1 bg-transparent text-xs text-zinc-300 outline-0 border-0 p-4"
              />

              <button
                disabled={!comment}
                className="h-min px-2 text-yellow-500 text-sm font-semibold transition-colors disabled:text-zinc-500"
              >
                Publicar
              </button>
            </form>
          </div>

          <Options open={modalOptions} setOpen={handleModalOptions} />
        </div>
      </div>
    )
  )
}
