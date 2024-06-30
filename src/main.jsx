import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Theme } from '@radix-ui/themes'
import { CampaignProvider } from './components/CampaignContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CampaignProvider>
    <Theme>
    <App />
    </Theme>
    </CampaignProvider>
   
  
   
   
  </React.StrictMode>,
)
