import Searchbar from '../components/searchbar/searchbar'
import { getPosts, getPostsWithSubstring } from '../api/posts'
import '../App.css'
import { useEffect, useState, useRef } from 'react'
import type { PostDTO } from '../lib/types'
import Posts from '../components/posts/posts'
import { useInfiniteScroll } from '../lib/hooks/useInfiniteScroll'
import { useSearchParams } from 'react-router-dom'
import CommentPopup from '../components/comments/commentPopup'
import ScrollToTopButton from '../components/scrollTopBtn'
import SkeletonWrapper from '../components/skeletonWrapper'

function MainPage() {
    const [noMorePosts, setNoMorePosts] = useState<boolean>(false)
    const [allPosts, setAllPosts] = useState<Array<PostDTO>>([])
    const [filteredPosts, setFilteredPosts] = useState<Array<PostDTO>>([])
    const [limitPerPage, setLimitPerPage] = useState<number>(12)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [page, setPage] = useState<number>(0)
    const observerRef = useRef<HTMLDivElement | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const commentId = searchParams.get('comment_id')

    const onInputChange = (newValue:string) => {
        setInputValue(newValue)
    }

    // Disable scrolling whem modal is open
    useEffect(()=>{
        if(commentId)
            document.body.style.overflow = 'hidden'
        else
            document.body.style.overflow = ''
    },[commentId])

    // Fetch post by input
    useEffect(() => {
        if(inputValue === ''){
        setFilteredPosts([])
        }
        else if(!isLoading){
            setIsLoading(true)
            getPostsWithSubstring(inputValue)
                .then(res => setFilteredPosts(res))
                .finally(() => setIsLoading(false))
        }
    }, [inputValue])

    // Basic post update (lazy load)
    useEffect(() => {
        setIsLoading(true)
        let from = page * limitPerPage;

        getPosts(from < 0 ? 0 : from, limitPerPage)
            .then((res) => {
                setAllPosts(prev=>[...prev, ...res])
                if(res.length < limitPerPage)
                    setNoMorePosts(true)
            })
            .finally(()=>
                setIsLoading(false)
            )
    },[page, limitPerPage])

    const loadMore = () => {
        if(noMorePosts || isLoading) return
        setPage((prev) => prev + 1)
    }

    useInfiniteScroll(observerRef, loadMore, allPosts)

    return ( 
        <div className='flex flex-col w-3/4 mx-auto justify-center py-10'>
            <Searchbar onInputChange={onInputChange}/>

            {inputValue && (
                <span className="mb-10 text-gray-700">
                    {filteredPosts.length > 0 ? (
                        <>По запросу <strong>{inputValue}</strong> найдено результатов: {filteredPosts.length}</>
                    ) : (
                        <>По запросу <strong>{inputValue}</strong> ничего не найдено</>
                    )}
                </span>
            )}
            
            <SkeletonWrapper count={3} height={250} show={allPosts.length===0}>
                <Posts data={inputValue === '' ? allPosts : filteredPosts}/>
            </SkeletonWrapper>

            {commentId && <CommentPopup postId={Number(commentId)}/>}
            <div ref={observerRef} style={{ height: 1 }} />
            <ScrollToTopButton/>
        </div>
    );
}

export default MainPage;