import { createSlice } from "@reduxjs/toolkit";
import { ToastType } from "./type";

const toastInitialState: ToastType = {
    error: '',
    success: '',
    warning: '',
    challenge: '',
    data: null
}

const toastController = createSlice({
    name: 'toastController',
    initialState: toastInitialState,
    reducers: {
        showError(state, payload) {
            state.error = payload.payload;
        },
        showSuccess(state, payload) {
            state.success = payload.payload;
        },
        showChallenge(state, payload) {
            state.challenge = payload.payload;
        },
        showWarning(state, payload) {
            state.warning = payload.payload;
        },
        changeData(state, payload) {
            state.data = payload.payload;
        },
    }
});

export default toastController.reducer;
export { toastController, toastInitialState };

export const showErrorThunk = (error: string, data?: any): any => async (dispatch: any) => {
    dispatch(toastController.actions.changeData(data ?? null));
    dispatch(toastController.actions.showError(error));
};

export const showSuccessThunk = (error: string, data?: any): any => async (dispatch: any) => {
    dispatch(toastController.actions.changeData(data ?? null));
    dispatch(toastController.actions.showSuccess(error));
};

export const showWarningThunk = (error: string, data?: any): any => async (dispatch: any) => {
    dispatch(toastController.actions.changeData(data ?? null));
    dispatch(toastController.actions.showWarning(error));
};

export const showChallengeThunk = (error: string, data?: any): any => async (dispatch: any) => {
    dispatch(toastController.actions.changeData(data ?? null));
    dispatch(toastController.actions.showChallenge(error));
};
