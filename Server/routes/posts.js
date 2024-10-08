const express  = require('express')
const router = express.Router()
const UserModel = require("../models/User")
const PostModel = require("../models/Post")
const CommentModel = require("../models/Comment")
const bcrypt = require('bcrypt')
const verifyToken = require('../verifyToken')

//CREATE
router.post("/create", verifyToken, async(req, res)=>{
    try {
        const newPost = new PostModel(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }catch(err) {
       res.status(500).json(err) 
       console.log(err)
    }
})


//UPDATE
router.put("/:id", verifyToken, async(req, res)=>{
    try {
        
        const updatePost = await PostModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatePost)
    } catch (err) {
        res.status(500).json(err)
        
    }
})

//DELETE
router.delete ("/:id", verifyToken, async(req, res)=>{
    try {
          await PostModel.findByIdAndDelete(req.params.id)
          await CommentModel.deleteMany({postId:req.params.id})
          res.status(200).json("Post has been deleted successfully")
    }catch (err) {
        res.status(500).json(err)
        
    }
})


//GET POST DETAILS
router.get ("/:id", async(req, res)=>{
    try{
         const post = await PostModel.findById(req.params.id)
            res.status(200).json(post)
    }catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL POSTS..
router.get ("/", async(req, res)=>{
    try{
        const query = req.query
        const searchFilter = {
            title:{$regex:query.search , $options:"i"}
        }
         const posts = await PostModel.find(query.search ?searchFilter :null)
            res.status(200).json(posts)
    }catch (err) {
        res.status(500).json(err)
    }
})


//GET PARTICULAR USER POST ONLY..
router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await PostModel.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})


// //SERARCH POST BY TITLE
// router.get('/search/:prompt', async(req, res)=>{
//     try {

//     } catch (error) {
//         res.status(500).json(err)
//     }
// })
module.exports = router