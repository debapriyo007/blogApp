import React from 'react'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
import {Route, Routes} from 'react-router-dom' 
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import Profile from './pages/Profile'
import { UserContextProvider } from './context/UserContext'
import MyBlogs from './pages/MyBlogs'
// import { UserContextProvider } from './context/UserContext'
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (

    <UserContextProvider>
      
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/posts/post/:id' element={<PostDetails/>}/>
        <Route path='/write' element={<CreatePost/>}/>
        <Route path='/edit/:id' element={<UpdatePost/>}/>
        <Route path='/myblogs/:id' element={<MyBlogs/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>

      </Routes>
      <Toaster/>
      {/* <Footer/> */}

    </UserContextProvider>
  )
}

export default App
