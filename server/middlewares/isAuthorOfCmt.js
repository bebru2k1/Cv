const Comment = require("../models/Comment")

module.exports.isAuthorOfCmt = async (req, res, next) => {
    const { _id } = req.user
    const { id } = req.params
    const commentById = await Comment.findById(id)
    if (!commentById) return res.status(400).json({
        message: 'post not exits'
    })
    if (commentById.user.equals(_id)) {
        next()
    } else {
        return res.status(400).json({
            message: 'post hasn"t  author'
        })
    }

}