import {createSlice} from "@reduxjs/toolkit";
import {UserAuthType} from "./type";
import {fetchType} from "../type";
import {toastController} from "../toast/controller";
import {EMAIL_REGEX} from "@/core/rejex";
import {httpGet, httpPost, refrechToken} from "@/core/http";
import cookies from "js-cookie";
import { socket } from "@/components/core/SocketComponent";
export const authReducer = createSlice({
    name: 'authUser',
    initialState: ()=>{
        if( typeof localStorage != 'undefined'){
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
                return {loading: false, error: '', token,
                user: typeof JSON != 'undefined' && typeof user != 'undefined' && user != null ? JSON.parse(user) : null,
                   dashboard: {}
            } as UserAuthType & fetchType & {dashboard: any};
        }
        return {loading: false, error: '', dashboard: {}} as UserAuthType & fetchType & {dashboard: any};
    },
    reducers: {
        loading(state){
            state.loading = true;
        },
        logout(state){
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            localStorage.removeItem('curr-mode');
            cookies.remove('token');
            cookies.remove('refreshToken');
            state.token = undefined;
            state.user = undefined;
        },
        success(state, data){
            state.loading= false;
            state.token = data.payload.token;
            localStorage.setItem('token', data.payload.token);
            localStorage.setItem('refreshToken', data.payload.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.payload.user));
            cookies.set('token', data.payload.token);
            cookies.set('refreshToken', data.payload.refreshToken);
            state.user = data.payload.user;
        },
        stopLoading(state){
            state.loading = false;
        },
        dashboardData(state, payload){
            state.dashboard = payload.payload.data;
        }
    }
})
export default authReducer.reducer;
export const LoginThunk = (data: any): any => async (dispatch: any) => {
    try {
        dispatch(authReducer.actions.loading());
        const result: any = await httpPost(`/login`, data);
        dispatch(toastController.actions.showSuccess('login SuccessFull'));
        dispatch(authReducer.actions.success(result));
        socket.emit('addEmail', JSON.stringify({email: result?.user?.email || '' , token: result?.refreshToken || '' }))
        return {success: true}
    } catch (err) {
        dispatch(authReducer.actions.stopLoading());
        dispatch(toastController.actions.showError(err));
        return {success: false}
    }
};


export const signUpThunk = (data: any): any => async (dispatch: any) => {
    try {
        dispatch(authReducer.actions.loading());
        if(!EMAIL_REGEX.test(data.email)){
            dispatch(authReducer.actions.stopLoading());
            dispatch(toastController.actions.showError('Email is not Valid!'));
            return {success: false};
        }
        const result: any = await httpPost(`/register`, data);
        dispatch(toastController.actions.showSuccess('Account Register successfully'));
        dispatch(authReducer.actions.success(result));
        socket.emit('addEmail', JSON.stringify({email: result?.user?.email || '' , token: result?.refreshToken || '' }))
        return {success: true}
    } catch (err) {

        dispatch(toastController.actions.showError(err));
        dispatch(authReducer.actions.stopLoading());
        return {success: false}
    }
};
export const forgetPasswordThunk = (data: any): any => async (dispatch: any) => {
    try {
        dispatch(authReducer.actions.loading());
        if(!EMAIL_REGEX.test(data.email)){
            dispatch(authReducer.actions.stopLoading());
            dispatch(toastController.actions.showError('Email is not Valid!'));
            return {success: false};
        }
        await httpPost(`/forget-password`, data);
        dispatch(toastController.actions.showSuccess('Password reset successfully'));
        dispatch(authReducer.actions.stopLoading());
        return {success: true}
    } catch (err) {
        dispatch(authReducer.actions.stopLoading());
        dispatch(toastController.actions.showError(err));
        return {success: false}
    }
};
export const logout = (): any => async (dispatch: any) => {
    dispatch(authReducer.actions.logout());
}
export const refechToken = (): any => async (dispatch: any) => {
    refrechToken().then((e: any)=> {
        dispatch(authReducer.actions.success(e.data));
    }).catch(e=> {
    });
}

export const refechTokenAsync = (): any => async (dispatch: any) => {
    const data: any = await refrechToken()
    console.log(data);
    if(data && data['data']){
        dispatch(authReducer.actions.success(data['data']));
    }
}

export const setProfile = (file: File): any => async (dispatch: any) => {
    try {
        dispatch(authReducer.actions.loading());
        const form = new FormData();
        form.set('pic', file);
        const result = await httpPost(`/me/update/profile`, form);
        dispatch(toastController.actions.showSuccess('Profile updated successfully'));
        dispatch(refechToken());
        return {success: true}
    } catch (err) {
        dispatch(authReducer.actions.stopLoading());
        dispatch(toastController.actions.showError(err));
        return {success: false}
    }
};

export const SendTokenThunk = (data: {email: string, type: 1 | 2}): any => async (dispatch: any) => {
    try {
        if(!EMAIL_REGEX.test(data.email)){
            return dispatch(toastController.actions.showError('Email is not Valid!'));
        }
        dispatch(authReducer.actions.loading());
        httpGet(`/otp?email=${data.email}&type=${data.type}`).then(e=> {
            dispatch(authReducer.actions.stopLoading());
            return dispatch(toastController.actions.showSuccess('OTP as been send in your email'));
        }).catch(e=> {
            dispatch(authReducer.actions.stopLoading());
            return dispatch(toastController.actions.showError(e));
        })
    } catch (err) {
        dispatch(toastController.actions.showError(err));
        dispatch(authReducer.actions.stopLoading());
        return dispatch(authReducer.actions.stopLoading());
    }
};