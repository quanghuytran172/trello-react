import { Board } from "../app/types";
import axiosClient from "./axiosClient";

const boardApi = {
    createBoard: (board: Board) => {
        const url = "/board";
        return axiosClient.post(url, board);
    },
    getBoardById: (id: String) => {
        const url = `/board?userId=${id}`;
        return axiosClient.get(url);
    },
};

export default boardApi;
