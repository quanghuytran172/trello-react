import { Column } from "../app/types";
import axiosClient from "./axiosClient";

const columnApi = {
    getAllColumnByBoardId: (id: String) => {
        const url = `/list?boardId=${id}`;
        return axiosClient.get(url);
    },
    createColumn: (column: Column) => {
        const url = "/list";
        return axiosClient.post(url, column);
    },
    deleteColumn: (id: String) => {
        const url = `/list/${id}`;
        return axiosClient.delete(url);
    },
    updateColumn: (id: String, data: any) => {
        const url = `/list/${id}`;
        return axiosClient.patch(url, data);
    },
};

export default columnApi;
