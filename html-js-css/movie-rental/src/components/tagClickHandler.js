import { makeRequest } from "./makeRequest.js";
import { generateHistory } from "../app/generateHistory.js";
import { cache } from "../index.js";
import { clearSearchRes } from "../helpers/clearSearchRes.js";

export const tagClickHandler = (node, history) => {
  node.addEventListener("mousedown", e => {
    let cachedKey = node.text.toLocaleLowerCase().replace(/\s/g, "");
    if (e.altKey) {
      history.removeChild(node);
    } else {
      document.getElementById("findFilm").value = "";
      if (!cache.get(cachedKey)) {
        makeRequest(node.text).then(r => {
          cache.set(cachedKey, r);
          localStorage.setItem(
            "cache",
            JSON.stringify(Array.from(cache.entries()))
          );
          localStorage.setItem("result", JSON.stringify(r));
          localStorage.setItem("movie", node.text);
          localStorage.setItem(
            "history",
            document.querySelector(".searchHistory").innerHTML
          );
          generateHistory(r);
        });
      } else {
        clearSearchRes();
        generateHistory(cache.get(cachedKey));
      }
    }
  });
};
