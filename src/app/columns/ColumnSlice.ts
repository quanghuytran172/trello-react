import { Column } from "./../types/index";
import { createSlice } from "@reduxjs/toolkit";
// import { Column } from "../types";

// Define the initial state using that type
const initialState: any = {
    columns: [],
};

const columns = createSlice({
    name: "columns",
    initialState,
    reducers: {
        setColumns: (state, action) => {
            state.columns = action.payload;
        },
        addColumn: (state, action) => {
            state.columns.push(action.payload);
        },
        removeColumn: (state, action) => {
            state.columns = state.columns.filter(
                (column: Column) => column.id !== action.payload
            );
        },
        updateColumnName: (state, action) => {
            const columnIndexUpdate = state.columns.findIndex(
                (i: any) => i.id === action.payload.id
            );
            if (columnIndexUpdate >= 0) {
                state.columns[columnIndexUpdate].name = action.payload.data;
            }
        },

        updateCardOrder: (state, action) => {
            const columnIndexUpdate = state.columns.findIndex(
                (i: any) => i.id === action.payload.id
            );
            if (columnIndexUpdate >= 0) {
                state.columns[columnIndexUpdate].cardOrder =
                    action.payload.data;
            }
        },
    },
});

const { reducer, actions } = columns;
export const {
    addColumn,
    setColumns,
    removeColumn,
    updateColumnName,
    updateCardOrder,
} = actions;
export default reducer;
