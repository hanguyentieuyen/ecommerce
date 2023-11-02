import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponseApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rule'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Login | Shoppe clone</title>
        <meta name='description' content='Login in Shoppee page' />
      </Helmet>
      <div className='container'>
        <div className='grid-cols grid py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                className='mt-8'
                name='email'
                type='email'
                errorMessage={errors.email?.message}
                placeholder='Email'
                register={register}
              />
              <Input
                className='mt-2'
                classNameEye='absolute right-[5px] top-[16px] h-4 w-4 cursor-pointer'
                name='password'
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Password'
                register={register}
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-2 text-red-400' to='/register'>
                  Đăng kí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
