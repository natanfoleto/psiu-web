import { useState } from 'react'

import { ButtonNewPost } from './button-new-post'

export function NewPost() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <ButtonNewPost onClick={handleOpen} />

      {open && (
        <div
          onClick={handleClose}
          className="absolute inset-0 flex justify-center bg-black/25 py-24"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[576px] h-96 rounded-lg bg-zinc-800"
          >
            <div className="bg-zinc-900 p-2 rounded-t-lg">
              <h1 className="text-zinc-300 text-sm font-semibold text-center">
                Criar nova publicação
              </h1>
            </div>

            <form className="flex flex-col">
              <textarea
                placeholder="Sobre o que você quer falar?"
                className="flex-1"
              ></textarea>

              <button>Postar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
