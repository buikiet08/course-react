import { authService } from "@/services/auth";
import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { clearToken, clearUser, getUser, setToken, setUser } from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginThunkAction = createAsyncThunk('auth/login', async (data, thunkApi) => {
    try {
        thunkApi.dispatch(authActions.toggleLoading(true))
        const res = await authService.login(data)
        setToken(res.data)
        const user = await userService.getProfile()
        setUser(user.data)
        // thunkApi.dispatch(authActions.setUser(user.data))
        // thunkApi.dispatch(getCartAction())
        thunkApi.fulfillWithValue(user.data)
        // dispatch({ type: SET_USER_ACTION, payload: user.data })
        return user.data
    } catch (err) {
        thunkApi.rejectWithValue(err?.response?.data)
        handleError(err)
        throw err?.response?.data
    } finally {
        thunkApi.dispatch(authActions.toggleLoading(false))
    }
})


export const loginByCodeThunkAction = createAsyncThunk('auth/loginByCode', async (code, thunkApi) => {
    try {
        const res = await authService.loginByCode(code)
        setToken(res.data)
        const user = await userService.getProfile()
        setUser(user.data)
        // thunkApi.dispatch(authActions.setUser(user.data))
        thunkApi.fulfillWithValue(user.data)
        // dispatch({ type: SET_USER_ACTION, payload: user.data })
        return user.data
    } catch (err) {
        handleError(err)
        thunkApi.rejectWithValue(err?.response?.data)
        throw err?.response?.data
    }
})

export const setUserThunkAction = createAsyncThunk('auth/setUser', (user, thunkApi) => {
    setUser(user)
    thunkApi.dispatch(authActions.setUser(user))

})

export const getUserThunkAction = createAsyncThunk('auth,getUser', async (_,thunkApi) => {
    try {
        if(getToken()) {
            const res = await userService.getProfile()
            setUser(res.data)
            thunkApi.dispatch(authActions.setUser(res.data))
        }
    } catch (error) {
        
    }
})

export const logoutThunkAction = createAsyncThunk('auth/logout', async (data, thunkApi) => {
    thunkApi.dispatch(authActions.logout())
    clearUser()
    clearToken()
})
export const { reducer: authReducer, actions: authActions, getInitialState } = createSlice({
    initialState: () => ({
        user: getUser(),
        status: 'idle',
        loginLoading: false
    }),
    name: 'auth',
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        toggleLoading: (state, action) => {
            state.loginLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunkAction.pending, (state) => {
            state.loginLoading = true
            state.status = 'pending'
        })
        builder.addCase(loginThunkAction.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = 'success'
            state.loginLoading = false

        })
        builder.addCase(loginThunkAction.rejected, (state) => {
            state.status = 'error'
            state.loginLoading = false

        })
        builder.addCase(loginByCodeThunkAction.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})