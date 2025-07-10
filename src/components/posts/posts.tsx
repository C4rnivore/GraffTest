import type { PostsProps } from "../../lib/types";
import Post from "./post";


function Posts({data}: PostsProps) {
    return ( 
        <section className="grid grid-cols-6 max-[1440px]:grid-cols-4 max-[768px]:grid-cols-3 max-[320px]:grid-cols-1 gap-4">
            {data && data.map((el, index)=>(
                <Post key={index} data={el}/>
            ))}
        </section>
    );
}

export default Posts;