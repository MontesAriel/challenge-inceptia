import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../reducers/client/ClientSlice';
import userReducer from '../reducers/user/userSlice';


export const store = configureStore({
  reducer: {
    client: clientReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;