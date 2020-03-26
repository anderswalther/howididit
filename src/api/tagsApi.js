import { handleError, handleResponse } from "./apiUtils";
import config from "../Constants";

const baseUrl = config.url.API_URL + "/tags/";

export function getTags() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
