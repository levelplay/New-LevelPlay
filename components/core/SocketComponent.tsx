"use client"
import { updateLoading } from "@/redux/socket/controller";
import { store } from "@/redux/store";
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
  useEffect(()=>{
socket.once('connect', ()=>{
  console.log('connected');
})
socket.on('gameChallenge', (e)=>{
  console.log('gameChallenge', e);
})
socket.on('error', (e)=>{
  store.dispatch(updateLoading(false));
  console.log('error' ,e);
});
socket.on('start-tiktakTok', (e)=>{
  store.dispatch(updateLoading(false));
  console.log('start-tiktakTok', e);
})
  },[])
  
  return (
    <>
    </>
  );
};
