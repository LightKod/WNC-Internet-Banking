import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserState {
    userName: string;
    userRole: string;
}

const initialState: UserState = {
    userName: "",
    userRole: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        setUserRole(state, action: PayloadAction<string>) {
            state.userRole = action.payload;
        } 
    }
});

export const {setUserName, setUserRole} = userSlice.actions;

export default userSlice.reducer;