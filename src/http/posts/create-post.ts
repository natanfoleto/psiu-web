import { api } from '../api-client'
import type { IPost } from './types'

export interface CreatePostRequest {
  content: string
}

export interface CreatePostResponse {
  result: 'success' | 'error'
  message?: string
  data: {
    post: IPost
  }
}

export async function createPost({ content }: CreatePostRequest) {
  const response = await api
    .post('post', {
      json: {
        content,
      },
    })
    .json<CreatePostResponse>()

  return response
}
