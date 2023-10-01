import { useContext, useEffect } from 'react'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorangeEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
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
      {routerElements}
      <ToastContainer />
    </>
  )
}

export default App
