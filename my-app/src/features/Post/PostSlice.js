import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../configs/axiosConfig";
export const getHomePost = createAsyncThunk('post/gethomepost', async (url, { rejectWithValue, getState }) => {
    const postsOld = getState().post.postsHome
    if (postsOld.length >= 1) return
    try {

        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data
        } else {
            rejectWithValue(response.data)
        }


    } catch (error) {
        rejectWithValue(error.response.data)
    }
})


export const getPosts = createAsyncThunk('post/getPosts', async ({ url, page }, { rejectWithValue, getState }) => {

    //handle re-fetch data
    const postsOld = getState().post.posts
    let pageInPostExits = false

    if (postsOld.length >= 1) {
        pageInPostExits = postsOld.some(post => post.page === page)
    }


    if (!pageInPostExits) {

        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                return response.data
            } else {
                rejectWithValue(response.data)
            }
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    }
})

export const getPostBySlug = createAsyncThunk('post/getPostbySlug', async (url, { rejectWithValue }) => {
    try {
        const response = await axios.get(url)
        console.log('featch data xong')
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const createPost = createAsyncThunk('post/createPosts', async (formPosts, { rejectWithValue, dispatch }) => {
    try {
        const response = await axios.post('/posts', formPosts)
        if (response.status === 200) {
            dispatch(setOpenModalCreate())
            dispatch(setPostEmty())
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const editPost = createAsyncThunk('post/editPost', async ({ dataForm, id }, { rejectWithValue, dispatch }) => {

    try {
        const response = await axios.put(`/posts/${id}`, dataForm)
        if (response.status === 200) {
            dispatch(setCloseModalEdit())
            dispatch(setPostEmty())
            console.log(response.data)
            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

export const deletePost = createAsyncThunk('post/deletePost', async (id, { rejectWithValue, dispatch }) => {
    try {
        console.log(id)
        const response = await axios.delete(`/posts/${id}`)
        if (response.status === 200) {
            dispatch(setCloseModalTrash())
            dispatch(setPostEmty())

            return response.data
        }
    } catch (error) {
        rejectWithValue(error)
    }
})

const PostSlice = createSlice({
    name: 'post',
    initialState: {
        post: [],
        posts: [],
        postsHome: [],
        postsLoading: true,
        countPosts: null,
        isOpenModalEdit: false,
        isOpenModalTrash: false,
        isOpenModaCreate: false,
    },
    reducers: {
        setPostDetail: (state, action) => {
            Object.assign(state, {
                post: action.payload
            })
        },
        clearPostDetail: state => {
            state.post = []
        },

        setOpenModalEdit: (state) => {
            state.isOpenModalEdit = true
        },
        setCloseModalEdit: (state) => {
            state.isOpenModalEdit = false
        },
        setOpenModalTrash: (state) => {
            state.isOpenModalTrash = true
        },
        setCloseModalTrash: (state) => {
            state.isOpenModalTrash = false
        },
        setPostEmty: (state) => {
            state.posts = []
        },
        setOpenModalCreate: (state) => {
            state.isOpenModalCreate = true
        },
        setCloseModalCreate: (state) => {
            state.isOpenModalCreate = false
        },
    },
    extraReducers: {
        [getHomePost.pending]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: true
            })
        },
        [getHomePost.fulfilled]: (state, { payload }) => {
            const postsHomeObj = payload?.posts ? { postsHome: payload?.posts.data } : null
            Object.assign(state, {
                postsLoading: false,
            }, postsHomeObj)
        },
        [getHomePost.rejected]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: false,
                postsHome: []
            })
        },

        //getPost
        [getPosts.pending]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: true
            })
        },
        [getPosts.fulfilled]: (state, { payload }) => {
            const postsPayload = payload?.posts ? { posts: state?.posts.concat(payload.posts) } : null

            const countPostsPayload = payload?.countPosts ? { countPosts: payload?.countPosts } : null

            Object.assign(state, {
                postsLoading: false,
            }, postsPayload, countPostsPayload)
        },
        [getPosts.rejected]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: false,
                posts: []
            })
        },

        //getpostbyslug

        [getPostBySlug.pending]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: true,
            })
        },
        [getPostBySlug.fulfilled]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: false,
                post: payload?.posts ? [payload.posts] : []
            })
        },
        [getPostBySlug.rejected]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: false,
                post: []
            })
        },
        //CreatePost

        [createPost.pending]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: true
            })
        },
        [createPost.fulfilled]: (state, { payload }) => {
            state.postsLoading = false


        },
        [createPost.rejected]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: false,
            })
        },

        //EditPost
        [editPost.pending]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: true,
            })
        },
        [editPost.fulfilled]: (state, { payload }) => {

            state.postsLoading = false

        },
        [editPost.rejected]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: false,
                post: []
            })
        },
        //

        //EditPost
        [deletePost.pending]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: true,
            })
        },
        [deletePost.fulfilled]: (state, { payload }) => {

            state.postsLoading = false

        },
        [deletePost.rejected]: (state, { payload }) => {
            Object.assign(state, {
                postsLoading: false,
                post: []
            })
        },

    }
})
//Reducer
const postReducer = PostSlice.reducer

//Selector
export const postSelector = state => state.post

//actions
export const { clearPostDetail, setPostDetail, setOpenModalEdit, setCloseModalEdit, setOpenModalTrash, setCloseModalTrash, setPostEmty, setOpenModalCreate, setCloseModalCreate } = PostSlice.actions

export default postReducer