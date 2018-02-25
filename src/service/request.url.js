const ENV = 'pro';
const BASEURL_PREFIX = {
  server1: {
    pro: 'a',
    dev: 'http://139.199.94.238:7001',
    local: 'http://127.0.0.1:7001'
  }
};

function createUrl(server, pathname, env = ENV) {
  // url: prefix + pathname
  return `${BASEURL_PREFIX[server][env]}/${pathname}`;
}

export default {
  get login() {
    return createUrl('server1', 'api/user/userLogin', 'dev');
  }
};
