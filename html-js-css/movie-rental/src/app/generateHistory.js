export const generateHistory = (resp) => {
  let loader = document.querySelector('.loader');

  loader.classList.remove('loaderAnimation');
  let searchLine = document.getElementsByClassName('search').item(0);

  let footer = document.getElementById('footer');

  const ending = (c) => {
    let res = '';
    if (c >= 10 && c <= 20) {
      res = 'ов';
    } else {
      if (c % 10 === 1) {
        res = '';
      } else if (c % 10 >= 2 && c % 10 <= 4) {
        res = 'а';
      } else {
        res = 'ов';
      }
    }
    return res;
  };
  if (resp.error) {
    if (searchLine.classList.contains('search_active_hasResult')) {
      searchLine.classList.remove('search_active_hasResult');
      footer.classList.remove('hasResultFooter');
    }
    searchLine.classList.add('search_active_hasNoResult');
    console.error(resp.error);
  } else {
    if (!(searchLine.classList.contains('search_active_hasResult'))) {
      searchLine.classList.add('search_active_hasResult');
      footer.classList.add('hasResultFooter');
    }
    document.querySelector('.posResult').textContent = `Найдено ${resp.count} фильм${ending(resp.count)}`;
    resp.results.forEach(m => {
      let card = document.createElement('div');
      card.classList.add('filmData');
      card.appendChild(document.createElement('div'));
      card.firstChild.classList.add(`${m.Poster === 'N/A' ? 'descriptionReady' : 'dataLoaded'}`);
      card.firstChild.innerHTML = `<div class='blurBlock'></div>

                  <img class='filmImg' src='${m.Poster !== 'N/A' ? m.Poster : ''}'>

                  <div class='filmName'>
                    <span>${m.Title}</span>
                  </div>

                  <div class='filmGenreAndYear'>
                    <div class='filmGenre'>
                      <span></span>
                    </div>

                    <div class='filmYear'>
                      <span>${m.Year}</span>
                    </div>
                  </div>`;
      card.addEventListener('click', () => {
        window.open(`https://www.imdb.com/title/${m.imdbID}/`);
      });

      let result = document.querySelector('.resultFilms');

      result.appendChild(card);
    });
  }
};
