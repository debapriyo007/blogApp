const express = require('express')
const dbConnection = require('./config/db')
const multer = require("multer")
const path = require("path")

const app = express()
const cors = require('cors')

require("dotenv").config()


//connect to database
dbConnection()


//middleware.
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comment')
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: "https://blogapp-frontend-xbz1.onrender.com",credentials: true}))
app.use("/images", express.static(path.join(__dirname, "/images")))


//routes
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)




//---------------- Using Multer Define the image Uploade functionality ---------------

const storage = multer.diskStorage({
    destination:(req, file, fn)=>{
        fn(null, "images")
    }, 
    filename:(req, file, fn)=>{
        fn(null, req.body.img)
        // fn(null, "images.jpeg")
    }
})

const uploade = multer({storage:storage})
//define route.
app.post("/api/upload", uploade.single("file"), (req, res)=>{
    res.status(200).json("Image has been uploade successfully!")
})

//-------------------------------------------------------------------------------------


app.listen(3000, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})