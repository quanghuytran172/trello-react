import { User } from "../app/types";
import axiosClient from "./axiosClient";

const userApi = {
    createUser: (user: User) => {
        const url = "/users";
        return axiosClient.post(url, user);
    },

    getUser: (uuid: String) => {
        const url = `/users?uuid=${uuid}`;
        return axiosClient.get(url);
    },
    getAllUser: () => {
        const url = "/users";
        return axiosClient.get(url);
    },
    searchEmailUser: (search: String) => {
        const url = `/users?email_like=${search}`;
        return axiosClient.get(url);
    },
};

export default userApi;
