const express = require('express')
const router = express.Router()
const UserModel = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// REGISTER
router.post("/register", async(req, res)=>{ 
    try {
         const {username, email, password} = req.body
         const userEmail = await UserModel.findOne({email})
         if(email === userEmail){
                return res.status(400).json("Email already exist!")
         }
         const hashedPassword = await bcrypt.hash(password, 10)
         const newUser = new UserModel({username, email, password:hashedPassword})
         const saveuser = await newUser.save()

         res.status(200).json({
                message:"User has been registered successfully",
                user:saveuser
         })
    } catch (err) {
        res.status(500).json(err)
    }
})

// LOGIN
router.post("/login", async(req, res)=>{
    try {
        // find user base on the email.
        const user = await UserModel.findOne({email:req.body.email})
        if(!user) {
            return res.status(404).json("User not found!")
        }
        //compare password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            return res.status(400).json("Wrong password!")
        }
        //create token
        const token = jwt.sign({_id:user._id, username:user.username, email:user.email}, process.env.SECRET, {expiresIn:"1d"})
        const {password, ...info} = user._doc
        res.cookie("token", token).status(200).json({
            message:"Login successful",
            info
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// LOGOUT
router.get("/logout", (req, res)=>{
    try {
        res.clearCookie("token", {sameSite:"none", secure:true}).status(200).json({
            message:"Logout successful!"
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// REFETCH USER
router.get('/refetch', (req, res) => {
    const token = req.cookies.token;

    // Check if token is present
    if (!token) {
        return res.status(400).json({ name: "JsonWebTokenError", message: "jwt must be provided" });
    }

    jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
        if (err) {
            return res.status(404).json(err);
        }
        if (data) {
            res.status(200).json(data);
        }
    });
})

module.exports = router