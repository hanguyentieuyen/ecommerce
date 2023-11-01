import { AxiosError, HttpStatusCode } from 'axios'
import { demo, isAxiosError, isAxiosUnprocessableEntityError } from '../utils'
import { describe, it, test, expect } from 'vitest'

// describe dùng mô tả ngữ cảnh hoặc 1 đơn vị test (unit test)
describe('isAxiosError', () => {
  // it dùng để ghi chứ trường hơp cần test
  it('isAxiosError trả về boolean', () => {
    // Mong đơi trả false khi truyền lỗi thường ko phải lỗi axios
    expect(isAxiosError(new Error())).toBe(false)
    // Mong đợi trả về true khi truyền lỗi liên quan axios
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('', () => {
  it('isAxiosUnprocessableEntityError trả về boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})
// Test converage branch
describe('demo', () => {
  test('demo return 2', () => {
    // expect(demo(4)).toBe(2)
    expect(demo(3)).toBe(1)
  })
})
