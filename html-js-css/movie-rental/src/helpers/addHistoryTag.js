import { tagClickHandler } from "../components/tagClickHandler.js";

export const addHistoryTag = val => {
  let history = document.querySelector(".searchHistory");

  let tag = document.createElement("a");

  tag.innerHTML = val;
  history.insertBefore(tag, history.firstChild);
  tagClickHandler(tag, history);
};
