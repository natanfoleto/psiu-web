import { api } from '../api-client'
import type { IPost } from './types'

export interface GetPostsRequest {
  _page?: number
  _perPage?: number
}

export interface GetPostsResponse {
  result: 'success' | 'error'
  message?: string
  first: number
  prev: number | null
  next: number | null
  last: number
  items: number
  data: IPost[]
}

export async function getPosts({ _page = 1, _perPage = 10 }: GetPostsRequest) {
  const response = api
    .get('post', {
      searchParams: {
        _page,
        _perPage,
      },
    })
    .json<GetPostsResponse>()

  return response
}
