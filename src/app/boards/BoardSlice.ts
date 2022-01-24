import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: any = {
    boards: [],
    isModalVisible: false,
};

const boards = createSlice({
    name: "boards",
    initialState,
    reducers: {
        addBoard: (state, action) => {
            state.boards.push(action.payload);
        },
        setBoard: (state, action) => {
            state.boards = action.payload;
        },
        toggleAddModal: (state, action) => {
            state.isModalVisible = action.payload;
        },
    },
});

const { reducer, actions } = boards;
export const { addBoard, setBoard, toggleAddModal } = actions;
export default reducer;
