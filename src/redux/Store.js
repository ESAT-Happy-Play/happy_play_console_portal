import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./reducers/auth/AuthReducer";
import AppStateReducer from "./reducers/AppStateReducer";
import MenuStateReducer from "./reducers/MenuStateReducer";
import AccountStateReducer from "./reducers/AccountStateReducer";
import OtpVerifiedStateReducer from "./reducers/OtpVerifiedStateReducer";

import { ApiRequestBuilder } from "../api/ApiRequestBuilder";

export const store = configureStore({
  reducer: {
    appState: AppStateReducer,
    menuState: MenuStateReducer,
    accountState: AccountStateReducer,
    numberVerified: OtpVerifiedStateReducer,
    [ApiRequestBuilder.reducerPath]: ApiRequestBuilder.reducer,
    authState: AuthReducer
  },
  middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(ApiRequestBuilder.middleware),
    devTools: true
});