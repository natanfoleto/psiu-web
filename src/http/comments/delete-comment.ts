import { api } from '../api-client'

export interface DeleteCommentRequest {
  commentId: string
}

export interface DeleteCommentResponse {
  result: 'success' | 'error'
  message?: string
}

export async function deleteComment({ commentId }: DeleteCommentRequest) {
  const response = await api
    .delete(`comment/${commentId}`)
    .json<DeleteCommentResponse>()

  return response
}
