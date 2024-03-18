import { createSlice } from "@reduxjs/toolkit";
import { ToastType } from "./type";

const toastInitialState: ToastType = {
    error: '',
    success: '',
    warning: ''
}

const toastController = createSlice({
    name: 'toastController',
    initialState: toastInitialState,
    reducers: {
        showError(state, payload) {
            state.error = payload.payload;
        },
        removeError(state) {
            state.error = '';
        },
        showSuccess(state, payload) {
            state.success = payload.payload;
        },
        removeSuccess(state) {
            state.success = '';
        },
        showWarning(state, payload) {
            state.warning = payload.payload;
        },
        removeWarning(state) {
            state.warning = '';
        }
    }
});

export default toastController.reducer;
export { toastController, toastInitialState };

export const showErrorThunk = (error: string): any => async (dispatch: any) => {
    dispatch(toastController.actions.showError(error));
};

export const removeErrorThunk = (error: string): any => async (dispatch: any) => {
    dispatch(toastController.actions.removeError());
};

export const showSuccessThunk = (error: string): any => async (dispatch: any) => {
    dispatch(toastController.actions.showSuccess(error));
};

export const removeSuccessThunk = (error: string): any => async (dispatch: any) => {
    dispatch(toastController.actions.removeSuccess());
};

export const showWarningThunk = (error: string): any => async (dispatch: any) => {
    dispatch(toastController.actions.showWarning(error));
};

export const removeWarningThunk = (error: string): any => async (dispatch: any) => {
    dispatch(toastController.actions.removeWarning());
};
