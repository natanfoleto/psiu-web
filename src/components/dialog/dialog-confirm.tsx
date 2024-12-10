interface DialogConfirmProps {
  title: string
  description?: string
  onConfirm(): void
  open: boolean
  setOpen(): void
}

export function DialogConfirm({
  title,
  description,
  onConfirm,
  open,
  setOpen,
}: DialogConfirmProps) {
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
          <h1 className="text-zinc-300">{title}</h1>
          <p className="text-zinc-500">{description}</p>

          <button>Sim</button>
          <button>Cancelar</button>
        </div>
      </div>
    )
  )
}
