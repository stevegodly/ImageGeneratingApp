const Post=require('../models/post')
const {v2:cloudinary} = require('cloudinary')
const {Configuration,OpenAIApi}=require('openai')
require('dotenv').config()

const config=new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openAi=new OpenAIApi(config)

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const getPosts=async(req,res)=>{
    try{
        const posts=await Post.find({})
        res.status(200).json({posts})
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createPosts=async(req,res)=>{
    try{
        const { title,image } = req.body;
        const imgUrl = await cloudinary.uploader.upload(image);
        
        const newPost = await Post.create({
            title,
            image: imgUrl.url
        })
        res.status(200).json({ success: true, data: newPost });
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createImage=async(req,res)=>{
    try{
        const {prompt}=req.body
        if(!prompt) throw new Error("Field cannot be empty")
        const response = await openAi.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })
        const image = response.data.data[0].b64_json;
        res.status(200).json({ image });
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports={getPosts,createPosts,createImage}