import axios from "axios"

const instance = axios.create({
    baseURL: process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/v1/api'
        : 'https://infinite-reaches-00896.herokuapp.com/v1/api'
})

export default instance
