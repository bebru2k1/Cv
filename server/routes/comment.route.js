const express = require('express')
const route = express.Router()

const { createCommentController, getComment, deleteComment } = require('../controller/comment.controller')
const passport = require('passport')
require('../middlewares/passport')
const { isAdmin } = require('../middlewares/isAdmin')
const { isAuthorOfCmt } = require('../middlewares/isAuthorOfCmt')



//@route GET /v1/ap1/comments/
//@des create new user
//@access Priv
route.post('/', passport.authenticate('jwt', { session: false }), createCommentController)

//@route GET /v1/ap1/comments/
//@des get comment by postId
//@access Priv

route.get('/:id', passport.authenticate('jwt', { session: false }), getComment)


//@route GET /v1/ap1/comments/
//@des delete comment by commentId
//@access Priv

route.delete('/:id', passport.authenticate('jwt', { session: false }), isAuthorOfCmt, deleteComment)




module.exports = route