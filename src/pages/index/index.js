import wepy from 'wepy';
import deepClone from 'clone';
import pageBaseMixin from '../../mixins/page-base-mixin.js';
import initData from './data.js';

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
}
