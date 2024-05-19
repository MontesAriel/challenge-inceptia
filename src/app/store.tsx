import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../reducers/client/ClientSlice';

export const store = configureStore({
  reducer: {
    client: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;