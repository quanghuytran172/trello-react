import { Card } from "../app/types";
import axiosClient from "./axiosClient";

const cardApi = {
    getAllCardByBoardId: (id: String) => {
        const url = `/card?boardId=${id}`;
        return axiosClient.get(url);
    },
    createCard: (card: Card) => {
        const url = "/card";
        return axiosClient.post(url, card);
    },
    deleteCard: (id: String) => {
        const url = `/card/${id}`;
        return axiosClient.delete(url);
    },

    updateCard: (id: String, data: any) => {
        const url = `/card/${id}`;
        return axiosClient.patch(url, data);
    },
};

export default cardApi;
