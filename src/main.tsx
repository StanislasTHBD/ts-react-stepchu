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
import UtilisateurPage from './components/utilisateur/UtilisateurPage.tsx'
import ChallengePage from './components/challenge/ChallengePage.tsx'
import QuestionSecurityPage from './components/questionSecurity/QuestionSecurityPage.tsx'
import AboutPage from './components/about/AboutPage.tsx'
import QuizzPage from './components/quizz/QuizzPage.tsx'

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
              <Route path="/utilisateurs" element={<ErrorBoundary><UtilisateurPage /></ErrorBoundary>} />
              <Route path="/challenges" element={<ErrorBoundary><ChallengePage /></ErrorBoundary>} />
              <Route path="/evenements" element="#" />
              <Route path="/quizzs" element={<ErrorBoundary><QuizzPage /></ErrorBoundary>} />
              <Route path="/newsletters" element={<ErrorBoundary><NewsletterPage /></ErrorBoundary>} />
              <Route path="/questionSecuritys" element={<ErrorBoundary><QuestionSecurityPage /></ErrorBoundary>} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Route>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  </React.StrictMode>
)
