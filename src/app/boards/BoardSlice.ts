import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../types";

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
        updateBoardName: (state, action) => {
            state.boards = state.boards.map((board: Board) => {
                if (board.boardId === action.payload.id) {
                    board.name = action.payload.data;
                }
                return board;
            });
        },
        updateBoardImage: (state, action) => {
            state.boards = state.boards.map((board: Board) => {
                if (board.boardId === action.payload.id) {
                    board.imageURL = action.payload.data;
                }
                return board;
            });
        },
    },
});

const { reducer, actions } = boards;
export const {
    addBoard,
    setBoard,
    toggleAddModal,
    updateBoardName,
    updateBoardImage,
} = actions;
export default reducer;
