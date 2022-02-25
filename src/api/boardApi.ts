import { Board } from "../app/types";
import axiosClient from "./axiosClient";

const boardApi = {
    createBoard: (board: Board) => {
        const url = "/board";
        return axiosClient.post(url, board);
    },
    deleteBoard: (id: String) => {
        const url = `/board/${id}`;
        return axiosClient.delete(url);
    },
    getAllBoardByUser: (id: String) => {
        const url = `/board?accessId_like=${id}`;
        return axiosClient.get(url);
    },
    getBoardById: (id: any) => {
        const url = `/board?boardId=${id}`;
        return axiosClient.get(url);
    },
    updateBoard: (id: String, data: any) => {
        const url = `/board/${id}`;
        return axiosClient.patch(url, data);
    },
};

export default boardApi;
