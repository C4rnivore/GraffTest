import { axiosReq } from "../lib/axiosConfig/config";
import type { UserDTO } from "../lib/types";

export const getUserById = async (userId:number) => {
    let result: UserDTO

    try{
        let response = await axiosReq.get(`/users/${userId}`);
        result = response.data;
        return result;
    }
    catch(e){
        console.error(e);
        return null;
    }
}