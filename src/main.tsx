import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar.tsx'
import SignUp from './components/auth/SignUp.tsx'
import Login from './components/auth/Login.tsx'
import Protected from './components/Protected.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import NewsletterPage from './components/newsletter/NewsletterPage.tsx'
import Logout from './components/auth/Logout.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Protected />} >
              <Route path="/" index element="#" />
              <Route path="/utilisateurs" element="#" />
              <Route path="/challenges" element="#" />
              <Route path="/evenements" element="#" />
              <Route path="/quizzs" element="#" />
              <Route path="/newsletters" element={<ErrorBoundary><NewsletterPage /></ErrorBoundary>} />
              <Route path="/about" element="#" />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Route>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  </React.StrictMode>
)
