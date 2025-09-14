import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BirthdayForm from './BirthdayForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BirthdayForm />
  </StrictMode>,
)
