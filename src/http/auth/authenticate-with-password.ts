import { api } from '../api-client'

interface AuthenticateWithPasswordRequest {
  ra: string
  password: string
}

interface AuthenticateWithPasswordResponse {
  result: 'success' | 'error'
  message?: string
  data?: {
    token: string
    student: {
      id: string
      ra: string
      name: string
      birthdate: string
      createdAt: string
      updatedAt: string | null
    }
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
