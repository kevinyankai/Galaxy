// 千叶核心文件
import http from '../vmeitime-http/interface.js'

var _self;

export default {
	install: function(Vue) {
		_self = Vue.prototype;
	},
	request(url, data, method) {
		http.config.baseUrl = _self.$store.state.siteUrl;
		http.config.method = method || "POST";
		//设置请求前拦截器
		// http.interceptor.request = (config) => {
		// 	config.header = {
		// 		"token": _self.$store.state.sessionid,
		// 	}
		// }
		Object.assign(data, {
			'__sid': _self.$store.state.sessionid
		});
		Object.assign(data, {
			'__ajax': "json"
		});
		return http.request({
			url: url,
			data,
		});

	}

}
