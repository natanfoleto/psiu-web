import { api } from '../api-client'

export interface UpdatePasswordRequest {
  password: string
  newPassword: string
  confirmNewPassword: string
}

export interface UpdatePasswordResponse {
  result: 'success' | 'error'
  message?: string
}

export async function updatePassword({
  password,
  newPassword,
  confirmNewPassword,
}: UpdatePasswordRequest) {
  const response = await api
    .patch('authenticate/password', {
      json: {
        password,
        newPassword,
        confirmNewPassword,
      },
    })
    .json<UpdatePasswordResponse>()

  return response
}
