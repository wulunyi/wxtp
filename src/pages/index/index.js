import wepy from 'wepy';
import deepClone from 'clone';
import pageBaseMixin from '../../mixins/page-base-mixin.js';
import initData from './data.js';
import {authGet} from '@jt/wepy-authget';
import QQMapWX from '../../mapsdk/qqmap-wx-jssdk';

let qqmapsdk;

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '打车',
    navigationBarTextStyle: 'black', // 导航栏标题颜色，仅支持 black/white
    navigationBarBackgroundColor: '#fff', // 导航栏背景颜色，如"#000000"
    backgroundColor: '#ffffff', // 窗口的背景色
    backgroundTextStyle: 'dark', // 下拉背景字体、loading 图的样式，仅支持 dark/light
    enablePullDownRefresh: false, // 是否开启下拉刷新，详见页面相关事件处理函数。
    onReachBottomDistance: 50, // 页面上拉触底事件触发时距页面底部距离，单位为px
    usingComponents: {
      'wxc-flex': '../../packages/@minui/wxc-flex/dist/index'
    }
  }

  mixins = [pageBaseMixin];

  data = deepClone(initData);

  onLoad(params, data) {
    qqmapsdk = new QQMapWX({
      key: 'GTSBZ-QYLKU-PRBVV-B65XJ-OY3WK-SBBO5'
    });

    authGet('getLocation', (err, location) => {
      if (err) {
        return console.log('获取定位失败');
      }

      const {latitude, longitude} = location;

      this.updateData({
        latitude, 
        longitude
      });
      console.log(location);
    });
  }

  onReady() {
    qqmapsdk.search({
      keyword: '酒店',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  }
}
