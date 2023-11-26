import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import authRequest from '././src/msw/auth.msw'
import productRequest from '././src/msw/product.msw'
import userRequests from '././src/msw/user.msw'

const server = setupServer(...authRequest, ...productRequest, ...userRequests)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
