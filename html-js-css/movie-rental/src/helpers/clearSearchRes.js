export const clearSearchRes = () => {
  let searchRes = document.querySelector('.resultFilms');

  let searchLine = document.getElementsByClassName('search').item(0);

  if (searchLine.classList.contains('search_active_hasResult')) {
    searchLine.classList.remove('search_active_hasResult');
    footer.classList.remove('hasResultFooter');
  } else if (searchLine.classList.contains('search_active_hasNoResult')) {
    searchLine.classList.remove('search_active_hasNoResult');
  }
  searchRes.innerHTML = '';
};
