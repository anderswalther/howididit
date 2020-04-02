import { combineReducers } from "redux";
import tags from "./tagsReducer";
import authors from "./authorsReducer";
import recipes from "./recipeReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducers = combineReducers({
  tags: tags,
  authors: authors,
  recipes: recipes,
  apiCallsInProgress: apiCallsInProgress
});

export default rootReducers;
