import { api } from '../api-client'
import type { EnumTypeReaction, IReactionPost } from './types'

export interface CreatePostReactionRequest {
  postId: string
  type: EnumTypeReaction
}

export interface CreatePostReactionResponse {
  result: 'error' | 'success'
  message?: string
  data: {
    reaction: IReactionPost
  }
}

export async function createPostReaction({
  postId,
  type,
}: CreatePostReactionRequest) {
  const response = await api
    .post(`reaction/post/${postId}`, {
      json: {
        type,
      },
    })
    .json<CreatePostReactionResponse>()

  return response
}
