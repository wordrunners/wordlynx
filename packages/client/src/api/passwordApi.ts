import { request } from '@/Core/apiRequest'
import { hasError } from '@/utils/apiHasError'

type PasswordRequestData = {
  oldPassword?: string
  newPassword: string
}

export const passwordAPI = async (requestData: PasswordRequestData) => {
  const response = await request.put('/user/password', requestData)

  if (hasError(response)) {
    return response.reason
  }
  return 'password changed'
}
