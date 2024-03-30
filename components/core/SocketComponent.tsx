"use client"
import { closeModel } from "@/redux/model/controller";
import { updateLoading } from "@/redux/socket/controller";
import { store } from "@/redux/store";
import { showChallengeThunk, showErrorThunk } from "@/redux/toast/controller";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {io} from 'socket.io-client';
export const socket = io(process.env.NEXT_PUBLIC_API_URL || '', {
  auth: {
    token: typeof localStorage  != 'undefined'  ? localStorage.getItem('refreshToken') || '': ''
  }
});

export const SocketComponent = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const { push } = useRouter();

  useEffect(()=>{
socket.once('connect', ()=>{
  console.log('connected');
})
socket.on('gameChallenge', (e: any)=>{
  console.log('gameChallenge', e);
  store.dispatch(showChallengeThunk(e));

})
socket.on('error', (e)=>{
  store.dispatch(updateLoading(false));
  console.log('error' ,e);
  store.dispatch(showErrorThunk(e));
});
socket.on('start-tiktakTok', (e)=>{
  store.dispatch(updateLoading(false));
  store.dispatch(closeModel());
  push(`/tik-tak-tok?player=${e}`);
})
  },[])
  
  return (
    <>
    </>
  );
};
