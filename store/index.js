import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		sessionid: "",
		userinfo:{},
		member:{},
		//访问地址
		siteUrl :"",
		//图片地址
		staticUrl:"",
		//升级地址
		upgradeUrl : ""
	},
	mutations: {
		login(state, loginData) {
			// state.userName = loginData.userinfo.userName || '匿名用户';
			state.hasLogin = true;
			state.userinfo = loginData.userinfo;
			state.sessionid = loginData.sessionid;
			
			uni.setStorage({ //将用户信息保存在本地  
				key: 'hasLogin',
				data: true
			});
			uni.setStorage({ 
				key: 'sessionid',
				data: loginData.sessionid
			})
			
		},

		//登录保存用户扩展信息
		loginExt(state, data){
			state.member = data.member;
		},
		logout(state) {
			state.userName = "";
			state.userinfo = {};
			state.hasLogin = false;
			state.sessionid = "";
			state.member={};
			uni.removeStorage({
				key: 'hasLogin'
			});
			uni.removeStorage({
				key: 'sessionid'
			});
		},
		setSessionId(state,sid){
			state.sessionid = sid;
		},
		setUserinfo(state,user){
			state.userinfo = user;
			state.userName = user.userName || '匿名用户';
		},
		setSiteUrl(state,url){
			state.siteUrl = url;
		},
		setStaticUrl(state,url){
			state.staticUrl = url;
		},
		setUpgradeUrl(state,url){
			state.upgradeUrl = url;
		}
	},
	actions: {

	}
})

export default store
