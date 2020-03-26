import * as types from "./actionTypes";
import * as authorsApi from "../../api/authorsApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorsApi
      .getAuthors()
      .then(authors => {
        dispatch({ type: types.LOAD_AUTHORS_SUCCESS, authors });
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
