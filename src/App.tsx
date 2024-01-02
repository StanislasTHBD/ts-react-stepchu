import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
     {/* <div className='bg-red-500 sm:bg-blue-500 md:bg-yellow-400 lg:bg-indigo-500 xl:bg-green-500 2xl:bg-pink-500 w-full h-20'></div> */}
    <Outlet />
    </>
  )
}

export default App
