/**
 * Напишите функцию meanMode(numbers), принимающую массив чисел numbers
 * и возвращающую true, если среднее значение числового ряда равно
 * числу (или любому из чисел), встречающемуся чаще остальных. Иначе
 * вернуть false.
 *
 * Если есть несколько чисел, встречающихся одинаковое количество раз,
 * и чаще всех остальных, считать входящий массив невалидным и
 * возвращать false.
 *
 * Пример:
 * meanMode([1]) === true
 * meanMode([4, 4, 4, 6, 2]) === true
 * meanMode([1, 2, 3]) === false
 * meanMode([1, 1, 1, 2, 5]) === false
 * meanMode([]) === false
 *
 * Больше примеров в тестах.
 *
 * @param  {number[]} numbers массив целых положительных чисел.
 * @return {boolean}
 */
function countMean(arr) {
  return arr.reduce((sum, elem) => sum + elem, 0) / arr.length;
}

function findMode(arr) {
  let mostFreqValue = 0;

  const arrMap = arr.reduce((newMap, elem) => {
    const mapElem = newMap.get(elem);

    newMap.set(elem, mapElem ? mapElem + 1 : 1);
    if (newMap.get(elem) > mostFreqValue) {
      mostFreqValue = newMap.get(elem);
    }
    return newMap;
  }, new Map());

  let modeCount = 0;

  let modeValue = 0;

  arrMap.forEach((value, key) => {
    if (value === mostFreqValue) {
      modeCount += 1;
      modeValue = key;
    }
  });
  return modeCount > 1 ? false : modeValue;
}

export function meanMode(numbers) {
  return (!numbers.length) ? false : findMode(numbers) === countMean(numbers);
}
