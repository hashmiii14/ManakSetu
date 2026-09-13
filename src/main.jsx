import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { RouterProvider } from './context/RouterContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)

