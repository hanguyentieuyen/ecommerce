import path from 'src/constant/path'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, it, beforeAll } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

//expect.extend(matchers)
describe('Login', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement
  beforeAll(async () => {
    renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email'))
    })
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
  })
  it('Hien thi loi required khi khong nhap gi', async () => {
    fireEvent.submit(submitButton)
    //await logScreen()
    expect(screen.findByText('Email là bắt buộc')).toBeTruthy()
    expect(screen.findByText('Password là bắt buộc')).toBeTruthy()
  })
  it('Hien thi lỗi nhập sai đinh dạng form', async () => {
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
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng'))
      expect(screen.findByText('Độ dài từ 6 - 160 ký tự')).toBeTruthy()
    })
  })

  it('không hiển thị lỗi khi nhập lại đúng value', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123456'
      }
    })
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeFalsy()
    })

    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Main page | Shopee clone')
    })
    await logScreen()
    //console.log(await screen.queryByText('Email không đúng định dạng')) => null
  })
})
