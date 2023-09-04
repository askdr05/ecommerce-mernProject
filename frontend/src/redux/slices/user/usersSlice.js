import { getAllUsers, userRollUpdate, adminDeleteUsers, getUserDetails } from './userApi';

const createSlice = require('@reduxjs/toolkit').createSlice;

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        users: [],
        user: {},
        error: null,
        success: false
    },
    reducers: {
        clearUsersSliceError(state) {
            state.error = null
        },
        usersStateReset(state) {
            state.success = false
        }

    },
    extraReducers: (builder) => {

        //users
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.allUserDetails
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false
            state.users = {}
            state.error = action.payload.message

        })

        // update user roll
        builder.addCase(userRollUpdate.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userRollUpdate.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
        })
        builder.addCase(userRollUpdate.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })

        //delte users
        builder.addCase(adminDeleteUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(adminDeleteUsers.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
        })
        builder.addCase(adminDeleteUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message

        })

        //getUserDetails--admin
        builder.addCase(getUserDetails.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.singleUserDetails

        })
        builder.addCase(getUserDetails.rejected, (state, action) => {
            state.loading = false
            state.user = {}
            state.error = action.payload.message

        })
    }

})


export const { clearUsersSliceError, usersStateReset } = usersSlice.actions;

export default usersSlice.reducer