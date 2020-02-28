import { clearSearchRes } from "../helpers/clearSearchRes.js";

export async function makeRequest(searchString) {
  clearSearchRes();
  try {
    let loader = document.querySelector(".loader");
    loader.classList.add("loaderAnimation");
    const data = await fetch(
      `http://www.omdbapi.com/?apikey=f2bbfde5&type=movie&s=${searchString}`
    ).then(r => {
      return r.json();
    });
    return data.Response === "True"
      ? {
          count: data.Search.length,
          results: data.Search
        }
      : {
          error: data.Error
        };
  } catch (error) {
    return {
      error
    };
  }
}
