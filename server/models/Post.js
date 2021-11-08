const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
    title: { type: String, required: true },
    des: { type: String },
    image: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    // comment: { type: Schema.Types.ObjectId, ref: 'comments' },
    slug: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('posts', PostSchema)