import { makeRequest } from "./makeRequest.js";
import { clearButtonChange } from "../helpers/clearButtonChange.js";
import { clearSearchRes } from "../helpers/clearSearchRes.js";
import { addHistoryTag } from "../helpers/addHistoryTag.js";
import { generateHistory } from "../app/generateHistory.js";
import { cache } from "../index.js";

export const tagAndRequest = event => {
  let movie = document.getElementById("findFilm");

  let movieValue = movie.value;

  let cachedKey = movieValue.toLocaleLowerCase().replace(/\s/g, "");
  if (event.keyCode === 13) {
    movie.blur();
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
        let history = document.querySelector(".searchHistory");

        let flag = false;
        history.childNodes.forEach(elem => {
          if (
            elem.textContent.toLocaleLowerCase().replace(/\s/g, "") ===
            cachedKey
          ) {
            flag = true;
          }
        });
        if (!flag) {
          addHistoryTag(movieValue);
        }
        clearSearchRes();
        generateHistory(cache.get(cachedKey));
      }
      movie.value = "";
      let button = document.getElementById("clearButton");

      clearButtonChange(button);
    }
  }
};
