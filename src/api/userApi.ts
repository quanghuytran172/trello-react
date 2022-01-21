import { User } from "../app/types";
import axiosClient from "./axiosClient";

const userApi = {
    createUser: (user: User) => {
        const url = "/users";
        return axiosClient.post(url, user);
    },
};

export default userApi;
