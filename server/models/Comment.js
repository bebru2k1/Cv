const mongoose = require('mongoose')
const { Schema } = mongoose

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true })

module.exports = mongoose.model('comments', CommentSchema)