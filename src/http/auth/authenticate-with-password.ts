import { api } from '../api-client'

export interface Student {
  id: string
  ra: string
  name: string
  birthdate: string
  createdAt: string
  updatedAt: string | null
}

export interface AuthenticateWithPasswordRequest {
  ra: string
  password: string
}

export interface AuthenticateWithPasswordResponse {
  result: 'success' | 'error'
  message?: string
  data?: {
    student: Student
  }
}

export async function authenticateWithPassword({
  ra,
  password,
}: AuthenticateWithPasswordRequest) {
  const result = await api
    .post('authenticate/password', {
      json: {
        ra,
        password,
      },
    })
    .json<AuthenticateWithPasswordResponse>()

  return result
}
