const express=require('express')
const router=express.Router()

const {getPosts,createPosts}=require('../controllers/posts')

router.route('/').get(getPosts)
router.route('/create').post(createPosts)

export default router;