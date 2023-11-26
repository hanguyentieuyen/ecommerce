import { http } from 'msw'
import config from '../constant/config'
import { HttpStatusCode } from 'axios'

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '64a46c171afc2e1a1f96abd7',
    roles: ['User'],
    email: 'yen@gmail.com',
    createdAt: '2023-07-04T18:59:35.762Z',
    updatedAt: '2023-10-01T08:26:55.984Z',
    address: 'Tp Hồ Chí Minh',
    date_of_birth: '2000-04-05T17:00:00.000Z',
    name: 'yenha',
    phone: '012345678',
    avatar: 'f4f192f8-95c3-4c72-8ed7-ac7e735113b5.jpg'
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meRequests = http.get(`${config.baseURL}me`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meRes))
})

const userRequests = [meRequests]
export default userRequests
