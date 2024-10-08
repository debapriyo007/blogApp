import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfilePost from '../components/ProfilePost';
import axios from 'axios';
import { URL } from '../url';
import { UserContext } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import toast  from 'react-hot-toast';

const Profile = () => {
  const params = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  // const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handelUpdateUser = async () => {
    try {
      const res = await axios.put(URL + "/api/users/" + user._id, { username, email, password }, { withCredentials: true });
      toast.success('Profile Update Successfully!')
    } catch (err) {
      console.log(err);
      toast.error('There are some problem while updating!!')
    }
  };

  const handelUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPost = async () => {
    if (!user || !user._id) return;
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [params]);

  useEffect(() => {
    fetchUserPost();
  }, [params]);

  return (
    <div>
      <Navbar />
      <div className='flex flex-col-reverse md:flex-row px-4 md:px-[200px] mt-8 md:space-x-5'>
        {/* Posts Section */}
        <div className='w-full md:w-[70%]'>
          <h1 className='text-2xl font-bold mt-6 text-center'>Your Post's</h1>
          {posts?.map((p) => (
            <ProfilePost p={p} key={p._id} />
          ))}
        </div>

        {/* Profile Section */}
        <div className='w-full md:w-[30%] md:sticky md:top-16 mb-8 md:mb-0'>
          <div className='p-6 bg-white shadow-md rounded-lg space-y-6'>
            
            <h1 className='text-2xl font-bold mb-4'>Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder='Your username'
              className='w-full outline-none px-4 py-2 border border-gray-300 rounded-md  focus:border-black transition duration-200 ease-in-out'
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder='Your email'
              className='w-full outline-none px-4 py-2 border border-gray-300 rounded-md focus:border-black transition duration-200 ease-in-out'
            />
            <div className='flex justify-between space-x-4'>
              <button
                onClick={handelUpdateUser}
                className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-100 hover:text-black transition duration-200'
              >
                Update
              </button>
              <button
                onClick={handelUserDelete}
                className='w-full bg-red-700 text-white py-2 rounded-md transition duration-200'
              >
                Delete
              </button>
            </div>
            {/* {updated && (
              <h3 className='text-green-500 text-sm text-center mt-4'>User updated successfully!</h3>
            )} */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
