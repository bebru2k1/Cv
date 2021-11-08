const db = require('../models')
const User = db.user
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
module.exports.registerController = async (req, res) => {
    try {
        const { username, password, displayName } = req.body
        if (!username || !password || !displayName) return res.status(403).json({ success: false, message: 'username or password hasnot' })
        const user = await User.findOne({ username })
        console.log(user)
        if (user) return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại' })

        const hasPassword = await argon2.hash(password)

        newUser = new User({
            username,
            password: hasPassword,
            displayName
        })
        await newUser.save()
        const accessToken = jwt.sign({ id: newUser._id }, process.env.SECRET_JWT)
        res.status(200).json({
            success: true,
            message: 'Register success',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

module.exports.sigInController = async (req, res) => {
    try {
        const user = req.user
        const userObject = user.toObject()
        delete userObject.password
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.SECRET_JWT
        )

        return res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken,
            user: userObject
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports.sigInControllerFacebook = async (req, res) => {
    try {
        const user = req.user || req.newUser
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.SECRET_JWT
        )
        res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


module.exports.changeInfo = async (req, res) => {

    const userNew = await User.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true }).select('-password')

    return res.status(200).json({
        success: true,
        message: 'change info success',
        user: userNew
    })

}