import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from '../../configs/axiosConfig';
import axios from '../../configs/axiosConfig'
import setAuthToken from '../../configs/setAuthToken'

//Reducer Thunk

export const login = createAsyncThunk('auth/authLogin', async (dataForm, { rejectWithValue, dispatch }) => {
    const response = await axios.post('auth/sigin', dataForm)

    if (response.data.success) {
        localStorage.setItem('aurBlog-acc', response.data.accessToken)
        setAuthToken(response.data.accessToken)
        dispatch(setModalLoginSuccess())
        return response.data
    } else {
        return rejectWithValue(response.data)
    }

})

export const loginToken = createAsyncThunk('auth/siginToken', async ({ token }, { rejectWithValue, getState }) => {

    try {
        const response = await axios.get('/auth/siginToken')
        if (response.status === 200) {
            setAuthToken(token)

            return response.data
        }
        else return rejectWithValue(response.data)

    } catch (error) {
        setAuthToken(null)
        rejectWithValue(error.response.data)
        localStorage.removeItem('aurBlog-acc')
    }


})

export const register = createAsyncThunk('auth/register', async (dataForm, { rejectWithValue, dispatch }) => {
    try {

        const response = await axios.post('auth/register', dataForm)



        if (response.status === 200) {
            dispatch(setModalRegisterSuccess())
            return response.data
        }
    } catch (error) {

        dispatch(setMessageErrorRegister(error.response.data.message))
    }
})


const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        authLoading: false,
        isAuthenticate: false,
        user: null,
        message: {
            login: '',
            register: ''
        },
        isOpenModalLoginSuccess: false,
        isOpenModalRegisterSuccess: false
    },
    reducers: {
        setModalLoginSuccess: (state) => {
            state.isOpenModalLoginSuccess = true
        },
        setModalLoginFail: (state) => {
            state.isOpenModalLoginSuccess = false
        },
        setModalRegisterSuccess: (state) => {
            state.isOpenModalRegisterSuccess = true
        },
        setModalRegisterFail: (state) => {
            state.isOpenModalRegisterSuccess = false
        },
        setMessageErrorRegister: (state, { payload }) => {
            state.message.register = payload
        },
        setAuthSignOut: (state) => {
            Object.assign(state, {
                authLoading: false,
                isAuthenticate: false,
                user: null,
            })
        }, setUser: (state, { payload }) => {
            Object.assign(state, {
                user: payload,
            })
        }
    }
    ,
    extraReducers: {
        [login.pending]: (state, action) => {
            Object.assign(state, { authLoading: true, isAuthenticate: false })
        },
        [login.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                Object.assign(state, {
                    authLoading: false,
                    isAuthenticate: true,
                    user: payload?.user,
                })
            } else {
                Object.assign(state, {
                    authLoading: false,
                    isAuthenticate: false,
                    user: payload?.user,
                })
            }
        },
        [login.rejected]: (state, { payload }) => {
            Object.assign(state, {
                authLoading: false, isAuthenticate: false, user: null, message: {
                    ...state.message,
                    login: payload.message
                }
            })
        },
        // Login Token,
        [loginToken.pending]: (state, action) => {
            Object.assign(state, {
                authLoading: true,
                isAuthenticate: false
            })
        },
        [loginToken.fulfilled]: (state, { payload }) => {
            Object.assign(state, {
                authLoading: false,
                isAuthenticate: true,
                user: payload?.user
            })
        },
        [loginToken.rejected]: (state, action) => {
            Object.assign(state, { authLoading: false, isAuthenticate: false, user: null })
        },

        //register

        // [register.pending]: (state, action) => {
        //     Object.assign(state, {
        //         authLoading: true,
        //         isAuthenticate: false
        //     })
        // },
        // [register.fulfilled]: (state, { payload }) => {
        //     Object.assign(state, {
        //         authLoading: false,
        //         isAuthenticate: true,
        //         user: payload?.user
        //     })
        // },
        // [register.rejected]: (state, action) => {
        //     Object.assign(state, { authLoading: false, isAuthenticate: false, user: null })
        // },
    }
})
//Reducer
const authReducer = AuthSlice.reducer

//Selector
export const authSelector = state => state.auth


export const { setModalLoginSuccess, setModalLoginFail, setModalRegisterSuccess, setModalRegisterFail, setMessageErrorRegister, setAuthSignOut, setUser } = AuthSlice.actions

export default authReducer