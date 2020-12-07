<script>
	import {
		mapMutations
	} from 'vuex';
	// 服务器`
	const siteUrl = "http://101.37.163.115:8980"; //站点访问地址
	const staticUrl = "http://101.37.163.115:8980"; //图片地址
	const upgradeUrl = "http://101.37.163.115:8980"; //升级检测地址
	// 本地
	// const siteUrl = "http://103.224.250.19:8980"; //站点访问地址
	// const staticUrl = "http://103.224.250.19:8980"; //图片地址
	// const upgradeUrl = "http://103.224.250.19:8980"; //升级检测地址

	export default {
		globalData: {

		},
		onLaunch: async function() {

			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
			const dom = weex.requireModule('dom');
			dom.addRule('fontFace', {
				'fontFamily': "graceIconfont",
				'src': "https://at.alicdn.com/t/font_823462_m4rz0iqup9.ttf"
			});
			// #endif

			//设置访问地址
			this.setSiteUrl(siteUrl);
			this.setStaticUrl(staticUrl);
			this.setUpgradeUrl(upgradeUrl);


			//自动登录
			const hasLogin = uni.getStorageSync('hasLogin');
			const sessionid = uni.getStorageSync('sessionid');
			this.setSessionId(sessionid);

			if (hasLogin) {
				uni.removeStorageSync("hasLogin");
				uni.removeStorageSync("sessionid");

				let res = await this.$qyc.request("/f/login/getLoginUserinfo", {});
				if (res.data.result === "true") {
					this.login(res.data);
					// let member = await this.$qyc.request("/f/work_businesscard/businesscardMember/member", {});
					// if (member.data.result === "true") {
					//     this.loginExt(member.data);
					//     uni.reLaunch({
					//         url: '/pages/card/index',
					//     });
					// }
				}
			}
		},
		methods: {
			...mapMutations(['loginExt', 'login', 'logout', 'setSessionId', 'setSiteUrl', 'setStaticUrl', 'setUpgradeUrl'])
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>
<style lang="scss">
	/* #ifndef APP-PLUS-NVUE */
	//@import "./graceUI/graceUI.css";
	//@import "./graceUI/graceIcons.css";
	/* #endif */
	/* #ifdef APP-PLUS-NVUE */
	//@import "./graceUI/graceWeex.css";

	.grace-icons {
		font-family: graceIconfont;
	}

	/* #endif */
	//@import './common.css';
	/*
如下修改和补充能够保证不修改 GraceUI 框架的核心源码，当 GraceUI 升级时可以直接使用框架核心文件包覆盖旧文件
请根据业务原型或者设计稿规划出自己的 公共样式, 如:
*/
</style>
