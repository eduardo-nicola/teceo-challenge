import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootRender = import.meta.env.DEV ? (<StrictMode> <App /> </StrictMode>) : (<App />)

createRoot(document.getElementById('root')!).render(
  rootRender
)
