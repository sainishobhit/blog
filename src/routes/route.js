const express = require('express');

const router = express.Router();

const {authorController, blogController} = require('../controllers')
const{authorAuth} = require('../middlewares')

router.post('/authors', authorController.registerAuthor)
router.post('/login', authorController.loginAuthor)

router.post('/blogs', authorAuth, blogController.createBlog)
router.get('/blogs', authorAuth, blogController.listBlog)
router.put('/blogs/:blogId', authorAuth, blogController.updateBlog)
router.delete('/blogs/:blogId', authorAuth, blogController.deleteBlogById)
router.delete('/blogs', authorAuth, blogController.deleteBlogByParams)



module.exports = router;