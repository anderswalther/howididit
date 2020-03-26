import { handleError, handleResponse } from "./apiUtils";
import config from "../Constants";

const baseUrl = config.url.API_URL + "/users/";

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
