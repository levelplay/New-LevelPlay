import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import modelReducer, { modelInitialState } from './model/controller';
import toastReducer, { toastInitialState } from './toast/controller';
import { chatController, chatInitialState } from './chat/controller';
import authReducer from './auth/controller';
import socketReducer from "./socket/controller";

const rootReducer = combineReducers({
    model: modelReducer,
    toast: toastReducer,
    auth: authReducer,
    game: socketReducer,
    chat: chatController.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        model: modelInitialState,
        toast: toastInitialState,
        chat: chatInitialState
    },
    devTools: true,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({ thunk: true })
});


// initial data
export type initialStateType = {
    loading: boolean;
    detailLoading: boolean;
    lazyLoading: boolean;
};
