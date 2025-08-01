import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@shopify/shop-minis-react/mocks'
import { MinisContainer } from '@shopify/shop-minis-react'

import { App } from './App.jsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MinisContainer>
      <App />
    </MinisContainer>
  </StrictMode>
)
