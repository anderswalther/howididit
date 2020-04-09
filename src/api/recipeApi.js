import { handleError, handleResponse } from "./apiUtils";
import config from "../Constants";

const baseUrl = config.url.API_URL + "/recipes/";
const queryUrl = config.url.API_URL + "/recipes?q=";

export function getRecipes() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getRecipe(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export function saveRecipe(recipe) {
  return fetch(baseUrl + (recipe.id || ""), {
    method: recipe.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(recipe)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function searchRecipes(queryString) {
  return fetch(queryUrl + queryString)
    .then(handleResponse)
    .catch(handleError);
}
