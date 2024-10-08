const express  = require('express')
const router = express.Router()
const CommentModel = require("../models/Comment")
const verifyToken = require('../verifyToken')


//CREATE
router.post("/create", verifyToken, async(req, res)=>{
    try {
        const newComment = new CommentModel(req.body)
        const saveComment = await newComment.save()
        res.status(200).json(saveComment) 
    }catch(err) {
       res.status(500).json(err) 
       console.log(err)
    }
})


//UPDATE
router.put("/:id", verifyToken, async(req, res)=>{
    try {
        
        const updateComment = await CommentModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateComment)
    } catch (err) {
        res.status(500).json(err)
        
    }
})

//DELETE
router.delete ("/:id", verifyToken, async(req, res)=>{
    try {
          await CommentModel.findByIdAndDelete(req.params.id)
          res.status(200).json("Comment has been deleted successfully")
    }catch (err) {
        res.status(500).json(err)
        
    }
})

//GET POST COMMENT FOR PARTICULAR USER POST ONLY..
router.get('/post/:postId', async(req, res)=>{
    const comments = await CommentModel.find({postId:req.params.postId})
    res.status(200).json(comments)
})

module.exports = router