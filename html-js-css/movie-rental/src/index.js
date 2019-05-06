import {ready} from './components/ready.js';
import { generateHistory } from './app/generateHistory.js';
import { clearSearchRes } from './helpers/clearSearchRes.js';


export let cache = new Map();

if (localStorage.length > 0) {
  clearSearchRes();
  findFilm.value = localStorage.getItem('movie');
  generateHistory(JSON.parse(localStorage.getItem('result')));
  cache = new Map(JSON.parse(localStorage.getItem('cache')));
  document.querySelector('.searchHistory').innerHTML = localStorage.getItem('history');
}

document.addEventListener('DOMContentLoaded', ready);
