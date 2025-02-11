import { api } from '../api-client'
import type { EnumTypeReaction, IReactionComment } from './types'

export interface CreateCommentReactionRequest {
  commentId: string
  type: EnumTypeReaction
}

export interface CreateCommentReactionResponse {
  result: 'error' | 'success'
  message?: string
  data: {
    reaction: IReactionComment
  }
}

export async function createCommentReaction({
  commentId,
  type,
}: CreateCommentReactionRequest) {
  const response = await api
    .post(`reaction/comment/${commentId}`, {
      json: {
        type,
      },
    })
    .json<CreateCommentReactionResponse>()

  return response
}
