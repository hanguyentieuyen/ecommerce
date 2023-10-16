import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import { ErrorResponseApi } from 'src/types/utils.type'
import {
  clearLS,
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setProfileFromLS,
  getRefreshTokenFromLS
} from './auth'
import config from 'src/constant/config'
import { isAxiosUnauthorizedError, isAxiosExpiredTokenError } from 'src/utils/utils'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 day
        'expire-refresh-token': 60 * 60 * 24 * 100 // 100 days
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileFromLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        // toast error that error is not 401 422
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        // 401 Unauthorized error: wrong token, empty token, expire token
        if (isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          const { url } = config
          // case: expire token error and this request is not request of refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Restrict call 2 times request refresh token
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Hold refreshTokenRequest for 10 seconds
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return (
              this.refreshTokenRequest &&
              this.refreshTokenRequest.then((access_token) => {
                if (config.headers) config.headers.authorization = access_token
                // call again old request
                return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
              })
            )
          }
          // case toast: wrong token, miss token, refresh token fail
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}
const http = new Http().instance
export default http
