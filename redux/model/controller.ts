import { createSlice } from "@reduxjs/toolkit";
import { modelStatus, modelStatusType } from "./type";

const modelInitialState: modelStatus = {
    status: 'close',
    drawer: true,
    data: null
};

const modelController = createSlice({
    name: 'modelController',
    initialState: modelInitialState,
    reducers: {
        changeStatus(state, payload) {
            state.status = payload.payload;
        },
        changeData(state, payload) {
            state.data = payload.payload;
        },
        changeDrawer(state, payload) {
            state.drawer = payload.payload;
        },
    }
});

export default modelController.reducer;
export { modelController, modelInitialState };

export const changeModelStatus = (status: modelStatusType, data?: any): any => async (dispatch: any) => {
    dispatch(modelController.actions.changeData(data));
    dispatch(modelController.actions.changeStatus(status));
};

export const changeDrawer = (value: boolean): any => async (dispatch: any) => {
    dispatch(modelController.actions.changeDrawer(value));
};

export const closeModel = (): any => async (dispatch: any) => {
    dispatch(modelController.actions.changeData(null));
    dispatch(modelController.actions.changeStatus('close'));
};