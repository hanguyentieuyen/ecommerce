import { describe, it, expect, beforeEach } from 'vitest'
import { HttpStatusCode } from 'axios'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'
import { Http } from '../http'

const access_token_1s =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTQ2YzE3MWFmYzJlMWExZjk2YWJkNyIsImVtYWlsIjoieWVuQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMTZUMTU6MDg6MjcuNTExWiIsImlhdCI6MTY5NzQ2ODkwNywiZXhwIjoxNjk3NDY4OTA4fQ.ulRJDmRMZVIGDrE_ioMvoIFX7CK8PWQ1RrltmSVoSgs'
const refresh_token_100days =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTQ2YzE3MWFmYzJlMWExZjk2YWJkNyIsImVtYWlsIjoieWVuQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMTZUMTU6MDE6NDguMDkxWiIsImlhdCI6MTY5NzQ2ODUwOCwiZXhwIjoxNzA2MTA4NTA4fQ.5AeP3WJBZtQas7mB0PT-tSkBk52Qwrh1VrTSQFH_UDE'

describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear() // clear LS first and create new instance
    // Nếu ko clear local storage trước, access_token, refresh token bị cache (trong contructor())
    http = new Http().instance
  })
  it('call request api', async () => {
    // Không dùng các hàm trong folder api, vì đang test file http thì nên dùng http.
    // vì folder api lỡ có thay đổi thì ko ảnh hưởng tới file test này
    const res = await http.get('products')
    //console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('call auth request api', async () => {
    await http.post('login', {
      email: 'yen@gmail.com',
      password: '123456'
    })
    const res = await http.get('me')
    //console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('refresh token', async () => {
    setAccessTokenToLS(access_token_1s)
    setRefreshTokenToLS(refresh_token_100days)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
