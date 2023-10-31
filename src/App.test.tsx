import { describe, expect, test } from 'vitest'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

expect.extend(matchers)
describe('App', () => {
  test('App render and navigate page', async () => {
    const user = userEvent.setup()
    render(<App />, { wrapper: BrowserRouter })
    /**
     * waitFor sẽ run callback 1 vài lần
     * cho đến khi hết timeout hoặc expect pass
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout = 1000ms và interval = 50ms
     */

    // Verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Main page | Shopee clone')
    })

    // Verify chuyển sang trang login
    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Login | Shopee clone')
    })
    // console.log render
    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
})
