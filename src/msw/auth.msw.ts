import { http } from 'msw'
import config from '../constant/config'
import { HttpStatusCode } from 'axios'

export const access_token_1s =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTQ2YzE3MWFmYzJlMWExZjk2YWJkNyIsImVtYWlsIjoieWVuQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMTZUMTU6MDg6MjcuNTExWiIsImlhdCI6MTY5NzQ2ODkwNywiZXhwIjoxNjk3NDY4OTA4fQ.ulRJDmRMZVIGDrE_ioMvoIFX7CK8PWQ1RrltmSVoSgs'
export const refresh_token_100days =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTQ2YzE3MWFmYzJlMWExZjk2YWJkNyIsImVtYWlsIjoieWVuQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMTZUMTU6MDE6NDguMDkxWiIsImlhdCI6MTY5NzQ2ODUwOCwiZXhwIjoxNzA2MTA4NTA4fQ.5AeP3WJBZtQas7mB0PT-tSkBk52Qwrh1VrTSQFH_UDE'

export const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTQ2YzE3MWFmYzJlMWExZjk2YWJkNyIsImVtYWlsIjoieWVuQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMjJUMTU6NTE6MTUuODI0WiIsImlhdCI6MTcwMDY2ODI3NSwiZXhwIjoxODAwNjY4Mjc0fQ.40Mj-T_WXPi6nVYQURvb2chgZrE0D-YKMTQ0O0KwUW4',
    expires: 99999999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTQ2YzE3MWFmYzJlMWExZjk2YWJkNyIsImVtYWlsIjoieWVuQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMjJUMTU6NTE6MTUuODI0WiIsImlhdCI6MTcwMDY2ODI3NSwiZXhwIjoxNzg3MDY4Mjc1fQ.6fKkJ50GBmoN-Pd9lERLWxikpuenY9hxmM8QdWOFIkA',
    expires_refresh_token: 86400000,
    user: {
      _id: '64a46c171afc2e1a1f96abd7',
      roles: ['User'],
      email: 'yen@gmail.com',
      createdAt: '2023-07-04T18:59:35.762Z',
      updatedAt: '2023-10-01T08:26:55.984Z',
      __v: 0,
      address: 'Tp Hồ Chí Minh',
      date_of_birth: '2000-04-05T17:00:00.000Z',
      name: 'yenha',
      phone: '012345678',
      avatar: 'f4f192f8-95c3-4c72-8ed7-ac7e735113b5.jpg'
    }
  }
}

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTQ2YzE3MWFmYzJlMWExZjk2YWJkNyIsImVtYWlsIjoieWVuQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMjZUMTU6MTQ6MjcuMDYzWiIsImlhdCI6MTcwMTAxMTY2NywiZXhwIjoxNzAxNjE2NDY3fQ.JnFQKD11grl0n8X6JFzjG27-i74FwGyKJeWfhuwcOcA'
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loginRequest = http.post(`${config.baseURL}login`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
})

const refreshRequest = http.post(`${config.baseURL}login`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshTokenRes))
})
const authRequest = [loginRequest, refreshRequest]
export default authRequest
