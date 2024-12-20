import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className='mx-auto max-w-screen-lg'>
      <Header/>
     <Outlet/>
     <Footer/>
    </div>
  )
}

export default App
