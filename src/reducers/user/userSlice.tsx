import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email: string;
    fullName: string;
    token: string;
}

const initialState : UserState = {
    email: "",
    fullName: "",
    token: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{email: string; fullName: string; token: string}>) => {
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
        state.token = action.payload.token;
        },
        unsetUser: (state) => {
            state.email = "";
            state.fullName = "";
            state.token = "";
        }
    }
})

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;