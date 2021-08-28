import Vue from 'vue'; // 公共引入css,js
import Message from '@u/message';
// 图片懒加载，使用于大图、列表图
import VueLazyload from 'vue-lazyload';
import md5 from 'js-md5';
import sha1 from 'js-sha1';

import '@u/filter';
import '@u/component';
import '@/directive';
import '@config/external';

Vue.prototype.$bus = new Vue(); // Event Bus

Vue.prototype.$md5 = md5;
Vue.prototype.$sha1 = sha1;

Vue.prototype.$message = Message;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://cloudpush.ss.bscstorage.com/1627717025346336574',
  loading: 'http://cloudpush.ss.bscstorage.com/16268396753111461626839675346',
  attempt: 2,
  adapter: {
    // error(config: {}) {
    //   config['el'].style.maxWidth = '268px'
    //   config['el'].style.maxHeight = '268px'
    // }
  }
});
