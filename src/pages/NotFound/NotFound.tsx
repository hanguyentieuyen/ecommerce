import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='flex flex-col-reverse items-center justify-center gap-16 px-4 py-24 md:gap-28 md:px-44 md:py-20 lg:flex-row lg:px-24 lg:py-24'>
      <div className='relative w-full pb-12 lg:pb-0 xl:w-1/2 xl:pt-24'>
        <div className='relative'>
          <div className='absolute'>
            <div className=''>
              <h1 className='my-2 text-2xl font-bold text-gray-800'>
                Looks like you&#39;ve found the doorway to the great nothing
              </h1>
              <p className='mb-6 mt-2 text-gray-800'>
                Sorry about that! Please visit our hompage to get where you need to go.
              </p>
              <Link
                to='/'
                className='md my-2 rounded border bg-orange px-8 py-4 text-center text-white hover:bg-orange/90  focus:outline-none focus:ring-2 focus:ring-orange focus:ring-opacity-50 sm:w-full lg:w-auto'
              >
                Go home
              </Link>
            </div>
          </div>
          <div>
            <img alt='img' src='https://i.ibb.co/G9DC8S0/404-2.png' />
          </div>
        </div>
      </div>
      <div>
        <img alt='img' src='https://i.ibb.co/ck1SGFJ/Group.png' />
      </div>
    </div>
  )
}
