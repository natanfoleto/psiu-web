import { X } from 'lucide-react'
import { useState } from 'react'

import type { IReactionComment, IReactionPost } from '@/http/reactions/types'

interface ReactionListProps {
  open: boolean
  setOpen(): void
  reactions: IReactionPost[] | IReactionComment[]
}

const tabs = [
  { id: 'all', title: 'Tudo' },
  { id: '0', title: '❤️' },
  { id: '1', title: '🙌' },
  { id: '2', title: '💪' },
  { id: '3', title: '😢' },
  { id: '4', title: '🤝' },
] as const

export function ReactionList({ open, setOpen }: ReactionListProps) {
  const [activeTab, setActiveTab] = useState('all')

  return (
    open && (
      <div
        onClick={setOpen}
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 py-24"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[500px] rounded-lg bg-zinc-800"
        >
          <div className="p-1 flex items-center justify-between">
            <div className="space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 
                    py-3  
                    text-sm 
                    font-semibold
                    rounded-lg
                    transition-colors 
                    hover:bg-yellow-500
                    ${activeTab === tab.id ? 'bg-yellow-500' : 'text-zinc-300'}
                  `}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            <button onClick={setOpen} className="px-4 py-3">
              <X className="size-5 text-zinc-200" />
            </button>
          </div>

          <div className="p-4 text-zinc-200">
            {activeTab === 'all' && <p>Tab tudo</p>}
            {activeTab === '0' && <p>Tab coração</p>}
            {activeTab === '1' && <p>Tab mão pra cima</p>}
            {activeTab === '2' && <p>Tab força</p>}
            {activeTab === '3' && <p>Tab triste</p>}
            {activeTab === '4' && <p>Tab estamos juntos</p>}
          </div>
        </div>
      </div>
    )
  )
}
