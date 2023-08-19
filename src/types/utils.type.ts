export interface SuccessResponseApi<Data> {
  message: string
  data: Data
}
export interface ErrorResponseApi<Data> {
  message: string
  data?: Data
}

// remove undefined
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
