const passport = require('passport')
//passport-jwt
const JwtStrategy = require('passport-jwt').Strategy
ExtractJwt = require('passport-jwt').ExtractJwt;
//passport-local
const LocalStrategy = require('passport-local').Strategy
//passport-facebook
const FacebookTokenStrategy = require('passport-facebook-token');


const db = require('../models')
const argon2 = require('argon2')
const User = db.user

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_JWT
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.userId)
        if (!user) return done(null, false)
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
}, async (req, username, password, done) => {

    try {
        const user = await User.findOne({ username })
        if (!user) return done(null, { error: true, message: 'Tài khoản chưa được đăng kí' })
        const decodePassword = await argon2.verify(user.password, password)
        if (!decodePassword) return done(null, { error: true, message: 'Mật khẩu không đúng' })
        return done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({
            authFacebookID: profile.id,
            authType: 'facebook'
        })
        console.log(typeof profile.photos[0].value)
        if (user) return done(null, user)
        const newUser = new User({
            username: profile.displayName,
            authFacebookID: profile.id,
            authType: 'facebook',
            displayName: profile.displayName,
            photos: profile.photos[0].value
        })
        await newUser.save()
        done(null, newUser)
    } catch (error) {
        console.log(error)
        done(error, false)
    }
}
));