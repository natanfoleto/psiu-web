import { api } from '../api-client'

export interface UploadStudentRequest {
  formData: FormData
}

export interface UploadStudentResponse {
  result: 'success' | 'error'
  data: {
    name: string
    ra: string
    birthdate: string
    password: string
  }[]
  message?: string
}

export async function uploadStudent({ formData }: UploadStudentRequest) {
  const response = await api
    .post('student/upload', {
      body: formData,
    })
    .json<UploadStudentResponse>()

  return response
}
