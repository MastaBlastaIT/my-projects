# Основы JavaScript
## capitalize
Напишите функцию capitalize(input), возвращающую копию строки input,
в которой каждое слово начинается с заглавной буквы.

"Слово" в данном контексте - последовательность юникод-символов из группы "letters".
В целях упрощения в тестовых кейсах будут использоваться только строки из латинских букв
и кириллицы. Слова с дефисами ("Что-то", "кто-либо" и т.д.) считаются одним словом.

capitalize('А роза упала на лапу Азора') === 'А Роза Упала На Лапу Азора'<br/>
capitalize('Use the force, Luke') === 'Use The Force, Luke'

@param  {string} input строка с произвольным предложением.<br/>
@return {string}

## getMinMax
Напишите функцию getMinMax(input), принимающую строку input,
и ищущую в ней максимальное и минимальное числа.

Числа в строке выделяются пробелами или знаками препинания.

Пример:  
getMinMax('1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028');<br/>
{ min: -1028, max: 15 }

getMinMax('"To Infinity and beyond", - repeated Buzz Lightyear 4 times in a row')<br/>
{ max: Infinity, min: 4 }

@param  {string} input входная строка<br/>
@return {{min: number, max: number}} объект с минимумом и максимумом

## limitCalls
Напишите функцию limitCalls(fn, maxCalls), принимающую функцию fn,
и возвращающую новую функцию, которую можно вызвать не более
указанного в maxCalls количества раз.

В целях упрощени, входящая функция не принимает никаких аргументов, работу с
аргументами можно не учитывать.

Пример:  
const limitedLog = limitCalls(() => console.log('log'), 2); <br/>
limitedLog(); // 'log'<br/>
limitedLog(); // 'log'<br/>
limitedLog(); // undefined<br/>
limitedLog(); // undefined

@param  {Function} fn функция<br/>
@param  {number} maxCalls максимальное количество вызовов<br/>
@return {Function}

## multiple
Напишите функцию multiple(a, b), умножающую число a на число b,
не используя оператор "\*" или метод Math.imul.

Пример:  
multiple(1, 1) === 1<br/>
multiple(1, 2) === 2<br/>
multiple(0, 0) === 0

@param  {number} a любое целое число<br/>
@param  {number} b любое целое число<br/>
@return {number}

## passwordCheck
Напишите функцию passwordCheck(password), принимающую строку password
и проверяющую её на сложность. Если сложность достаточна, вернуть true,
иначе - false.

Достаточной сложность считается, если в строке:
- Есть хотя бы одно число
- Есть хотя бы две буквы латинского алфавита в разных регистрах
- Есть хотя бы один символ из ряда ! ? . , + - * / =
- Содержит не менее 10 символов

Пример:  
passwordCheck('Nagibator777') === false<br/>
passwordCheck('password') === false<br/>
passwordCheck('This is the 7th password I have come up with!') === true

@param  {string} password пароль<br/>
@return {boolean}

## rle
Напишите функцию rle(input), реализующую примитивное RLE-сжатие входящей строки input.
Подробнее об RLE: https://ru.wikipedia.org/wiki/Кодирование_длин_серий

Входящая строка сооттветствует regex паттерну /^[A-Z]+$/

Пример:  
rle('AAAB') === 'A3B'<br/>
rle('BCCDDDEEEE') === 'BC2D3E4'

@param  {string} input<br/>
@return {string}

## sum
Напишите функцию sum(x), вычисляющую суммы подобным образом:  
sum() === 0<br/>
sum(1)(2)() === 3<br/>
sum(1)(2)(3)() === 6

Возможно чуть более понятная нотация для любителей функциональщины:  
sum :: Number -> sum<br/>
sum :: void -> Number

@param {\*} x число или undefined<br/>
@returns а это уже сами решите
