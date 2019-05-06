/**
 * Напишите функцию getIntersection(first, second), возвращающую
 * массив из общих значений массивов first и second.
 *
 * Результирующий массив должен быть отсортирован по возрастанию.
 *
 * Пример:
 * getIntersection([1, 3, 5, 7, 9], [1, 2, 3, 4]); //  [1, 3]
 * getIntersection([1, 1, 2], [2, 1, 1, 1]); // [1, 1, 2]
 *
 * @param  {number[]} first исходные массивы
 * @param  {number[]} second исходные массивы
 * @return {number[]} массив значений, отсортированный по возрастанию
 */
function sortArr(arr) {
  return arr.sort((a, b) => a - b);
}

function getMap(arr) {
  return arr.reduce((newMap, elem) => newMap.set(elem, newMap.get(elem) ? newMap.get(elem) + 1 : 1), new Map());
}

export function getIntersection(first, second) {
  const firstMap = getMap(first);

  const secondMap = getMap(second);

  let resArr = [];

  firstMap.forEach((value, key) => {
    if (secondMap.has(key)) {
      const minCount = Math.min(value, secondMap.get(key));

      for (let i = 0; i < minCount; i++) {
        resArr = [...resArr, key];
      }
    }
  });
  return sortArr(resArr);
}
