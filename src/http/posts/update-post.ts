import { api } from '../api-client'

export interface UpdatePostRequest {
  postId: string
  content: string
}

export interface UpdatePostResponse {
  result: 'success' | 'error'
  message?: string
}

export async function updatePost({ postId, content }: UpdatePostRequest) {
  const response = await api
    .put(`post/${postId}`, {
      json: {
        content,
      },
    })
    .json<UpdatePostResponse>()

  return response
}
