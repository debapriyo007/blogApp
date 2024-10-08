import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";

const CreatePost = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [fileName, setFileName] = useState(""); // New state to hold file name

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set the file name
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    // Handle the image file.
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      // Image Upload.
      try {
        const imageUpload = await axios.post(URL + "/api/upload", data);
        console.log(imageUpload.data);
      } catch (err) {
        console.log(err);
      }
    }

    // Post upload.
    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      toast.success("Post Created Successfully!");
      navigate("/posts/post/" + res.data._id);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addCategory = () => {
    let updateCat = [...cats];
    updateCat.push(cat);
    setCat("");
    setCats(updateCat);
  };

  const deleteCategory = () => {
    let updateCat = [...cats];
    updateCat.pop();
    setCats(updateCat);
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-16 lg:px-[200px] mt-8">
        <h1 className="font-bold text-2xl md:text-3xl mb-6 text-center">
          Create Post
        </h1>
        <form
          action=""
          className="w-full flex flex-col space-y-6 md:space-y-8 mt-4"
        >
          {/* <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className='border border-gray-300 px-4 py-2 outline-none rounded-md focus:border-black   transition duration-200 ease-in-out'
        placeholder='Enter post title'
          /> */}

          {/* +++++++++++++++++++++++++++++ UPGRADE UI TITLE +++++++++++++++++++++++++++++ */}
          <div className="sm:col-span-4">
            <label className="block text-lg font-medium leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2">
              <div className="flex rounded-md focus:border-black sm:max-w-md">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter the title"
                  autoComplete="title"
                  className="block flex-1 bg-transparent py-2 border border-gray-300 px-4 outline-none rounded-md focus:border-black transition duration-200 ease-in-out placeholder:text-sm"
                />
              </div>
            </div>
          </div>
          {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

          {/* <input
        type="file"
        className='border border-gray-300 px-4 py-2 outline-none rounded-md focus:border-black   transition duration-200 ease-in-out'
        onChange={(e) => setFile(e.target.files[0])}
      /> */}

          {/* +++++++++++++++++++++++++++++ UPGRADE UI UPLOAD PHOTO +++++++++++++++++++++++++++++ */}
          <div className="col-span-full">
            <label className="block text-lg font-medium leading-6 text-gray-900">
              Upload Photo
            </label>
            <div className="md:w-[50%] lg:w-[32%] mt-2 flex justify-center rounded-lg border        border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center w-full">
                <IoCloudUploadOutline
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 text-gray-300"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                  <label className="relative cursor-pointer rounded-md bg-white font-semibold text-black">
                    {fileName ? (
                      <span>{fileName}</span> // Show the file name when uploaded
                    ) : (
                      <span className="block text-center w-full">
                        Upload a File
                      </span> // Center the text
                    )}
                    <input
                      onChange={handleFileChange}
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

          <div className="flex flex-col">
            <label className="block text-lg font-medium leading-6 text-gray-900 mb-2">
              Add Category
            </label>
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type="text"
                className="px-4 py-2 outline-none border border-gray-300 rounded-md focus:border-black transition duration-200 ease-in-out placeholder:text-sm"
                placeholder="Enter post category"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-8 py-2 cursor-pointer rounded-md hover:bg-gray-800 transition duration-200 ease-in-out"
              >
                Add
              </div>
            </div>

            <div className="flex mt-3 flex-wrap">
              {cats?.map((c, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center space-x-2 mr-4 mb-2 bg-gray-200 py-1 rounded-md px-2"
                >
                  <p className="px-1">{c}</p>
                  <p
                    onClick={deleteCategory}
                    className="text-white bg-red-500 rounded-full cursor-pointer p-1 text-sm hover:bg-red-600 transition duration-200 ease-in-out"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium leading-6 text-gray-900 mb-2">
              Description
            </label>
            <textarea
              rows={10}
              onChange={(e) => setDesc(e.target.value)}
              className="md:w-[70%] w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:border-black transition duration-200 ease-in-out placeholder:text-sm"
              placeholder="Enter post description..."
            ></textarea>
          </div>
          
          <button
            onClick={handleCreate}
            className="bg-black text-white w-full md:w-[30%] lg:w-[20%] xl:w-[15%] md:mx-[30%] px-4 py-3 md:text-xl text-md rounded-md hover:bg-gray-800 transition duration-200 ease-in-out"
          >
            Create Post
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
