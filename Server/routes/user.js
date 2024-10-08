const express  = require('express')
const router = express.Router()
const UserModel = require("../models/User")
const PostModel = require("../models/Post")
const CommentModel = require("../models/Comment")
const bcrypt = require('bcrypt')
const verifyToken = require('../verifyToken')


//UPDATE
router.put("/:id", verifyToken, async(req, res)=>{
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json({
            message:"User has been updated successfully",
            user:updatedUser
        })
    } catch (err) {
        res.status(500).json(err)
        
    }
})

//DELETE
router.delete ("/:id", verifyToken, async(req, res)=>{
    try {
          await UserModel.findByIdAndDelete(req.params.id)
          await PostModel.deleteMany({userId:req.params.id})
          await CommentModel.deleteMany({userId:req.params.id})
            res.status(200).json("User has been deleted successfully")
    }catch (err) {
        res.status(500).json(err)
        
    }
})

//GET USER

router.get ("/:id", async(req, res)=>{
    try{
         const user = await UserModel.findById(req.params.id)
         //when we get the user info we are geetting the passowrd but we dont want that.
         const {password, ...info} = user._doc

         res.status(200).json(info)
    }catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router