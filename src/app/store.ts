import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const rootReducer = {};

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
