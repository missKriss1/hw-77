import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import { IMessages, IMessagesMutation } from '../types';


export const fetchMessage = createAsyncThunk<IMessages[], void>(
  'messages/fetchMessage',
  async () => {
    const productsResponse = await axiosApi<IMessages[]>('/messages');
    return productsResponse.data || [];
  }
);

export const createMessage = createAsyncThunk<void, IMessagesMutation>(
  'messages/createMessage',
  async (mes) => {
    const formData = new FormData();
    const keyes = Object.keys(mes) as (keyof IMessagesMutation)[];
    keyes.forEach((key) => {
      const value = mes[key];
      if(value !== null){
        formData.append(key, value);
      }
    })
    await axiosApi.post('/messages', formData);
  }
);