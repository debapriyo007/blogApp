import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../url'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"

const Menu = () => {
  const {user} = useContext(UserContext)
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handelLogOut = async()=>{
      try {
        const res = await axios.get(URL+"/api/auth/logout", {withCredentials:true})
        setUser(null)
        toast.success("Logout Successfully!")
        navigate("/")
      }catch(err) {
        
      }
  }
  return (
    <div className='bg-black w-[200px] flex flex-col items-start absolute top-12 right-6 rounded-md p-4 space-y-4 z-10'>
        {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer font-usernameDate'><Link to="/login" >Login</Link></h3>}
        {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer font-usernameDate'><Link to="/register" >Register</Link></h3>}
        {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer font-usernameDate'><Link to={"/profile/"+user._id} >Profile</Link></h3>}
        {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer font-usernameDate'><Link to= "/write" >Write</Link></h3>}
        {user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer font-usernameDate'><Link to= {"/myblogs/"+user._id} >My Blogs</Link></h3>}
        {user && <h3 onClick={handelLogOut} className='text-white text-sm hover:text-gray-500 cursor-pointer font-usernameDate'>Logout</h3>}
    </div>
  )
}

export default Menu
