import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import {
  clearLS,
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setProfileFromLS,
  getRefreshTokenFromLS
} from './auth'
import config from 'src/constant/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10,
        'expire-refresh-token': 60 * 60
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
          setAccessTokenToLS(this.accessToken)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((err) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw err
      })
  }
}
const http = new Http().instance
export default http
