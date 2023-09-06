// import { ThreadDetail } from './features/thread'
import { Pages } from './pages'
import { Routes, Route, useNavigate, Outlet, Navigate} from "react-router-dom";
import { Detail } from './pages/home/Detail';
import { Login, Register } from './features/auth';
import { useEffect, useState } from 'react';
import { API, setAuthToken } from './libs/api';
import { useSelector } from 'react-redux';
import { RootState } from './stores/types/rootState';
import { useDispatch } from 'react-redux';
import { AUTH_CHECK, AUTH_ERROR } from './stores/rootReducer';
import { Follow, Profile, ProfileEdit, Search, Thread } from './pages/home';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function authCheck() {
    try {
      setAuthToken(localStorage.token)
      const response = await API.get('/auth/check')
      console.log("auth check berhasil", response)
      dispatch(AUTH_CHECK(response.data))
      setIsLoading(false)
    } catch (err) {
      dispatch(AUTH_ERROR())
      console.log("auth error:", err)
      setIsLoading(false)
      navigate('/login')
    }
  }

  useEffect(()=> {
    if(localStorage.token) {
      setIsLoading(false)
      authCheck()
    } else {
      setIsLoading(false)
      // navigate('/login')
    }
  }, [])

  // function AuthRoute({ isLogin }: {isLogin:boolean}) {
  //   if (isLogin) {
  //     return <Outlet/>
  //   } else {
  //     return <Navigate to={"/login"}/>
  //   }
  // }

  // function IsLogin() {
  //   if (auth.data.username) {
  //     return <Outlet/>  
  //   } else {
  //     return <Outlet/>  
  //   } 
  // }

  function IsLogin() {
    if (!localStorage.token) {
      return <Navigate to={"/login"}/>
    } else {
      return <Outlet/>  
    }
  }

  function IsNotLogin() {
    if (localStorage.token) {
      return <Navigate to={"/"}/> 
    } else {
      return <Outlet/>
    }
  }

  return (
    <>
    {isLoading ? null : (
    
    <>
      <Routes>
        <Route path='/' element={<IsLogin/>}>
          <Route path='/' element={<Pages/>}>
            <Route index element={<Thread/>}/>
            <Route path=':id' element={<Detail/>}/>
            <Route path='follows' element={<Follow/>}/>
            <Route path='search' element={<Search/>}/>
            <Route path='profile/:id' element={<Profile/>}/>
            <Route path='profile/edit/:id' element={<ProfileEdit/>}/>
          </Route>
        </Route>
          <Route path='/' element={< IsNotLogin/>}>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
          </Route>
      </Routes>
    </>
    )} 
    </>
  )
}

export default App
