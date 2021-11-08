const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String, unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    displayName: {
        type: String,
        required: true,
    }
    ,
    password: { type: String, trim: true },
    authFacebookID: {
        type: String,
        default: null
    },
    authType: {
        type: String,
        default: 'local',
        enum: ['local', 'facebook']
    }
    ,
    photos: {
        type: String,
        default: "https://image.shutterstock.com/z/stock-vector-flat-vector-illustration-in-outline-style-of-a-coder-or-geek-in-programming-participates-in-1053779966.jpg"
    },
    background: {
        type: String,
        default: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
    }
    ,
    content: {
        type: String,
        default: "# Hế nhô\n\n> Chào mừng bạn đến với trang web của mình\n\n> Bạn hãy bắt đầu chỉnh sửa content của mình bằng cách nhấn vào chỉnh sửa thông tin và viết content của mình bằng *[Markdown](https://www.markdownguide.org/)* nhé\n\n\n"
    }
    ,
    role: {
        type: Number,
        default: 0
    },

}, { timestamps: true })

module.exports = mongoose.model('users', UserSchema)