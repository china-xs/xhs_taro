import { request } from './request'

type PhoneLoginPayload = {
  encryptedData?: string
  iv?: string
  code?: string
}

type PhoneLoginResponse = {
  token?: string
  user?: Record<string, any>
}

export const loginByPhone = (payload: PhoneLoginPayload) => {
  return request<PhoneLoginResponse>({
    url: '/api/auth/phone',
    method: 'POST',
    data: payload
  })
}
