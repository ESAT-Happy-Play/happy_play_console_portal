import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./reducers/auth/AuthReducer";
import AppStateReducer from "./reducers/AppStateReducer";
import RoleStateReducer from "./reducers/RoleStateReducer";

import { ApiRequestBuilder } from "../api/ApiRequestBuilder";

export const store = configureStore({
  reducer: {
    appState: AppStateReducer,
    roleState: RoleStateReducer,
    [ApiRequestBuilder.reducerPath]: ApiRequestBuilder.reducer,
    authState: AuthReducer
  },
  middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(ApiRequestBuilder.middleware),
    devTools: true
});