# Функции. Объекты. Массивы
## [anagram](./anagram.js)
Напишите функцию anagram(first, second), определяющую,
являются ли переданные строки first и second анаграммами.

Пример:  
anagram('просветитель', 'терпеливость') === true

@param  {string} first первая строка  
@param  {string} second вторая строка  
@return {boolean}

## [customBind](./customBind.js)
Напишите функцию customBind(func, context, ...args),
дублирующую функциональность Function.prototype.bind

Пример:  
const func = function (argA, argB) { return [this, argA, argB] };  
const binded = customBind(func, { a: 'a' }, 'b');

binded('c'); // [{ a: 'a' }, 'b', 'c']

@param  {Function} func передаваемая функция  
@param  {\*}        context контекст  
@param  {\*[]}      args массив аргументов  
@return {Function} функция с нужным контекстом

## [getIntersection](./getIntersection.js)
Напишите функцию getIntersection(first, second), возвращающую
массив из общих значений массивов first и second.

Результирующий массив должен быть отсортирован по возрастанию.

Пример:  
getIntersection([1, 3, 5, 7, 9], [1, 2, 3, 4]); //  [1, 3]  
getIntersection([1, 1, 2], [2, 1, 1, 1]); // [1, 1, 2]  

@param  {number[]} first исходные массивы  
@param  {number[]} second исходные массивы  
@return {number[]} массив значений, отсортированный по возрастанию  

## [getUnique](./getUnique.js)
Напишите функцию getUnique(input), возвращающую новый массив,
состоящий из уникальных значений массива input. Результирующий
массив должен быть отсортирован по возрастанию.

Не использовать Set().

Пример:  
getUnique([1, 1, 2, 6, 3, 6, 2]); // [1, 2, 3, 6]

@param  {number[]} input исходный массив  
@return {number[]} массив уникальных значений, отсортированный по возрастанию

## [isIsomorphic](./isIsomorphic.js)
Напишите функцию isIsomorphic(left, right), определяющую,
являются ли строки left и right изоморфными.

Две строки называются изоморфными, если в строке A можно заменить
символы таким образом, чтобы получилась строка B.

Каждый конкретный символ может заменяться только на один конкретный
символ, в том числе на самого себя. При этом все вхождения символа N
могут быть заменены только на символ M.

Порядок символов должен остаться неизменным.

Пример:  
isIsomorphic('egg', 'foo') === true  
isIsomorphic('foo', 'bar') === false

@param  {string} left  
@param  {string} right  
@return {boolean}

## [meanMode](./meanMode.js)
Напишите функцию meanMode(numbers), принимающую массив чисел numbers
и возвращающую true, если среднее значение числового ряда равно
числу (или любому из чисел), встречающемуся чаще остальных. Иначе
вернуть false.

Если есть несколько чисел, встречающихся одинаковое количество раз,
и чаще всех остальных, считать входящий массив невалидным и
возвращать false.

Пример:  
meanMode([1]) === true  
meanMode([4, 4, 4, 6, 2]) === true  
meanMode([1, 2, 3]) === false  
meanMode([1, 1, 1, 2, 5]) === false  
meanMode([]) === false

@param  {number[]} numbers массив целых положительных чисел.  
@return {boolean}

## [mergeNumbers](./mergeNumbers.js)
Напишите функцию mergeNumbers(number), складывающую
все цифры числа number до тех пор, пока не получится
однозначный результат.

Пример:  
mergeNumbers(1) === 1  
mergeNumbers(10001) === 2  
mergeNumbers(15334232) === 5  
mergeNumbers(50349814743854) === 2

@param number

## [reduceMap](./mightyReduce.js)
Напишите функцию reduceMap(fn, input), создающую новый
массив с результатами вызова функции fn на каждом
элементе массива input.

Для реализации функции используйте reduce.

Пример:  
reduceMap(x => x * 2, [1, 2, 3]); // [2, 4, 6]

@param {Function} fn    функция-маппер  
@param {\*[]}      input массив значений

## [reduceFilter](./mightyReduce.js)
Напишите функцию reduceFilter(fn, input), создающую новый
массив из значений массива input, удовлетворяющих
проверке fn.

Для реализации функции используйте reduce.

@param {Function} fn    функция-предикат  
@param {\*[]}      input массив значений
