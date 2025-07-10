import { axiosReq } from "../lib/axiosConfig/config";
import type { CommentDTO } from "../lib/types";

export const getCommentariesForPost = async (postId:number) => {
    let result: Array<CommentDTO> = [];

    try{
        let response = await axiosReq.get(`/post/${postId}/comments`);
        result = response.data;
        return result;
    }
    catch(e){
        console.error(e);
        return result;
    }
}