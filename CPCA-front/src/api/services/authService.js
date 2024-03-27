// Desc: Auth service to handle login, logout and register

import { data } from "autoprefixer";

export const authService = (builder) => ({
    loginUser: builder.mutation({
        query: (credentials) => ({
            url: '/user/login', 
            method: 'post', 
            body: credentials
        })
    }),
    logoutUser: builder.mutation({
        query: () => ({
            method: 'post', 
            url: '/user/logout'
        })
    }), 
    registerUser:  builder.mutation({
        query: (credentials)=> ({
            url: '/user/register',
            method: 'post', 
            body: credentials,
        })
    }), 
    editUserInfo: builder.mutation({
        query: (data) => ({
            url: '/user/edit', 
            method: 'patch', 
            body: data
        })
    })
})