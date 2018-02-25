/**
 * 创建服务的库
 */
import wepy from 'wepy';
import * as reqConfig from './request.config';
import * as judgeUtils from './request.judge.utils';
import {judge, pickUp} from '@jt/promise-operators';

export default function request (apiName, ...params) {
  const { url, method = 'GET', data, options = {needSession: true} } = reqConfig[apiName](...params);

  return wepy.request({
    options,
    url: url,
    data: data,
    method: method,
    timeout: 10000
  });
}

/**
 * 拆除微信封装
 * @param {*} params apiName, 以及其它需要的参数
 */
export function judgeWxReq(apiName, ...params) {
  return (
    request(apiName, ...params)
    .then(judge(judgeUtils.reqIsOk))
    .then(pickUp(res => res.data.data))
  );
}
