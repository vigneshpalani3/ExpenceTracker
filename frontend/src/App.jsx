import Income from "./pages/Income"
import NavTab from "./components/NavTab"
import { useEffect, useState} from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import useGlobalContext from "./context/GlobalContext"
import { Route, Routes } from 'react-router-dom'
import Expense from "./pages/Expense"
import DashBoard from "./pages/DashBoard"
import Error from './pages/Error'
import { SnackbarProvider } from "notistack"
import { GiHamburgerMenu } from "react-icons/gi"

function App() {

  const {getRefreshToken,isErr} = useGlobalContext()
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)
  const [isNavOpen,setIsNavOpen] = useState(false)
  // navigate to login page if user doesn't exist
  useEffect(()=>{
    getRefreshToken()
    window.addEventListener('resize',()=>{
      const width = window.innerWidth
      setWindowWidth(width)
    })
  },[])

  return (
    <SnackbarProvider maxSnack='3' autoHideDuration={2000} preventDuplicate>
      <div className="app" onClick={()=> {if(isNavOpen) setIsNavOpen(false)}}>
        {
          !isErr?(
            <Routes>
              <Route path="/" element={
                <div className="home">
                  <div className="hamburger">
                    <h1>Xpense Tracker</h1>
                    <button onClick={(e)=>{
                      setIsNavOpen(true)
                      e.stopPropagation()
                    }}>
                      <GiHamburgerMenu/>
                    </button>
                  </div>
                  <NavTab isNavOpen={isNavOpen} windowWidth={windowWidth}/>
                  <Income />
                  <Expense/>
                  <DashBoard/>
                </div>
              } />
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
            </Routes>
          ):(
            <Error/>
          )
        }
      </div>
    </SnackbarProvider>
  )
}

export default App