import path from 'src/constant/path'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, it, beforeAll } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)
describe('Login', () => {
  beforeAll(async () => {
    renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
  })
  it('Hien thi loi required khi khong nhap gi', async () => {
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    fireEvent.submit(submitButton)
    //await logScreen()
    expect(screen.findByText('Email là bắt buộc')).toBeTruthy()
    expect(screen.findByText('Password là bắt buộc')).toBeTruthy()
  })
  it('Hien thi lỗi nhập sai đinh dạng form', async () => {
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    fireEvent.change(emailInput, {
      target: {
        value: 'test@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })
    fireEvent.submit(submitButton)
    expect(screen.findByText('Email không đúng định dạng')).toBeTruthy()
    expect(screen.findByText('Độ dài từ 6 - 160 ký tự')).toBeTruthy()
  })
})
