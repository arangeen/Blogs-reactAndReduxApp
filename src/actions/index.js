import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  //doing the above 2 lines with lodash chaining
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

//defining a function that will return a function
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

//creating new action creator
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};
