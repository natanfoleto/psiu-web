import { api } from '../api-client'
import type { IPost } from './types'

export interface GetPostsByStudentRequest {
  studentId: string
}

export interface GetPostsByStudentResponse {
  result: 'success' | 'error'
  message?: string
  data: IPost[]
}

export async function getPostsByStudent({
  studentId,
}: GetPostsByStudentRequest) {
  const response = api
    .get(`post/student/${studentId}`)
    .json<GetPostsByStudentResponse>()

  return response
}
