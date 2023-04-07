import { api } from "../services/api";
export const GET_POSTS_REQUEST = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCESS = "GET_POSTS_SUCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

export const FETCH_MORE_POSTS_REQUEST = "FETCH_MORE_POSTS_REQUEST";
export const FETCH_MORE_POSTS_SUCESS = "FETCH_MORE_POSTS_SUCESS";
export const FETCH_MORE_POSTS_FAILURE = "FETCH_MORE_POSTS_FAILURE";

export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";


// get
export const getPosts = () => {
    return async (dispatch) => {
        dispatch({ type: GET_POSTS_REQUEST })
        await api.get(`careers`)
            .then((response) => {
                const data = response.data.results;
                // check if method returns data and then dispatch an action
                if (data) {
                    dispatch({
                        type: GET_POSTS_SUCESS,
                        payload: data
                    });

                } else {
                    console.log("Error fetching posts from API");
                }
            }).catch((error) => {
                dispatch({ type: GET_POSTS_FAILURE, payload: error.message })
            });

    }
};
//* handling offset
 export const fetchMorePosts = () => {
    return async  (dispatch, getState) => {
      const {offset}  = getState();
      dispatch({ type: FETCH_MORE_POSTS_REQUEST });
      return api.get(`careers/?limit=10&offset=${offset}`)
        .then(response => {
          const newData = response.data;
          dispatch({
            type: FETCH_MORE_POSTS_SUCESS,
            payload: newData
          });
        })
        .catch(error => {
          dispatch({
            type: FETCH_MORE_POSTS_FAILURE,
            payload: error.message
          });
        });
    };
  };

// * create
export const createPost = (data) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_POST_REQUEST });
        try {
            await api.post(`careers/`, data)
            dispatch({ type: CREATE_POST_SUCCESS, payload: data })

        } catch (error) {
            console.log(error.message);
            dispatch({ type: CREATE_POST_FAILURE, payload: error.message })
        }
    }
 }


 // * update
 export const updatePost = (id, data) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_POST_REQUEST});
        try {
                await api.patch(`careers/${id}/`, data);
                dispatch({type: UPDATE_POST_SUCCESS, payload: data});

        } catch (error) {
            console.log(error.message);
            dispatch({type: UPDATE_POST_FAILURE, payload: error.message})
        }
    }
 }

 // * delete
 export const deletePost = (id) => {
    return async (dispatch) => {
        dispatch({type: DELETE_POST_REQUEST});
        try {
                await api.delete(`careers/${id}/`);
                dispatch({type: DELETE_POST_SUCCESS, payload: id});

        } catch (error) {
            console.log(error.message);
            dispatch({type: DELETE_POST_FAILURE, payload: error.message})
        }
    }
 }

 