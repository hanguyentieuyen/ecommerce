import { afterAll, afterEach, beforeAll } from 'vitest'
import { http } from 'msw'
import { setupServer } from 'msw/node'
import config from './src/constant/config'
import { HttpStatusCode } from 'axios'
const loginRes = {
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

export const restHandlers = [
  http.post(`${config.baseURL}login`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
  })
]
const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
