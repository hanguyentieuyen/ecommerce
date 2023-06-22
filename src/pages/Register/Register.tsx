import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rule'
import Input from 'src/components/Input'

type FormData = Schema
export default function Register() {
  const {
    register,
    handleSubmit,
    watch, // re-render
    getValues, // no trigger re-render
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const onSubmit = handleSubmit(
    (data) => {
      //console.log(data)
    },
    (data) => {
      const password = getValues('password')
    }
  )
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid-cols grid py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='rounded bg-white p-10 shadow-sm' noValidate>
              <div className='text-2xl'>Đăng kí</div>
              <Input
                className='mt-8'
                name='email'
                type='email'
                errorMessage={errors.email?.message}
                placehoder='Email'
                register={register}
              />
              <Input
                className='mt-2'
                name='password'
                type='password'
                errorMessage={errors.password?.message}
                placehoder='Password'
                register={register}
                autoComplete='on'
              />
              <Input
                className='mt-2'
                name='confirm_password'
                type='password'
                errorMessage={errors.confirm_password?.message}
                placehoder='Confirm Password'
                register={register}
                autoComplete='on'
              />
              <div className='mt-2'>
                <button className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'>
                  Đăng kí
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-2 text-red-400' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
