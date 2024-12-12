import { configureStore } from '@reduxjs/toolkit';
import { messageReduser } from '../features/messagesSlice.ts';

export const store = configureStore({
  reducer: {
    messages: messageReduser
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;