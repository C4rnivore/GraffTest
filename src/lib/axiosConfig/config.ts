import axios from "axios";
import { API } from "../constants";

export const axiosReq = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json",
    },
});