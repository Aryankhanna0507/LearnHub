import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store'
import { Toaster } from './components/ui/sonner'
import { useLoadUserQuery } from './feature/api/authApi'
import LoadingSpinner from './components/loadingSpinner'
const Custom=({children})=>{
  const {isLoading}=useLoadUserQuery();
  return (
    <>
    {
      isLoading?<h1><LoadingSpinner/></h1>:<>{children}</>
    }
    </>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
    <App />
      </Custom>
    <Toaster
     position="top-center"
     expand={true}
     closeButton 
  />
    </Provider>
  </StrictMode>,
)
