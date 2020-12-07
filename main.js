import '@/static/js/pc'
import Vue from 'vue'
import App from './App'
import './common/style/iconfont.css'
import './style/iconfont.css'

import store from './store'
import qycore from './common/core/qycore.js'
import updater from './common/core/checkUpdater.js'
import wechat from './common/core/wechat.js'

Vue.prototype.$store = store;
Vue.prototype.$qyc = qycore;
Vue.prototype.$updater = updater;
Vue.prototype.$wechat = wechat;

//是否开启调试模式
Vue.prototype.debug_open = true;

Vue.config.productionTip = false

App.mpType = 'app'


Vue.use(qycore);
Vue.use(updater);
Vue.use(wechat);

/**
 * 页面测试的方法, 后期需要删除
 */
import graceUIRequest from './graceUI/jsTools/request.js'
Vue.prototype.gRequest = graceUIRequest;

/* 封装 setData 函数 */
Vue.prototype.setData   = function(data, thisObj){
	for(let k in data){
		thisObj[k] = data[k];
	}
}


const app = new Vue({
     store,
	 ...App
})
app.$mount()
