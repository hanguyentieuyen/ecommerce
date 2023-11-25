import { useContext, useEffect } from 'react'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorangeEventTarget } from './utils/auth'
import { AppContext, AppProvider } from './contexts/app.context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const routerElements = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorangeEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorangeEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <>
      <HelmetProvider>
        <AppProvider>
          <ErrorBoundary>
            {routerElements}
            <ToastContainer />
          </ErrorBoundary>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </HelmetProvider>
    </>
  )
}

export default App
