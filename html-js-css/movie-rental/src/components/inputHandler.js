import { makeRequest } from "./makeRequest.js";
import { clearSearchRes } from "../helpers/clearSearchRes.js";
import { addHistoryTag } from "../helpers/addHistoryTag.js";
import { preventDuplicateTags } from "../helpers/preventDuplicateTags.js";
import { generateHistory } from "../app/generateHistory.js";
import { cache } from "../index.js";

export const inputHandler = event => {
  let movie = document.getElementById("findFilm");

  let movieValue = movie.value;

  let cachedKey = movieValue.toLocaleLowerCase().replace(/\s/g, "");

  if (movieValue) {
    if (!cache.get(cachedKey)) {
      addHistoryTag(movieValue);
      //request
      makeRequest(movie.value).then(r => {
        cache.set(cachedKey, r);
        localStorage.setItem(
          "cache",
          JSON.stringify(Array.from(cache.entries()))
        );
        localStorage.setItem("result", JSON.stringify(r));
        localStorage.setItem("movie", movieValue);
        localStorage.setItem(
          "history",
          document.querySelector(".searchHistory").innerHTML
        );
        generateHistory(r);
      });
    } else {
      preventDuplicateTags(document.querySelector(".searchHistory"));
      clearSearchRes();
      generateHistory(cache.get(cachedKey));
    }
  }
};
