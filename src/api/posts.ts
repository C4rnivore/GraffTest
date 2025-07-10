import { axiosReq } from "../lib/axiosConfig/config";
import type { PostDTO } from "../lib/types";

export const getPosts = async (from:number = 0, limit:number = 12) => {
    let result: Array<PostDTO> = [];

    try{
        let response = await axiosReq.get(`/posts?_start=${from}&_limit=${limit}`);
        result = response.data;
        return result;
    }
    catch(e){
        console.error(e);
        return result;
    }
}

export const getPostsWithSubstring = async (substring:string) => {
    let result: Array<PostDTO> = []

    try{
        let response = await axiosReq.get(`/posts`);
        result = response.data.filter((el:PostDTO) => el.title.toLowerCase().includes(substring.toLocaleLowerCase()));
        return result;
    }
    catch(e){
        console.error(e);
        return result;
    }
}

export const getPostDataById = async (id:number) => {
    let result: PostDTO

    try{
        let response = await axiosReq.get(`/posts/${id}`);
        result = response.data
        return result;
    }
    catch(e){
        console.error(e);
        return null;
    }
}
