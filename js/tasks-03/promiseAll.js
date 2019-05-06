/**
 * Напишите функцию promiseAll(promises), поведение
 * которой аналогично поведению Promise.all(promises).
 *
 * @param  {Promise[]} promises массив с исходными промисами
 * @return {Promise}
 */
export const promiseAll = promises => new Promise((resolve, reject) => {
  let countDown = promises.length;

  if (!countDown) {
    resolve([]);
  }
  const resultArr = [];

  promises.forEach((p, i) => p
    .then(successRes => {
      resultArr[i] = successRes;
      countDown -= 1;
      if (!countDown) {
        resolve(resultArr);
      }
    })
    .catch(failureRes => {
      reject(failureRes);
    }));
});
