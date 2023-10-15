import { describe, it, expect } from 'vitest'
import http from '../http'
import { HttpStatusCode } from 'axios'

describe('http axios', () => {
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
})
