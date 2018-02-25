/**
 * 请求结果处理函数
 */
import _ from 'lodash';

/**
 * 判断微信请求是否成功
 * @param {*} res
 */
export function isWxReqOk (res) {
  return (
    _.isObject(res) &&
    _.isEqual(res.errMsg, 'request:ok') &&
    _.isEqual(res.statusCode, 200)
  );
}

/**
 * 判断请求返回是否成功
 * @param {*} data 微信封装的 data
 */
export function isReqOk(data) {
  return (
    _.isObject(data) &&
    _.isEqual(data.code, 0)
  );
}

/**
 * 整个请求是否 ok
 * @param {*} res wx 请求返回结果
 */
export function reqIsOk(res) {
  return (
    isWxReqOk(res) &&
    isReqOk(res.data)
  );
}
