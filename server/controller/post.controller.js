const db = require('../models')
const Post = db.post
const User = db.user
const slugify = require('slugify')
// class APIfeature {
//     constructor(query, queryString) {
//         this.query = query,
//             this.queryString = queryString
//     }
//     pagination() {

//     }

// }

module.exports.getPostsController = async (req, res) => {
    const { _page, _limit } = req.query
    const skip = isNaN((parseInt(_page) - 1) * parseInt(_limit)) ? 0 : (parseInt(_page) - 1) * parseInt(_limit)

    try {
        const posts = await Post.find({}).skip(skip).limit(parseInt(_limit)).populate('user', ['displayName', 'photos'])

        if (!posts) return res.status(400).json({
            message: 'Canot Get Post'
        })
        const countPosts = await Post.estimatedDocumentCount()

        res.status(200).json({
            success: true,
            message: "Get Post Success",
            posts: {
                page: isNaN(parseInt(_page)) ? 0 : parseInt(_page),
                limit: parseInt(_limit),
                data: posts
            },
            countPosts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


module.exports.getPostsBySlugController = async (req, res) => {
    try {
        const posts = await Post.findOne({ slug: req.params.slug }).populate('user', ['displayName', 'photos'])
        if (!posts) res.json(400).json({
            message: "Cannot get post"
        })
        return res.status(200).json({
            success: true,
            message: 'Get posts success',
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}


module.exports.createPostsController = async (req, res) => {
    try {
        if (!req.body.title) return res.status(400).json({
            success: true,
            message: 'title is required'
        })
        const newPost = new Post({
            ...req.body,
            slug: slugify(req.body.title, { lower: true }),
            user: req.user._id
        })
        await newPost.save()
        res.status(200).json({
            success: true,
            message: "Create Post Success , Oke :))",
            posts: newPost
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.putPostsController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, des, image } = req.body
        if (title || des || image) {
            const newPosts = await Post.findByIdAndUpdate(id, {
                ...req.body, slug: slugify(title, { lower: true })
            }, { new: true })

            return res.status(200).json({
                success: true,
                message: "Edit Posts Success",
                post: newPosts
            })
        }
        return res.status(400).json({ success: false, message: 'title/des/image is not exist' })

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


module.exports.deletePostsController = async (req, res) => {
    try {
        const { id } = req.params

        const newDeletePost = await Post.findByIdAndDelete({ _id: id })
        if (!newDeletePost) return res.status(400).json({
            success: false,
            message: "Canot Delete Posts"
        })

        res.status(200).json({
            success: true,
            message: 'Delete Post Success',
            post: newDeletePost
        })
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
