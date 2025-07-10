import type { PostDTO } from "../../lib/types";
import Skeleton from "react-loading-skeleton";
import openIcon from '../../assets/icons/open.svg'
import { useSearchParams } from 'react-router-dom'

function Post({data}:{data:PostDTO}) {
    const [searchParams, setSearchParams] = useSearchParams()

    const addCommentariesQuery = (postId:number) => {
        searchParams.set('comment_id', String(postId))
        setSearchParams(searchParams)
    }

    return ( 
        <div className="border border-black rounded-sm p-4 flex flex-col h-70 shadow-sm">
            <h2 className="font-semibold mb-2 text-lg leading-tight line-clamp-2 h-[3rem]">
                {data.title || <Skeleton/>}
            </h2>

            <p className="text-sm text-gray-700 line-clamp-5 mb-auto">
                {data.body || <Skeleton count={5}/>}
            </p>

            <div className="flex flex-row justify-between items-center mt-4">
                <button onClick={() => addCommentariesQuery(data.id)} className="px-3 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-600 hover:cursor-pointer text-sm">
                    Комментарии
                </button>
                <button title="Открыть в новой вкладке" className="px-1 py-1 border border-gray-200 hover:border-gray-400 rounded-sm text-blue-500 hover:underline hover:cursor-pointer text-sm">
                    <a href={`/post/${data.id}`} target="_blank">
                        <img className="w-5 h-5" src={openIcon} alt=""/>
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Post;