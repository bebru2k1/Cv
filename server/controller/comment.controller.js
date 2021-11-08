const db = require('../models')
const Post = db.post
const User = db.user
const Comment = db.comment

module.exports.createCommentController = async (req, res) => {
    const { content, postId } = req.body

    const hasPost = await Post.findById(postId)

    if (hasPost) {
        const newComment = new Comment({
            content,
            user: req.user._id,
            post: postId
        })
        const data = await newComment.save()

        const dataCopy = { ...data._doc }

        return res.status(200).json({
            message: 'Create comment success',
            data: {
                ...dataCopy, user: {
                    _id: req.user._id,
                    username: req.user.username,
                    displayName: req.user.displayName,
                    photos: req.user.photos,
                }
            },
            success: true
        })
    }

}

module.exports.getComment = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400)
    const commentByPost = await Comment.find({ post: id }).populate('user', ['username', 'displayName', 'photos'])

    if (!commentByPost) return res.status(400)
    return res.status(200).json({ success: true, message: 'getComment Success', data: commentByPost })
}

module.exports.deleteComment = async (req, res) => {

    const { id } = req.params

    const data = await Comment.findByIdAndDelete(id)
    const dataCopy = { ...data._doc }

    return res.status(200).json({
        message: 'Create comment success',
        data: {
            ...dataCopy, user: {
                _id: req.user._id,
                username: req.user.username,
                displayName: req.user.displayName,
                photos: req.user.photos,
            }
        },
        success: true
    })
}