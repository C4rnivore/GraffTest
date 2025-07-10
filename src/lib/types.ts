// Props
export type SearchbarProps = {
    onInputChange : (value:string) => void
}

export type DebouncedInputProps = {
    delay: number,
    callback: (value: string) => void
}

export type PostsProps = {
    data: Array<PostDTO>
}

export type CommentPopupProps = {
    postId: number
}


// DTOs
export type PostDTO = {
    id:number,
    userId:number,
    title:string,
    body:string
}

export type CommentDTO = {
    id:number,
    postId:number,
    name:string,
    email:string,
    body:string
}

export type UserDTO = {
    id:number,
    name:string,
    username:string,
    email:string,
    addres:{
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}
