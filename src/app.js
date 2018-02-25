import wepy from 'wepy';
import 'wepy-async-function';
import 'promise-polyfill';
import initGlobalData from './globaldata.js';
import {judgeWxReq} from './service/request';
import {judge} from '@jt/promise-operators';

export default class extends wepy.app {
  config = {
    pages: [
      'pages/index/index'
      // path
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#FF835A',
      navigationBarTitleText: '打车',
      navigationBarTextStyle: '#fff',
      backgroundColor: '#f4f4f4'
    }
    // tabBar: {
    //   backgroundColor: '#ffffff',
    //   selectedColor: '#FF835A',
    //   color: '#5D5D5D',
    //   borderStyle: 'white',
    //   list: [
    //     // {
    //     //   'pagePath': 'pages/index/index',
    //     //   'text': '首页',
    //     //   'iconPath': 'images/tab/tab_home@2x.png',
    //     //   'selectedIconPath': 'images/tab/tab_hover_home@2x.png'
    //     // }
    //   ]
    // }
  }

  globalData = initGlobalData;

  loginCount = 0;

  loginRetryCount = 0;

  constructor () {
    super();
    this.use('requestfix');
    this.use('promisify');

    // 网络请求拦截器
    this.intercept('request', {
      config (p) {
        return p;
      },

      success (p) {
        return p;
      },

      fail (p) {
        return p;
      },

      complete (p) {
        return p;
      }
    });
  }

  onLaunch({path, query, scene}) {
    // this.preLogin();
  }

  async checkSession() {
    const {session} = this.globalData;

    if (!session) {
      return false;
    }

    try {
      await wepy.checkSession();

      return true;
    } catch (error) {
      return false;
    }
  }

  async login() {
    try {
      const {code} = await wepy.login()
        .then(judge((res) => {
          return res.errMsg === 'login:ok';
        }));

      await judgeWxReq('login', code);

      return true;
    } catch (error) {
      console.log(error);
      console.log('重试登录次数', (this.loginRetryCount++));
      return await this.loginConfirm();
    } finally {
      console.log('登录调用总次数', (++this.loginCount));

      // 清除登录 Promise 的引用
      this.loginPromise = null;
    }
  }

  async loginConfirm() {
    try {
      const {confirm} = await wepy.showModal({
        title: '提示',
        content: '登录异常是否重试',
        confirmText: '重试'
      }).then(judge(res => res.errMsg === 'showModal:ok'));

      if (confirm) {
        return this.login();
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async afterLogin() {
    const isValid = await this.checkSession();

    if (isValid) {
      return true;
    }

    return this.loginPromise ? this.loginPromise : (this.loginPromise = this.login());
  }

  preLogin() {
    this.afterLogin();
  }

  async request() {
    const canNext = await this.afterLogin();

    if (canNext) {
      console.log('下一步');
    } else {
      console.log('取消操作');
    }
  }
}
