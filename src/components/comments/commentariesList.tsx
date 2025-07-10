import type { CommentDTO } from "../../lib/types";

function CommentariesList({data}: {data: Array<CommentDTO>}) {
    if(data.length === 0){
        return(
            <span>Комментариев нет</span>
        )
    }
    else{
        return ( 
            <ul className="overflow-y-scroll max-h-80">
                {data.map((el) => (
                    <CommentItem data={el} />
                ))}
            </ul>
        );
    }
}

const CommentItem = ({ data } : { data: CommentDTO }) => {
    return(
        <li className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{data.name}</h3>
            <a href={`mailto:${data.email}`} className="hover:underline text-sm text-gray-500 mb-2 block">{data.email}</a>
            <p className="text-gray-700 leading-relaxed">{data.body}</p>
        </li>
    )
}

export default CommentariesList;