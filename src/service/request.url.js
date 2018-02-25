const ENV = 'pro';
const BASEURL_PREFIX = {
  server1: {
    pro: 'a',
    dev: 'http://139.199.94.238'
  }
};

function createUrl(server, pathname, env = ENV) {
  // url: prefix + pathname
  return `${BASEURL_PREFIX[server][env]}/${pathname}`;
}

export default {
  get login() {
    return createUrl('server1', 'login', 'dev');
  }
};
