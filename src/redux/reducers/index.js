import { combineReducers } from "redux";
import tags from "./tagsReducer";
import authors from "./authorsReducer";

const rootReducers = combineReducers({ tags: tags, authors: authors });

export default rootReducers;
