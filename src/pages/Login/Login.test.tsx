import path from 'src/constant/path'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, it } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
//import matchers from '@testing-library/jest-dom/matchers'
//import '@testing-library/jest-dom'
//expect.extend(matchers)

describe('Login', () => {
  it('Hien thi loi required khi khong nhap gi', () => {
    const { user } = renderWithRouter({ route: path.login })
    renderWithRouter({ route: path.login })
    // waitFor(() => {
    //   expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    // })
    const submitButton = document.querySelector('form button[type="submit"]') as Element
    user.click(submitButton)
    expect(screen.findByText('Email là bắt buộc')).toBeTruthy()
    expect(screen.findByText('Password là bắt buộc')).toBeTruthy()
    //await logScreen()
  })
})
