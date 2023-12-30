import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NewsletterPage from './components/newsletter/NewsletterPage'
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <>
     {/* <div className='bg-red-500 sm:bg-blue-500 md:bg-yellow-400 lg:bg-indigo-500 xl:bg-green-500 2xl:bg-pink-500 w-full h-20'></div> */}
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element="#" />
            <Route path="/dashboard" element="#" />
            <Route path="/utilisateurs" element="#" />
            <Route path="/challenges" element="#" />
            <Route path="/evenements" element="#" />
            <Route path="/quizzs" element="#" />
            <Route path="/newsletters" element={<ErrorBoundary><NewsletterPage /></ErrorBoundary>} />
            <Route path="/about" element="#" />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  )
}

export default App
