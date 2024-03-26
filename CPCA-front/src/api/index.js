
import{createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'; 
import { authService } from './services/authService';

export const api = createApi({
    reducerPath: 'api', 
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/v1'}),
    endpoints: (builder) => ({
        ...authService(builder),

    })
})

export const {useLoginUserMutation, useLogoutUserMutation, useRegisterUserMutation} = api; 
console.log(api); 