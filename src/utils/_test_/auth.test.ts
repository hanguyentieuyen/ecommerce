import { describe, it, expect, beforeEach } from 'vitest'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileFromLS,
  setRefreshTokenToLS
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTQ2YzE3MWFmYzJlMWExZjk2YWJkNyIsImVtYWlsIjoieWVuQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMTRUMTY6MTU6MTQuMzI2WiIsImlhdCI6MTY5NzMwMDExNCwiZXhwIjoxNjk3MzAwMTI0fQ.uN6xl27RJSpkyMKIDKjVg4mQIz72WU2PagyxKtpaA2Q'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTQ2YzE3MWFmYzJlMWExZjk2YWJkNyIsImVtYWlsIjoieWVuQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMTRUMTY6MTU6MTQuMzI2WiIsImlhdCI6MTY5NzMwMDExNCwiZXhwIjoxNjk3MzAzNzE0fQ.TVx6wEjL9TyCo-7DAEk9S9twRC0CgVudnkmggsTEQLo'

const profile =
  '{"_id":"64a46c171afc2e1a1f96abd7","roles":["User"],"email":"yen@gmail.com","createdAt":"2023-07-04T18:59:35.762Z","updatedAt":"2023-10-01T08:26:55.984Z","__v":0,"address":"Tp Hồ Chí Minh","date_of_birth":"2000-04-05T17:00:00.000Z","name":"yenha","phone":"012345678","avatar":"f4f192f8-95c3-4c72-8ed7-ac7e735113b5.jpg"}'

// beforeEach run after each describe, reducing depend on between describes and beforeEach must be placed at the same level with describe
beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('check access_token set/get to local storage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
  it('check access_token set/get to local storage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('setRefreshTokenToLS', () => {
  it('check refresh_token set/get to local storage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toEqual(refresh_token)
  })
})

// toEqual kiểm tra giá trị trong nested object bằng nhau => passed
// toBe kiểm tra giá trị trong nested object bằng nhau nhưng khác tham chiếu => failed

describe('setProfileToLS', () => {
  it('check profile set/get to local storage', () => {
    setProfileFromLS(JSON.parse(profile))
    expect(getProfileFromLS()).toEqual(JSON.parse(profile))
  })
})

describe('clearLS', () => {
  it('clearLS', () => {
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileFromLS(JSON.parse(profile))
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
    expect(getProfileFromLS()).toBe(null)
  })
})
