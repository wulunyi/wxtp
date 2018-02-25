import urlConfig from './request.url';

/**
 * 登录
 * @param {string} code wx.login 的返回值
 */
export function login(code) {
  return {
    url: urlConfig.login,
    method: 'POST',
    data: {
      code
    }
  };
}
