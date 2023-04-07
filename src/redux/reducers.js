import {
    GET_POSTS_SUCESS,
    GET_POSTS_FAILURE,
    GET_POSTS_REQUEST,

    FETCH_MORE_POSTS_REQUEST,
    FETCH_MORE_POSTS_SUCESS,
    FETCH_MORE_POSTS_FAILURE,

    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,

    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
} from "../actions/actions";

const initialState = {
    posts: [],
    offset: 0,
    loading: false,
    error: null
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {

        // * read
        case GET_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_POSTS_SUCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_POSTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case FETCH_MORE_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_MORE_POSTS_SUCESS:
            return {
                ...state,
                loading: false,
                posts: [...state.posts, ...action.payload],
                offset: state.offset + 10
            };
        case FETCH_MORE_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };



        // * create
        case CREATE_POST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, action.payload],
                loading: false
            };
        case CREATE_POST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        // * update
        case UPDATE_POST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_POST_SUCCESS:
            const updatedPosts = state.posts.map(post => post.id === action.payload.id ? action.payload : post)
            return {
                ...state,
                posts: updatedPosts,
                loading: false
            };
        case UPDATE_POST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        // * delete
        case DELETE_POST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DELETE_POST_SUCCESS:
            const deletedPosts = state.posts.filter(post => post.id !== action.payload)
            return {
                ...state,
                posts: deletedPosts,
                loading: false
            };
        case DELETE_POST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default postsReducer;