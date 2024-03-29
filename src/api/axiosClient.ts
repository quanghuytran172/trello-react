import firebase from "../firebase/config";
import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Handle token here ...
    return config;
});

axiosClient.interceptors.response.use(
    (response: any) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    }
);

export default axiosClient;
