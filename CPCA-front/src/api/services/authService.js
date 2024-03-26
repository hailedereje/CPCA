// Desc: Auth service to handle login, logout and register

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
    })
})