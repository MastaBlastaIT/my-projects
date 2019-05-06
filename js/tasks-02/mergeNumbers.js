/**
 * Напишите функцию mergeNumbers(number), складывающую
 * все цифры числа number до тех пор, пока не получится
 * однозначный результат.
 *
 * Пример:
 * mergeNumbers(1) === 1
 * mergeNumbers(10001) === 2
 * mergeNumbers(15334232) === 5
 * mergeNumbers(50349814743854) === 2
 *
 * @param number
 */
function sumDigit(num) {
  return num.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
}

export function mergeNumbers(number) {
  if (number < 10) {
    return number;
  }
  let x = number;

  do {
    x = sumDigit(x);
  }
  while (x > 9);
  return x;
}
