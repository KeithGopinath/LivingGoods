import envConfig from 'envConfig'; //eslint-disable-line

const { baseUrl } = envConfig;
const TIMEOUT = 10000;

/**
* @description function to handle the time out error
* @param  {Promise} promise
* @param  {number} timeout
* @param  {string} error
* @return
*/
function timeoutPromise(promise, timeout, error) {
  return new Promise((resolve, reject) => {
    const clearTimeOut = setTimeout(() => {
      reject(error);
    }, timeout);
    promise.then((data) => {
      clearTimeout(clearTimeOut);
      resolve(data);
    }, (data) => {
      clearTimeout(clearTimeOut);
      reject(data);
    });
  });
}

/** @description calls a native fetch method and returns a promise Object
 * @param {string} url
 * @param {string} urlPrefix
 * @returns {Promise}
 */
export const fetchURL = (url, urlPrefix = baseUrl) => timeoutPromise(fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    headers: {
      Accept: 'application/json; charset=UTF-8',
      Authorization: `Bearer ${sessionStorage.token}`,
    },
  }),
), TIMEOUT, 504);

/** @description Sending a GET request to JSON API.
 * doGet method resolves or rejects the promise that is obtained
 * from the fetchURl method
 * @param {string} url
 * @param {string} urlPrefix
 * @returns {object}
 */
export const doGet = (url, urlPrefix = baseUrl) => {
  const fetchData = fetchURL(url, urlPrefix).then((res) => {
    let response = null;
    response = res.json();
    if (res.ok) {
      return response;
    }
    return response.then((error) => { throw error; });
  });
  return fetchData;
};

/** @description Sending a POST request.
 * @param {string} url
 * @param {object} body
 * @param {string} urlPrefix
 * @returns {Promise}
 */
export const doPost = (url, body, urlPrefix = baseUrl) => timeoutPromise(fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${sessionStorage.token}`,
    },
    body: JSON.stringify(body),
  }),
), TIMEOUT, 504)
  .then((res) => {
    let response = null;
    response = res.json();
    if (res.ok) {
      return response;
    }
    return response.then((error) => { throw error; });
  });

/** @description Sending a PUT request.
 * @param {string} url
 * @param {object} body
 * @param {string} urlPrefix
 * @returns {Promise}
 */
export const doPut = (url, body, urlPrefix = baseUrl) => timeoutPromise(fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${sessionStorage.token}`,
    },
    // credentials: 'include',
    body: JSON.stringify(body),
  }),
), TIMEOUT, 504)
  .then((res) => {
    let response = null;
    response = res.json();
    if (res.ok) {
      return response;
    }
    return response.then((error) => { throw error; });
  });

/** @description Sending a DELETE request.
 * @param {string} url
 * @param {object} body
 * @param {string} urlPrefix
 * @returns {Promise}
 */
export const doDelete = (url, body, urlPrefix = baseUrl) => timeoutPromise(fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    method: 'delete',
    headers: {
      // Accept: 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${sessionStorage.token}`,
    },
    // credentials: 'include',
    // body: JSON.stringify(body),
  }),
), TIMEOUT, 504)
  .then((res) => {
    let response = null;
    response = res.json();
    if (res.ok) {
      return response;
    }
    return response.then((error) => { throw error; });
  });

/** @description Sending a POST FILE request* */
export const doPostFile = (url, body, urlPrefix = baseUrl) => timeoutPromise(fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
    },
    body,
  }),
), TIMEOUT, 504)
  .then((res) => {
    let response = null;
    response = res.json();
    if (res.ok) {
      return response;
    }
    return response.then((error) => { throw error; });
  });
