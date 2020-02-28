import { tagAndRequest } from "./tagAndRequest.js";
import { tagClickHandler } from "./tagClickHandler.js";
import { inputHandler } from "./inputHandler.js";
import { clearButtonChange } from "../helpers/clearButtonChange.js";
import { debounce } from "../helpers/debounce.js";

let findFilm, searchHistory, searchLine, searchForm, clearButton;

export const ready = () => {
  findFilm = document.getElementById("findFilm");
  searchHistory = document.querySelector(".searchHistory");
  searchLine = document.getElementsByClassName("search").item(0);
  searchForm = document.getElementsByClassName("searchForm").item(0);

  clearButton = document.getElementById("clearButton");

  let controller = new AbortController();

  findFilm.addEventListener("keydown", tagAndRequest);
  findFilm.addEventListener("input", debounce(inputHandler, 400));
  findFilm.addEventListener("input", function() {
    controller.abort();
  });

  [].forEach.call(searchHistory.childNodes, function(elem) {
    tagClickHandler(elem, searchHistory);
  });

  findFilm.addEventListener("input", () => {
    if (findFilm.value) {
      clearButton.style.display = "inline";
    } else {
      clearButton.style.display = "none";
    }
    if (!searchLine.classList.contains("search_active")) {
      searchLine.classList.add("search_active");
    }
  });

  clearButton.addEventListener("click", () => {
    findFilm.value = "";
    findFilm.focus();
    clearButtonChange(clearButton);
  });

  ["mouseover", "mouseout"].forEach(mouseEvent => {
    searchForm.addEventListener(mouseEvent, () => {
      if (findFilm.value) {
        clearButtonChange(clearButton);
      }
    });
  });
};
