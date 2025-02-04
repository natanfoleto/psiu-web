import { api } from '../api-client'

export interface AuthenticateUploadRequest {
  password: string
}

export interface AuthenticateUploadResponse {
  result: 'success' | 'error'
  message?: string
}

export async function authenticateUpload({
  password,
}: AuthenticateUploadRequest) {
  const response = await api
    .post('authenticate/upload', {
      json: {
        password,
      },
    })
    .json<AuthenticateUploadResponse>()

  return response
}
