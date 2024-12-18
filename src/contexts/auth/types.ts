import type { ReactNode } from 'react'

import type { Student } from '@/http/auth/authenticate-with-password'
import type {
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from '@/http/auth/update-password'
import type {
  UpdateStudentRequest,
  UpdateStudentResponse,
} from '@/http/students/update-student'

export interface AuthProviderProps {
  children: ReactNode
}

export interface AuthContextType {
  signed: boolean
  student: Student | null
  handleStudent(student: Student): void
  onUpdateStudent(student: UpdateStudentRequest): Promise<UpdateStudentResponse>
  onUpdatePassword(data: UpdatePasswordRequest): Promise<UpdatePasswordResponse>
  signOut(): void
}
