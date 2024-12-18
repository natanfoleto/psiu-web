import { api } from '../api-client'

export interface UpdateStudentRequest {
  name: string
  birthdate: string
}

export interface UpdateStudentResponse {
  result: 'success' | 'error'
  message?: string
}

export async function updateStudent({ name, birthdate }: UpdateStudentRequest) {
  const response = await api
    .put('student', {
      json: {
        name,
        birthdate,
      },
    })
    .json<UpdateStudentResponse>()

  return response
}
