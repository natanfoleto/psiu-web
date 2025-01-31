import { api } from '../api-client'

export interface UploadStudentRequest {
  formData: FormData
}

export interface UploadStudent {
  name: string
  ra: string
  birthdate: string
  password: string
}

export interface UploadStudentResponse {
  result: 'success' | 'error'
  data: UploadStudent[]
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
