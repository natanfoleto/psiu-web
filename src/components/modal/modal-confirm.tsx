import { useCallback, useEffect } from 'react'

import { ButtonModal } from './button-modal'

interface ModalConfirmProps {
  title: string
  description?: string
  onConfirm(): void
  open: boolean
  setOpen(): void
}

export function ModalConfirm({
  title,
  description,
  onConfirm,
  open,
  setOpen,
}: ModalConfirmProps) {
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

  return (
    open && (
      <div
        onClick={(e) => {
          setOpen()
          e.stopPropagation()
        }}
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 py-24"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[400px] rounded-lg bg-zinc-800"
        >
          <div className="text-center space-y-1.5 p-8">
            <h1 className="text-zinc-300">{title}</h1>
            <p className="text-zinc-400 text-xs">{description}</p>
          </div>

          <div>
            <ButtonModal
              onClick={onConfirm}
              className="text-red-500 font-medium"
            >
              Sim
            </ButtonModal>

            <ButtonModal onClick={setOpen} className="text-zinc-300">
              Cancelar
            </ButtonModal>
          </div>
        </div>
      </div>
    )
  )
}
