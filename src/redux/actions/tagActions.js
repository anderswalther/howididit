import * as types from "./actionTypes";
import * as tagsApi from "../../api/tagsApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadTags() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return tagsApi
      .getTags()
      .then(tags => {
        dispatch({ type: types.LOAD_TAGS_SUCCESS, tags });
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
