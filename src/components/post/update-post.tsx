import { HTTPError } from 'ky'
import { type FormEvent, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import { usePost } from '@/contexts/post'

interface UpdatePostProps {
  postId: string
  content: string
  open: boolean
  setOpen(): void
}

export function UpdatePost({
  postId,
  content,
  open,
  setOpen,
}: UpdatePostProps) {
  const { onUpdatePost } = usePost()

  const [newContent, setNewContent] = useState(content)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const { result, message } = await onUpdatePost({
        postId,
        content: newContent,
      })

      if (result === 'success') {
        toast.success(message)

        setOpen()
      }
    } catch (error) {
      console.log(error)

      if (error instanceof HTTPError) {
        const { message } = await error.response.json()

        toast.error(message)
      }
    }
  }

  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        event.stopPropagation()
        setOpen()
      }
    },
    [open, setOpen],
  )

  useEffect(() => {
    if (open) document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open, handleEsc])

  const contentIsDirty = content !== newContent && newContent

  return (
    open && (
      <div
        onClick={setOpen}
        className="absolute inset-0 z-10 flex justify-center bg-black/25 py-24"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-1/2 h-96 rounded-lg bg-zinc-800"
        >
          <div className="bg-zinc-900 p-3 rounded-t-lg">
            <h1 className="text-zinc-300 text-sm font-semibold text-center">
              Editar informações
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col justify-between bg-zinc-800 rounded-lg"
          >
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Sobre o que você quer falar?"
              className="
                  flex-1 
                  bg-transparent 
                  outline-0 
                  text-sm 
                  text-zinc-200 
                  border-b-[1px] 
                  border-zinc-700
                  p-3
                "
            ></textarea>

            <div className="flex justify-end py-4 px-3">
              <Button
                className="bg-yellow-500 text-zinc-950 disabled:bg-zinc-700 disabled:cursor-not-allowed"
                disabled={!contentIsDirty}
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}
