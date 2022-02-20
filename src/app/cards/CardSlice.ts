import { Card } from "./../types/index";
// import { Column } from "./../types/index";
import { createSlice } from "@reduxjs/toolkit";
// import { Column } from "../types";

// Define the initial state using that type
const initialState: any = {
    cards: [],
};

const cards = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setCard: (state, action) => {
            state.cards = action.payload;
        },
        addCard: (state, action) => {
            state.cards.push(action.payload);
        },
        removeCard: (state, action) => {
            state.cards = state.cards.filter(
                (card: Card) => card.id !== action.payload
            );
        },
        updateCardName: (state, action) => {
            const cardIndexUpdate = state.cards.findIndex(
                (i: any) => i.id === action.payload.id
            );
            if (cardIndexUpdate >= 0) {
                state.cards[cardIndexUpdate].name = action.payload.data;
            }
        },
        updateCardDescription: (state, action) => {
            const cardIndexUpdate = state.cards.findIndex(
                (i: any) => i.id === action.payload.id
            );
            if (cardIndexUpdate >= 0) {
                state.cards[cardIndexUpdate].description = action.payload.data;
            }
        },
        removeCardByColumnId: (state, action) => {
            state.cards = state.cards.filter(
                (card: any) => card.listId !== action.payload
            );
        },
        updateListId: (state, action) => {
            const cardIndexUpdate = state.cards.findIndex(
                (i: any) => i.id === action.payload.id
            );
            if (cardIndexUpdate >= 0) {
                state.cards[cardIndexUpdate].listId = action.payload.data;
            }
        },
    },
});

const { reducer, actions } = cards;
export const {
    setCard,
    addCard,
    removeCard,
    updateListId,
    removeCardByColumnId,
    updateCardName,
    updateCardDescription,
} = actions;
export default reducer;
