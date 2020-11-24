/**
 * get（）--api
 * @param obj 参数 url 地址
 * @returns {*}"x-user-data":uni.getStorageSync('token')
 */
let reqUrl;
if(process.env.NODE_ENV === 'development'){
	//开发环境 本地访问线上的接口修改配置文件的 接口地址
	reqUrl = '/api/';
}else{
	//生产环境 https://suishisheng.cn	
	reqUrl = 'https://www.ucharts.cn';	
}
export function Get(obj, url) {
	return new Promise((resolve, reject) => {
		uni.request({
			header:{
				"Content-Type":"application/x-www-form-urlencoded",
				"X-Session-Id":uni.getStorageSync('token')
			},
			url: reqUrl + url, //仅为示例，并非真实接口地址。
			data: obj,
			method: 'GET',		
			success: (res) => {
				resolve(res);
			},
			fail(err) {
				reject(err);
			}
		});
	})
}
/**
 * post（）--api
 * @param obj 
 * @returns {*}
 */
//https://suishisheng.cn
var id=uni.getStorageSync('uid')
export function Post(obj, url) {
	if(url=='v2/send-sms-code?from=app'){
		console.log(url)
	}else{
		url=url+'?'+'uid='+id
	}
	return new Promise((resolve, reject) => {
		uni.request({
			header:{
				"Content-Type":"application/x-www-form-urlencoded",
				"X-Session-Id":uni.getStorageSync('token')
			},
			url:'/api/'+ url,
			data: obj,
			method: 'POST',
			success: (res) => {
				resolve(res);
			},
			fail(err) {
				reject(err)
			}
		});
	})
}
