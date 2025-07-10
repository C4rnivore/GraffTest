import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type PostDTO, type CommentDTO, type UserDTO } from "../lib/types";
import { getPostDataById } from "../api/posts";
import { getCommentariesForPost } from "../api/comments";
import { getUserById } from "../api/users";
import CommentariesList from "../components/comments/commentariesList";
import SkeletonWrapper from "../components/skeletonWrapper";


function PostPage() {
    const { id } = useParams<{ id: string }>()
    const [postData, setPostData] = useState<PostDTO | null>(null)
    const [user, setUser] = useState<UserDTO | null>(null)
    const [comments, setComments] = useState<Array<CommentDTO> | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if(!id || id==='') return

        getPostDataById(Number(id))
            .then(res => setPostData(res))
        getCommentariesForPost(Number(id))
            .then(res => setComments(res))
    },[id])

    useEffect(()=>{
        if(!postData) return

        getUserById(postData.userId)
            .then(res => setUser(res))
    },[postData])

    return ( 
        <section className="max-w-3xl mx-auto px-4 py-8">
             <button
                onClick={() => navigate('/')}
                className="fixed top-6 left-6 mb-4 px-4 py-2 text-blue-500 rounded hover:cursor-pointer hover:underline"
            >
                Назад на главную
            </button>

            {/* Пост */}
            <div className="bg-white shadow rounded-xl p-6 mb-6 border border-gray-200">
                {postData && (
                    <SkeletonWrapper count={1} height={30} show={!postData}>
                        <>
                            <h1 className="text-2xl font-bold mb-4 text-gray-800">{postData.title}</h1>
                            <p className="text-gray-700 leading-relaxed">{postData.body}</p>
                        </>
                    </SkeletonWrapper>
                )}
            </div>

            {/* Автор */}
            <div className="bg-white shadow rounded-xl p-6 mb-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Автор</h2>
                {user && (
                    <SkeletonWrapper count={3} height={20} show={!user}>
                    <div className="space-y-2">
                            <div><span className="font-semibold text-gray-700">Имя пользователя: </span>{user.username}</div>
                            <div><span className="font-semibold text-gray-700">Имя: </span>{user.name}</div>
                            <div><span className="font-semibold text-gray-700">Email: </span>{user.email}</div>
                        </div>
                    </SkeletonWrapper>
                )}
            </div>

            {/* Комментарии */}
            <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Комментарии</h2>
                {comments && (
                    <SkeletonWrapper count={5} height={20} show={!comments}>
                        <CommentariesList data={comments} />
                    </SkeletonWrapper>
                )}
            </div>
        </section>
    );
}

export default PostPage;