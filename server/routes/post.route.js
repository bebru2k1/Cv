const express = require('express')
const route = express.Router()
// middleware
const passport = require('passport')
require('../middlewares/passport')
const { isAdmin } = require('../middlewares/isAdmin')
//controller
const {
    getPostsController, getPostsBySlugController, createPostsController, deletePostsController,
    putPostsController
} = require('../controller/post.controller')

//@route GET /v1/api/post
//@des get post
//@access private
//@role all
route.get('/', getPostsController)


//@route GET /v1/api/post
//@des get post
//@access private
//@role all
route.get('/:slug', getPostsBySlugController)




//@route POST /v1/api/post
//@des create post
//@access private
//@role admin
route.post('/', passport.authenticate('jwt', { session: false }), isAdmin, createPostsController)

//@route DELETE /v1/api/post
//@des delete post
//@access private
//@role admin

route.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, deletePostsController)

//@route PUT /v1/api/post
//@des put post
//@access private
//@role admin

route.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, putPostsController)


module.exports = route