import { createSlice } from "@reduxjs/toolkit";

type socketInitialState = {
    loading: boolean,
};

const socketController = createSlice({
    name: 'SocketController',
    initialState: { loading: false} as socketInitialState,
    reducers: {
      setLoading(state, {payload}){
        state.loading = payload;
      }
    }
});

export default socketController.reducer;
export { socketController };

export const updateLoading = (value: boolean): any => async (dispatch: any) => {
    dispatch(socketController.actions.setLoading(value));
};
