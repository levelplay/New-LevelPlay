import { createSlice } from "@reduxjs/toolkit";
import { httpDelete, httpGet, httpPost } from "@/core/http";
import { toastController } from "../toast/controller";
import { initialStateType } from "../store";
import { dataType } from "./type";
import { constructURL } from "@/core/constructURL";

const chatInitialState: initialStateType & dataType = {
    loading: false,
    detailLoading: false,
    lazyLoading: false,
};

const chatController = createSlice({
    name: "chatController",
    initialState: chatInitialState,
    reducers: {
        loading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        detailLoading(state) {
            state.detailLoading = true;
        },
        stopDetailLoading(state) {
            state.detailLoading = false;
        },
        lazyLoading(state) {
            state.lazyLoading = true;
        },
        stopLazyLoading(state) {
            state.lazyLoading = false;
        },
        loadContact(state, { payload }) {
            state.data = payload.data;
        },

        getChat(state, { payload }) {
            state.chat = payload.data;
        },
        loadChat(state, { payload }) {
            state.chat = [...payload.data, ...(state.chat ?? [])];
        },
        addMessage(state, { payload }) {
            state.chat = [...(state.chat ?? []), payload];
        },

        getCommunityChat(state, { payload }) {
            state.communityChat = payload.data;
        },
        loadCommunityChat(state, { payload }) {
            state.communityChat = [...payload.data, ...(state.communityChat ?? [])];
        },
        addCommunityMessage(state, { payload }) {
            state.communityChat = [...(state.communityChat ?? []), payload];
        },
    },
});

export { chatController, chatInitialState };

export const addMessage =
    (data: any): any =>
        async (dispatch: any) => {
            try {
                dispatch(chatController.actions.addMessage(data));
                return { success: true };
            } catch (e: any) {
                dispatch(toastController.actions.showError(e));
                return { success: false };
            }
        };

export const loadChat =
    (id: string, count?: number): any =>
        async (dispatch: any) => {
            try {
                dispatch(chatController.actions.lazyLoading());
                const result: any = await httpGet(constructURL(`me/chat?contactId=${id}`, {
                    count: count ?? '0',
                    limit: '10',
                }));
                dispatch(chatController.actions.loadChat(result));
                dispatch(chatController.actions.stopLazyLoading());
                return { success: true };
            } catch (e: any) {
                dispatch(toastController.actions.showError(e));
                return { success: false };
            }
        };

export const getChat =
    (id: string): any =>
        async (dispatch: any) => {
            try {
                dispatch(chatController.actions.getChat({
                    data: []
                }));
                dispatch(chatController.actions.lazyLoading());
                const result: any = await httpGet(constructURL(`me/chat?contactId=${id}`, {
                    count: '0',
                    limit: '10',
                }));
                dispatch(chatController.actions.getChat(result));
                dispatch(chatController.actions.stopLazyLoading());
                return { success: true };
            } catch (e: any) {
                dispatch(toastController.actions.showError(e));
                return { success: false };
            }
        };

export const loadContact =
    (): any =>
        async (dispatch: any) => {
            try {
                const result: any = await httpGet("me/contact");
                dispatch(chatController.actions.loadContact(result));
                return { success: true };
            } catch (e: any) {
                dispatch(toastController.actions.showError(e));
                return { success: false };
            }
        };


export const getContact =
    (): any =>
        async (dispatch: any) => {
            try {
                dispatch(chatController.actions.detailLoading());
                await dispatch(loadContact());
                dispatch(chatController.actions.stopDetailLoading());
                return { success: true };
            } catch (e: any) {
                dispatch(toastController.actions.showError(e));
                dispatch(chatController.actions.stopDetailLoading());
                return { success: false };
            }
        };

export const addContact = (email: string): any => async (dispatch: any) => {
    try {
        dispatch(chatController.actions.loading());
        const result: any = await httpPost(`me/contact?email=${email}`, {});
        dispatch(
            toastController.actions.showSuccess(
                result.message ?? "Contact add successfully"
            )
        );
        dispatch(chatController.actions.stopLoading());
        await dispatch(loadContact());
        return { success: true };
    } catch (e: any) {
        dispatch(toastController.actions.showError(e));
        dispatch(chatController.actions.stopLoading());
        return { success: false };
    }
};

export const removeContact = (id: string): any => async (dispatch: any) => {
    try {
        dispatch(chatController.actions.loading());
        const result: any = await httpDelete(`me/contact?id=${id}`);
        dispatch(
            toastController.actions.showSuccess(
                result.message ?? "Contact remove successfully"
            )
        );
        dispatch(chatController.actions.stopLoading());
        await dispatch(loadContact());
        return { success: true };
    } catch (e: any) {
        dispatch(toastController.actions.showError(e));
        dispatch(chatController.actions.stopLoading());
        return { success: false };
    }
};

export const addCommunityMessage =
    (data: any): any =>
        async (dispatch: any) => {
            try {
                dispatch(chatController.actions.addCommunityMessage(data));
                return { success: true };
            } catch (e: any) {
                dispatch(toastController.actions.showError(e));
                return { success: false };
            }
        };

export const loadCommunityChat =
    (count?: number): any =>
        async (dispatch: any) => {
            try {
                dispatch(chatController.actions.lazyLoading());
                const result: any = await httpGet(constructURL(`me/chat/globle`, {
                    count: count ?? '0',
                    limit: '10',
                }));
                dispatch(chatController.actions.loadCommunityChat(result));
                dispatch(chatController.actions.stopLazyLoading());
                return { success: true };
            } catch (e: any) {
                dispatch(toastController.actions.showError(e));
                return { success: false };
            }
        };

export const getCommunityChat =
    (): any =>
        async (dispatch: any) => {
            try {
                dispatch(chatController.actions.lazyLoading());
                const result: any = await httpGet(constructURL(`me/chat/globle`, {
                    count: '0',
                    limit: '10',
                }));
                dispatch(chatController.actions.getCommunityChat(result));
                dispatch(chatController.actions.stopLazyLoading());
                return { success: true };
            } catch (e: any) {
                dispatch(toastController.actions.showError(e));
                return { success: false };
            }
        };
