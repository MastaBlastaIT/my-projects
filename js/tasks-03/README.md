# Прототипное наследование. Асинхронность
## [flatMap](./flatMap.js)
Напишите функцию, добавляющую полифил метода flatMap
к прототипу Array. Полифил должен полностью реализовывать
метод (обратите внимание на передачу контекста, индексы и так далее).

Описание метода:  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap

@param  {\*} ArrayConstructor конструктор Array  
@return {Array} Тот же конструктор с добавленным методом flatMap

## [numberAndString](./numberAndString.js)
Создайте класс, обладающий следующим поведением:  
const values = ['hello', 'javascript', 'world'];  
const instances = values.map(str => new NumberAndString(str));

const resultConcatenation = instances.join(' '); // == 'hello javascript world'  
const resultCharCount = instances.reduce((obj, memo) => memo + obj, 0); // == 20

@class NumberAndString  
@param {String} str - initial value

## [promiseAll](./promiseAll.js)
Напишите функцию promiseAll(promises), поведение
которой аналогично поведению Promise.all(promises).

@param  {Promise[]} promises массив с исходными промисами  
@return {Promise}

## [promiseRace](./promiseRace.js)
Напишите функцию promiseRace(promises), поведение
которой аналогично поведению Promise.race(promises).

@param  {Promise[]} promises массив с исходными промисами  
@return {Promise}

## [rejectOnTimeout](./rejectOnTimeout.js)
Напишите функцию rejectOnTimeout(promise, ms), возвращающую
промис, отражающий поведение исходного promise, либо
отменяющийся со значением 'timeout_error', если исходный
промис не завершился в течение ms миллисекунд.

Не использовать Promise.race.

@param  {Promise} promise исходный промис  
@param  {Number}  ms время для timeout в миллисекундах  
@return {Promise} промис с нужным поведением
