import type { RefObject } from "react"
import { useEffect } from "react"

export const useInfiniteScroll = (
    observerRef: RefObject<HTMLDivElement | null>,
    callback: () => void,
    trigger:any,
    rootMargin: string = '100px'
) => {
    useEffect(() => {
        const node = observerRef.current
        if (!node) return

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (entry.isIntersecting) {
                callback()
                }
            },
            {rootMargin: rootMargin}
        )

        observer.observe(node)

        return () => {
            if (node) observer.unobserve(node)
        }

    }, [observerRef, callback, rootMargin, trigger])
}