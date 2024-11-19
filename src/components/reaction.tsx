interface ReactionProps {
  open: boolean
  onClose(): void
}

export function Reaction({ open, onClose }: ReactionProps) {
  function handleReact() {
    onClose()
  }

  return (
    open && (
      <div
        className="
          absolute 
          -top-12 
          left-1/2 
          -translate-x-1/2 
          flex 
          items-center
          gap-2
          rounded-md 
          p-2
          bg-zinc-700
          animate-slide-up
        "
      >
        <button onClick={handleReact} className="hover:scale-[132.5%]">
          ❤️
        </button>

        <button onClick={handleReact} className="hover:scale-[132.5%]">
          🙏
        </button>

        <button onClick={handleReact} className="hover:scale-[132.5%]">
          💪
        </button>

        <button onClick={handleReact} className="hover:scale-[132.5%]">
          😢
        </button>

        <button onClick={handleReact} className="hover:scale-[132.5%]">
          🤝
        </button>
      </div>
    )
  )
}
