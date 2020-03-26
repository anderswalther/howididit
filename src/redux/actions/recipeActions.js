import * as types from "./actionTypes";
import * as recipeApi from "../../api/recipeApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadRecipes() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return recipeApi
      .getRecipes()
      .then(recipes => {
        dispatch({ type: types.LOAD_RECIPES_SUCCESS, recipes });
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
