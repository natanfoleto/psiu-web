import { createContext, useCallback, useContext } from 'react'

import { useStorage } from '@/hooks/use-storage'
import type { Student } from '@/http/auth/authenticate-with-password'
import {
  updatePassword,
  type UpdatePasswordRequest,
  type UpdatePasswordResponse,
} from '@/http/auth/update-password'
import {
  updateStudent,
  type UpdateStudentRequest,
  type UpdateStudentResponse,
} from '@/http/students/update-student'

import type { AuthContextType, AuthProviderProps } from './types'

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [student, setStudent] = useStorage<Student | null>('student', null)

  const handleStudent = useCallback(
    ({ id, name, ra, birthdate, createdAt, updatedAt }: Student) => {
      setStudent({ id, name, ra, birthdate, createdAt, updatedAt })
    },
    [setStudent],
  )

  const onUpdateStudent = useCallback(
    async ({
      name,
      birthdate,
    }: UpdateStudentRequest): Promise<UpdateStudentResponse> => {
      const { result, message } = await updateStudent({ name, birthdate })

      if (result === 'success') {
        const newStudent = {
          ...student!,
          name,
          birthdate,
        }

        handleStudent(newStudent)
      }

      return { result, message }
    },
    [handleStudent, student],
  )

  const onUpdatePassword = useCallback(
    async ({
      password,
      newPassword,
      confirmNewPassword,
    }: UpdatePasswordRequest): Promise<UpdatePasswordResponse> => {
      const { result, message } = await updatePassword({
        password,
        newPassword,
        confirmNewPassword,
      })

      return { result, message }
    },
    [],
  )

  const signOut = () => {
    setStudent(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!student,
        student,
        handleStudent,
        onUpdateStudent,
        onUpdatePassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextType {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
