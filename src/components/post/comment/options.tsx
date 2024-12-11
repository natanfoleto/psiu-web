import { HTTPError } from 'ky'
import { useState } from 'react'
import { toast } from 'sonner'

import { ButtonOption } from '@/components/button-option'
import { ModalConfirm } from '@/components/modal/modal-confirm'
import { usePost } from '@/contexts/post'

interface OptionsProps {
  commentId: string
  isOwner: boolean
  open: boolean
  setOpen(): void
}

export function Options({ commentId, isOwner, open, setOpen }: OptionsProps) {
  const { onDeleteComment } = usePost()

  const [modalConfirmDeleteComment, setModalConfirmDeleteComment] =
    useState(false)

  function handleModalConfirmDeleteComment() {
    setModalConfirmDeleteComment(!modalConfirmDeleteComment)
  }

  async function handleDeleteComment() {
    try {
      await onDeleteComment({ commentId })
    } catch (error) {
      console.log(error)

      if (error instanceof HTTPError) {
        const { message } = await error.response.json()

        toast.error(message)
      }
    }
  }

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
              onClick={handleModalConfirmDeleteComment}
            >
              Excluir
            </ButtonOption>
          ) : (
            <ButtonOption
              className="text-red-500 font-medium"
              onClick={() => {
                //
              }}
            >
              Denunciar
            </ButtonOption>
          )}

          <ButtonOption className="text-zinc-300" onClick={setOpen}>
            Cancelar
          </ButtonOption>
        </div>

        <ModalConfirm
          title="Excluir comentário?"
          description="Tem certeza de que deseja excluir esse comentário?"
          onConfirm={handleDeleteComment}
          open={modalConfirmDeleteComment}
          setOpen={handleModalConfirmDeleteComment}
        />
      </div>
    )
  )
}
