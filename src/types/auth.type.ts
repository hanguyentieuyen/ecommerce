import { User } from './user.type'
import { SuccessResponseApi } from './utils.type'

export type AuthResponse = SuccessResponseApi<{
  access_token: string
  expires: string
  user: User
  refresh_token: string
  expires_refresh_token: number
}>

export type RefreshTokenResponse = SuccessResponseApi<{ access_token: string }>
