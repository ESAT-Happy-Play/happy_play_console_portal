import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../redux/reducers/auth/AuthReducer';
import { GetStoreObject } from "../helper/Helpers";

let authdata = GetStoreObject("auth");

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_AGENT_API_URL,
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // const token = getState().authState.token;
        const token = (authdata !== null) ? authdata.token : "";
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        headers.set("authorization", `Token 2F275AC1-8408-4C2E-A3DA-A5DBA2FFC32B`);
        headers.set("Content-Type", "application/json");
        headers.set("Access-Control-Allow-Origin", "*");

        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}
console.log(`current url ${process.env.REACT_APP_AGENT_API_URL}`);
export const ApiRequestBuilder = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})