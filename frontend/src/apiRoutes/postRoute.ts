export const POST_ROUTE = {
    ADD_POST : '/posts/',
    GET_POST : (authorId:string) => `/user/${authorId}`,
    EDIT_POST : (postId:string) => `/posts/${postId}`,
    DELETE_POST : (postId:string) => `/posts/${postId}`
}