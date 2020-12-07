var _self;

// 微信小程序参数
const miniappid = "wx98394f5fac8e3bd1";
const minisecret = "d1946b107c06c87c476e03a6974bae66";

export default {
	install: function(Vue) {
		_self = Vue.prototype;
	},
	async getOpenId(code) {
		let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + miniappid + '&secret=' + minisecret + '&js_code=' +
			code +
			'&grant_type=authorization_code';
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: 'GET',
				success: result => {
					resolve({
						"openid": result.data.openid,
						"session_key": result.data.session_key
					});
				},
				fail: err => {
					reject(null);
				} //失败
			});
		});
	}
}
