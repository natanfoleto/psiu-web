import { HTTPError } from 'ky'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { usePost } from '@/contexts/post'

import { ButtonOption } from '../button-option'
import { ModalConfirm } from '../modal/modal-confirm'

interface OptionsProps {
  postId: string
  isOwner: boolean
  open: boolean
  setOpen(): void
}

export function Options({ postId, isOwner, open, setOpen }: OptionsProps) {
  const { onDeletePost } = usePost()

  const [modalConfirmDeletePost, setModalConfirmDeletePost] = useState(false)

  function handleModalConfirmDeletePost() {
    setModalConfirmDeletePost(!modalConfirmDeletePost)
  }

  async function handleDeletePost() {
    try {
      const { result, message } = await onDeletePost({ postId })

      if (result === 'success') toast.success(message)
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
      if (event.key === 'Escape' && open && !modalConfirmDeletePost) {
        event.stopPropagation()
        setOpen()
      }
    },
    [open, modalConfirmDeletePost, setOpen],
  )

  useEffect(() => {
    if (open && !modalConfirmDeletePost)
      document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open, modalConfirmDeletePost, handleEsc])

  return (
    open && (
      <div
        onClick={setOpen}
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 py-24"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[400px] rounded-lg bg-zinc-800"
        >
          {isOwner ? (
            <ButtonOption
              className="text-red-500 font-medium"
              onClick={handleModalConfirmDeletePost}
            >
              Excluir
            </ButtonOption>
          ) : (
            <>
              <ButtonOption
                className="text-red-500 font-medium"
                onClick={() => {
                  //
                }}
              >
                Denunciar
              </ButtonOption>

              <ButtonOption
                className="text-red-500 font-medium"
                onClick={() => {
                  //
                }}
              >
                Bloquear
              </ButtonOption>
            </>
          )}

          <ButtonOption
            className="text-zinc-300"
            onClick={() => {
              //
            }}
          >
            Adicionar como favorito
          </ButtonOption>

          <ButtonOption
            className="text-zinc-300"
            onClick={() => {
              //
            }}
          >
            Copiar link
          </ButtonOption>

          <ButtonOption className="text-zinc-300" onClick={setOpen}>
            Cancelar
          </ButtonOption>
        </div>

        <ModalConfirm
          title="Excluir publicação?"
          description="Tem certeza de que deseja excluir essa publicação?"
          onConfirm={handleDeletePost}
          open={modalConfirmDeletePost}
          setOpen={handleModalConfirmDeletePost}
        />
      </div>
    )
  )
}
