module.exports = {
	// 如: api 基础路径地址, 在项目中使用组合的方式组合出 api 路径，便于后期 api 的接口更换及维护
	apiServer: 'https://uniapp.dcloud.io/',
	// 如 : 其他一些公共的变量及函数
	myfun: function() {
		console.log('常用函数扩展示例');
	},
	isWechat: function() {		// 判断是否是微信内置浏览器
		return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
	},
	getUrlParam(paramName) {	// 获取地址栏指定参数
		return decodeURIComponent((new RegExp('[?|&]' + paramName + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1]
			.replace(/\+/g, '%20')) || null
	},
}
