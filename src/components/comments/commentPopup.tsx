import { useEffect, useState } from "react";
import {type PostDTO, type CommentDTO, type CommentPopupProps } from "../../lib/types";
import { useSearchParams } from "react-router-dom";
import { getCommentariesForPost } from "../../api/comments";
import { getPostDataById } from "../../api/posts";
import CommentariesList from "./commentariesList";
import SkeletonWrapper from "../skeletonWrapper";


function CommentPopup({postId}: CommentPopupProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [comments, setComments] = useState<Array<CommentDTO> | null>(null)
    const [relativePostData, setRelativePostData] = useState<PostDTO | null>(null)

    useEffect(()=>{
        getCommentariesForPost(postId)
            .then((res) => setComments(res))

        getPostDataById(postId)
            .then((res) => setRelativePostData(res))
    },[postId])

    const onClose = () => {
        searchParams.delete('comment_id')
        setSearchParams(searchParams)
    }

    return (  
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="hover:cursor-pointer absolute top-2 right-3 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &#10005;
                </button>
                
                <h2 className="mb-5"> 
                    Комментарии к посту  
                    <SkeletonWrapper count={1} height={20} show={!relativePostData}>
                        <strong> {relativePostData?.title}</strong>
                    </SkeletonWrapper>
                </h2>

                <SkeletonWrapper count={5} height={50} show={!comments}>
                    {comments && <CommentariesList data={comments}/>}
                </SkeletonWrapper>
            </div>
        </div>
    );
}

export default CommentPopup;