/**
 * Напишите функцию reduceMap(fn, input), создающую новый
 * массив с результатами вызова функции fn на каждом
 * элементе массива input.
 *
 * Для реализации функции используйте reduce.
 *
 * Пример:
 * reduceMap(x => x * 2, [1, 2, 3]); // [2, 4, 6]
 *
 * @param {Function} fn    функция-маппер
 * @param {*[]}      input массив значений
 */
export function reduceMap(fn, input) {
  return input.reduce((newArr, elem) => [...newArr, fn(elem)], []);
}

/**
 * Напишите функцию reduceFilter(fn, input), создающую новый
 * массив из значений массива input, удовлетворяющих
 * проверке fn.
 *
 * Для реализации функции используйте reduce.
 *
 * @param {Function} fn    функция-предикат
 * @param {*[]}      input массив значений
 */
export function reduceFilter(fn, input) {
  return input.reduce((newArr, elem) => {
    if (fn(elem)) {
      return [...newArr, elem];
    }
    return newArr;
  }, []);
}
