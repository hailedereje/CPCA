// Desc: Auth service to handle login, logout and register

export const authService = (builder) => ({
    loginUser: builder.mutation({
        query: (credentials) => ({
            url: '/user/login', 
            method: 'POST', 
            body: credentials
        })
    }),
    logoutUser: builder.mutation({
        query: () => ({
            method: 'POST', 
            url: '/user/logout'
        })
    }), 
    registerUser:  builder.mutation({
        query: (credentials)=> ({
            url: '/user/register',
            method: 'POST', 
            body: credentials,
        })
    }), 
    editUserInfo: builder.mutation({
        query: (data) => ({
            url: '/user/profile', 
            method: 'PATCH', 
            body: data
        })
    }), 
    fetchUserProfile: builder.query({
        query: () => ({
            url: '/user/profile',
            method: 'GET',
        }),
    }),
    fetchUserById: builder.query({
        query: (id) => ({
            url: `/user/${id}`,
            method: 'GET',
        }),
    }),

})