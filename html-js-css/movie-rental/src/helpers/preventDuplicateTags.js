import { addHistoryTag } from '../helpers/addHistoryTag.js';

export const preventDuplicateTags = (history) => {
  let movie = document.getElementById('findFilm');

  let movieValue = movie.value;

  let cachedKey = movieValue.toLocaleLowerCase().replace(/\s/g,'');
  let flag = false;
  history.childNodes.forEach(elem => {
    if (elem.textContent.toLocaleLowerCase().replace(/\s/g, '').includes(cachedKey)) {
      flag = true;
    }
  });
  if (!flag) {
    addHistoryTag(movieValue);
  }
};
