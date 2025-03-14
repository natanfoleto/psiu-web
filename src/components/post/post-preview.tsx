import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { HTTPError } from 'ky'
import { Bookmark, Ellipsis, MessageCircle, X } from 'lucide-react'
import { type FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { REACTION_LIST } from '@/constants/reactions'
import { usePost } from '@/contexts/post'
import type { IPost } from '@/http/posts/types'
import type { IReactionPost } from '@/http/reactions/types'

import { Avatar } from '../avatar'
import { Comment } from './comment'
import { Options } from './options'
import { Reaction } from './reaction'
import { ReactionList } from './reaction-list'

interface PostPreviewProps {
  post: IPost
  reaction?: IReactionPost
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
  reaction,
  user,
  backgroundColor,
  open,
  setOpen,
}: PostPreviewProps) {
  const { onCreateComment, onDeletePostReaction } = usePost()

  const [comment, setComment] = useState('')
  const [modalOptions, setModalOptions] = useState(false)
  const [modalReactionList, setModalReactionList] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleModalOptions() {
    setModalOptions(!modalOptions)
  }

  function handleModalReactionList() {
    setModalReactionList(!modalReactionList)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const { result } = await onCreateComment({
        postId: post.id,
        content: comment,
      })

      if (result === 'success') setComment('')
    } catch (error) {
      console.log(error)

      if (error instanceof HTTPError) {
        const { message } = await error.response.json()

        toast.error(message)
      }
    }
  }

  async function handleDeleteReaction(reactionId: string) {
    await onDeletePostReaction({ reactionId })
  }

  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open && !modalOptions) {
        event.stopPropagation()
        setOpen()
      }
    },
    [open, modalOptions, setOpen],
  )

  useEffect(() => {
    if (open && !modalOptions) document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open, modalOptions, handleEsc])

  return (
    open && (
      <div
        onClick={setOpen}
        className="absolute inset-0 z-10 flex justify-center bg-black/25 px-4 pb-4 pt-12"
      >
        <X
          onClick={setOpen}
          className="absolute top-4 right-4 text-zinc-300 cursor-pointer"
        />

        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[1280px] flex flex-col justify-between rounded-lg bg-zinc-800 lg:flex-row"
        >
          <div
            className="
              relative 
              w-full
              flex 
              justify-center 
              items-center 
              overflow-hidden 
              px-4 
              pt-4 
              pb-10
              lg:px-8
              lg:pt-8
              lg:pb-20
              lg:w-7/12
            "
          >
            <p className="flex items-center justify-center text-sm text-zinc-300 overflow-y-auto h-full lg:h-full lg:text-base">
              {post.content}
            </p>

            {reaction && (
              <button
                onClick={() => handleDeleteReaction(reaction.id)}
                title="Clique para remover sua reação"
                className="absolute left-1/2 -translate-x-1/2 bottom-2 text-zinc-400 text-xs lg:text-sm lg:bottom-7"
              >
                Você reagiu com {REACTION_LIST[reaction.type].icon}
              </button>
            )}
          </div>

          <div className="flex flex-col w-full bg-zinc-950 rounded-b-lg lg:rounded-l-none lg:rounded-r-lg lg:w-5/12 h-2/3 lg:h-full">
            <div className="flex justify-between border-b-[1px] border-zinc-900 p-3 lg:p-6">
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
              className="overflow-y-scroll overflow-x-hidden space-y-8 flex-1 border-b-[1px] border-zinc-900 p-3 lg:p-6"
              style={{ maxHeight: 'calc(100vh - 264px)' }}
            >
              {post.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={{
                    id: comment.id,
                    isOwner: comment.isOwner,
                    postId: comment.postId,
                    content: comment.content,
                    commentedAt: comment.commentedAt,
                    updatedAt: comment.updatedAt,
                    reactions: comment.reactions,
                  }}
                />
              ))}
            </div>

            <div className="border-b-[1px] border-zinc-900 p-3 pt-0 lg:p-4 lg:py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Reaction postId={post.id} className="size-5" />

                  <MessageCircle
                    onClick={() => inputRef.current?.focus()}
                    className="size-5 cursor-pointer transition-opacity hover:opacity-50"
                  />
                </div>

                <Bookmark className="size-5 text-zinc-400 cursor-pointer transition-opacity hover:opacity-50" />
              </div>

              <p
                onClick={
                  post.reactions.length ? handleModalReactionList : undefined
                }
                className="text-xs text-zinc-400 cursor-pointer hover:underline"
              >
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

          <Options
            postId={post.id}
            content={post.content}
            isOwner={post.isOwner}
            open={modalOptions}
            setOpen={handleModalOptions}
          />

          <ReactionList
            open={modalReactionList}
            setOpen={handleModalReactionList}
            reactions={post.reactions}
          />
        </div>
      </div>
    )
  )
}
