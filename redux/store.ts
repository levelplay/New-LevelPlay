import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import modelReducer, { modelInitialState } from './model/controller';
import toastReducer, { toastInitialState } from './toast/controller';
import authReducer from './auth/controller';
import socketReducer from "./socket/controller";

const rootReducer = combineReducers({
    model: modelReducer,
    toast: toastReducer,
    auth: authReducer,
    game: socketReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        model: modelInitialState,
        toast: toastInitialState,
    },
    devTools: true,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({ thunk: true })
});

