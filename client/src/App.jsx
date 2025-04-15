import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import HomeLayout from './components/home-view/layout'
import AuthLayout from './components/auth-view/layout'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { useEffect } from 'react'
import CheckAuth from './components/common/checkAuth';
import GetStarted from './pages/auth/getStarted'
import Profile from './pages/profile/profile'
import ProfileLayout from './components/profile-view/layout'
import BasicInfo from './components/profile-view/basicInfo'
// import Accelerate from './pages/accelerate/accelerate'
import AccelerateLayout from './components/accelerate-view/layout'
import Accelerate from './pages/accelerate/accelerate'


const App = () => {

  const { user, isAuthenticated, isLoading }  = useSelector((state)=>state.auth);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  if (isLoading) console.log("loading");

  console.log("user",user);

  return (
    <div className='flex flex-col overflow-hidden bg-primary'>
      <Routes>
        <Route
            path="/"
            element={
              <CheckAuth
                isAuthenticated={isAuthenticated}
                user={user}
              ></CheckAuth>
            }
          />
          <Route path='/auth' 
                element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <AuthLayout/>
                          </CheckAuth>}>
              <Route path="login" element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='getStarted' element={<GetStarted/>}/>
          </Route>

          <Route path="/main" element={
                            <HomeLayout/>
                          }>
              <Route path='home' element={<Home/>}/>
              <Route path='accelerate' element={<AccelerateLayout/>}>
                  <Route path='subscriber' element={<Accelerate/>}/>
              </Route>
          </Route>

          <Route path='/profile' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ProfileLayout/>
          </CheckAuth>}>
              <Route path='profile' element={<Profile/>}>
                <Route path='basic' element={<BasicInfo/>}/>
              </Route>
          </Route>
      </Routes>
    </div>
  )
}

export default App
