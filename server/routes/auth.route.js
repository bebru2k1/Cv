const express = require('express')
const route = express.Router()
const { registerController, sigInController, sigInControllerFacebook, changeInfo } = require('../controller/auth.controller')
const passport = require('passport')
require('../middlewares/passport')
const { isAdmin } = require('../middlewares/isAdmin')



//@route GET /v1/ap1/auth/
//@des create new user
//@access Public
route.get('/', async (req, res) => {
    res.send('hello word')
})

//@route GET /v1/ap1/auth/
//@des create new user
//@access Public
route.put('/', passport.authenticate('jwt', { session: false }), changeInfo)





//@route POST /v1/api/auth/sigin
//@des create new user
//Public
route.post('/sigin',
    (req, res, next) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('in the sigin controller')
            if (err) return next(err)
            if (user.error) {
                return res.json({ success: false, message: user.message })
            }

            if (!user) {
                return res.json({ success: false, message: 'Thiếu thông tin đăng nhập' })
            }
            req.user = user
            next()
        })(req, res, next)
    }
    , sigInController)

route.get('/sigintoken', passport.authenticate('jwt', { session: false }), sigInController)
//@route POST /v1/ap1/auth/register
//@des create new user
//@access Public
route.post('/register', registerController)

//@route POST /v1/ap1/auth/register
//@des create new user
//@access Public
route.get('/registeradmin', passport.authenticate('jwt', { session: false }), isAdmin, registerController)

//POST /v1/ap1/auth/facebook
//@des sigin with facebook
//Public
route.post('/facebook', passport.authenticate('facebook-token', { session: false }), sigInControllerFacebook)



module.exports = route