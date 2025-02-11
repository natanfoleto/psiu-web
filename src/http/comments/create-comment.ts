import { api } from '../api-client'
import type { IComment } from './types'

export interface CreateCommentRequest {
  postId: string
  content: string
}

export interface CreateCommentResponse {
  result: 'success' | 'error'
  message?: string
  data: {
    comment: IComment
  }
}

export async function createComment({ postId, content }: CreateCommentRequest) {
  const response = await api
    .post(`comment/${postId}`, {
      json: {
        content,
      },
    })
    .json<CreateCommentResponse>()

  return response
}
