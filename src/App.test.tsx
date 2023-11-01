import { describe, expect, test } from 'vitest'
import { logScreen, renderWithRouter } from './utils/testUtils'
import path from './constant/path'
import { waitFor, screen } from '@testing-library/react'

//expect.extend(matchers)
describe('App', () => {
  test('App render and navigate page', async () => {
    const { user } = renderWithRouter()
    /**
     * waitFor sẽ run callback 1 vài lần
     * cho đến khi hết timeout hoặc expect pass
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout = 1000ms và interval = 50ms
     */

    // Verify vào đúng trang chủ
    // await waitFor(() => {
    //   expect(document.querySelector('title')?.textContent).toBe('Main pagE | Shopee clone')
    // })

    // Verify chuyển sang trang login
    // await user.click(screen.getByText(/Đăng nhập/i))
    // await waitFor(() => {
    //   expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
    //   expect(document.querySelector('title')?.textContent).toBe('Login | Shopee clone')
    // })
  })

  test('Go to not found page', async () => {
    const wrongRoute = '/wrong/route'
    renderWithRouter({ route: wrongRoute })
    await logScreen()
  })
  test('Go to not register page', async () => {
    renderWithRouter({ route: path.register })
    await logScreen()
  })
})
