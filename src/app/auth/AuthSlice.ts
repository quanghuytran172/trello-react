import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: any = {
    isValid: false,
    user: {},
};

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: (state, action) => {
            return { ...state, isValid: true, user: action.payload };
        },
        signOut: (state, action) => {
            return action.payload;
        },
    },
});

const { reducer, actions } = auth;
export const { addUser, signOut } = actions;
export default reducer;
