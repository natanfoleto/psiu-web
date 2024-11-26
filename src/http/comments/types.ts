import type { IReactionComment } from '../reactions/types'

export interface IComment {
  id: string
  postId: string
  content: string
  commentedAt: string
  updatedAt: string | null
  reactions: IReactionComment[]
}
