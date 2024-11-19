import { ButtonOption } from './button-option'

interface OptionsProps {
  open: boolean
  setOpen(): void
}

export function Options({ open, setOpen }: OptionsProps) {
  return (
    open && (
      <div
        onClick={setOpen}
        className="absolute inset-0 flex items-center justify-center bg-black/50 py-24"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[400px] rounded-lg bg-zinc-800"
        >
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

          <ButtonOption
            onClick={() => {
              //
            }}
          >
            Adicionar como favorito
          </ButtonOption>

          <ButtonOption
            onClick={() => {
              //
            }}
          >
            Copiar link
          </ButtonOption>

          <ButtonOption onClick={setOpen}>Cancelar</ButtonOption>
        </div>
      </div>
    )
  )
}
