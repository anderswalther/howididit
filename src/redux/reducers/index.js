import { combineReducers } from "redux";
import tags from "./tagsReducer";
import authors from "./authorsReducer";
import recipes from "./recipeReducer";

const rootReducers = combineReducers({
  tags: tags,
  authors: authors,
  recipes: recipes
});

export default rootReducers;
