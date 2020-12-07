<template>
	<view class="content">
		<view class="header">
			<image src="../../static/images/logow.png"></image>
			<view class="pro-title">galaxy</view>
			<view class="pro-seach">
				<input placeholder="Search cid" v-model="keywords" placeholder-style="color:#CCCCCC" />
				<image src="../../static/images/search.png" @click="search"></image>
			</view>
		</view>
		<view class="resource-box">
			<!-- <view class="resource-title"><text class="resource-titleone">Owning data set</text><text class="resource-titletwo">【Filename】</text></view>
			 -->
			<view class="resource-con">
				<view class="left">
					<view class="left-top">
						<view class="left-topt">
							<view class="left-toptl">
								<image src="../../static/images/play.png" class="rotation"></image>
							</view>
							<view class="left-toptr">
								<!-- <view class="left-toptrone">Owning data set</view> -->
								<a :title="basedata.payloadCid"><view class="left-toptrtwo">[{{basedata.fileName}}]</view></a>
								<view class="left-toptrthree">The author</view>
								<view class="left-toptrfour">No lyrics</view>
							</view>
						</view>
						<view class="left-topb">
							<imt-audio autoplay continue :src="audio[now]" @prev="now = now === 0?audio.length-1:now-1" @next="now = now === audio.length-1?0:now+1"></imt-audio>
						</view>
					</view>
					<view class="imRecommend-title">
						<image src="../../static/images/about.png"></image>
						<view>Recommend</view>
					</view>
					<view class="left-top-cell" v-for="(item,index) in celllist" :key=index >
						<view @click="gotodetail(item,index)">
							<audio style="text-align: center" :poster="current.poster" :src="item.path" controls></audio>
							<a :title="item.payloadCid"><view class="left-top-title"><text class="left-top-titlet">{{item.payloadCid}}</text></view></a>
							<!-- <view class="left-top-des"><text>20 downloads</text><text class="text-right">56 plays</text></view> -->
						</view>
					</view>
				</view>
				<view class="right">
					<view class="right-box">
						<view class="right-title"><image src="../../static/images/edit.png"></image>File information</view>
						<view class="right-title right-titleone">CID:</view>
						<a :title="basedata.payloadCid"><view class="right-con right-concid" @click="copy(basedata.payloadCid)">{{basedata.payloadCid}} </view></a>
						<view class="right-title right-titletwo">Miner:</view>
						<view class="right-con">{{basedata.minerId}}</view>
						<view class="right-title right-titlethree">Transaction id:</view>
						<view class="right-con">{{basedata.dealId}}</view>
						<view class="right-title right-titlefour">File size:</view>
						<view class="right-con">{{basedata.fileSize}}</view>
						<view class="right-title right-titlefive">Date:</view>
						<view class="right-con">{{basedata.createTime}}</view>
						<view class="right-title right-titlesix">From the data set:</view>
						<a :title="basedata.curatedDataset" :href="urldataSet"><view class="right-condata" >{{basedata.curatedDataset}}</view></a>
						<a :href='basedata.path' class='downloads-btn'>Downloads</a>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _this;
	import imtAudio from '../../common/imt-audio/imt-audio.vue'
	import uniCopy from '../../common/xb-copy/uni-copy.js'
	export default {
		components: {
			imtAudio
		},
		data() {
			return {
				celllist: [],
				cid: '',
				basedata: '',
				pieceSize: '',
				keywords: '',
				isplay: false,
				percentmusic: 0,
				percentvoice: 30,
				audio: [],
				now: 0,
				current: {
					poster: '../../static/images/music.png',
				},
				urldataSet:'',
			}
		},
		onLoad: function(option) {
			this.cid = option.cid
			//this.firstrequest(option.cid)
		},
		onShow() {
			this.firstrequest(this.cid)
		},
		methods: {
			copy(cid) {
				uniCopy({
					content: cid,
					success: (res) => {
						uni.showToast({
							title: 'Copy succeeded',
							icon: 'none'
						})
					}
				})
			},
			firstrequest(cid) {
				console.log(cid)
				_this = this;
				let data = {
					cid: cid,
				};
				_this.$qyc.request("/f/api/work_linden/getDetailsByCid", data).then(function(res) {
					if (res.data.result === "true") {	
						if(res.data.details.types==1){
							uni.navigateTo({
								url: './videodetail?cid=' + _this.keywords
							})
						}else if(res.data.details.types==2){
							_this.celllist = res.data.about.list //底部图片
							for (var i = 0; i < _this.celllist.length; i++) {
								_this.audio.push(_this.celllist[i].path) //底部图片
							}
							_this.basedata = res.data.details
							_this.urldataSet=res.data.dataSetInfo.url
						}else if(res.data.details.types==3){
							uni.navigateTo({
								url: './imagedetail?cid=' + _this.keywords
							})
						}

					} else {
						_this.keywords = ''
						uni.showToast({
							icon: 'none',
							title: res.data.message
						})
					}
				});
			},
			//点击搜索按钮查询
			search() {
				if (this.keywords == '') {
					uni.showToast({
						icon: 'none',
						title: 'keywords is null'
					})
				} else {
					this.firstrequest(this.keywords)		
				}
			},
			gotodetail(item,index) {
				console.log(this.now,index,this.audio[this.now],this.audio[index])
				this.firstrequest(item.payloadCid)
				this.audio[this.now]=this.audio[index]
				
			},

		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-audio-default {
		min-width: 0rpx !important;
		border: none !important;
	}

	/deep/.uni-audio-right {
		width: 0 !important;
		padding: 0 !important;

	}

	/deep/.uni-audio-left {
		background-color: #FFFFFF !important;
	}

	.content {
		background: #F7F7F7;
		height: 100vh;
	}

	//音乐旋转
	// @-webkit-keyframes rot {
	// 	from {
	// 		-webkit-transform: rotate(0deg);
	// 	}

	// 	to {
	// 		-webkit-transform: rotate(360deg);
	// 	}
	// }
	.rotation {
		animation: rot 6s ease-in-out infinite;
	}

	.header {
		padding: 0 43rpx;
		height: 126rpx;
		background: url(../../static/images/detailtop.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10;

		image {
			margin: 31rpx 0;
			width: 64rpx;
			height: 64rpx;
			vertical-align: middle;
		}

	}

	.pro-title {
		line-height: 126rpx;
		font-size: 22rpx;
		color: #FFFFFF;
		margin: 0 263rpx 0 21rpx;
		display: inline-block;
		vertical-align: middle;
	}

	.pro-seach {
		width: 1033rpx;
		background: #FFFFFF;
		border-radius: 45rpx;
		display: inline-block;
		height: 44rpx;

		image {
			width: 44rpx;
			height: 44rpx;
			margin: 0 !important;
			float: right;
		}
	}

	input {
		width: 950rpx;
		height: 44rpx;
		line-height: 44rpx;
		display: inline-block;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		vertical-align: middle;
		font-size: 22rpx;
		border: none;
		outline-style: none;
		color: #333333;
		margin-left: 20rpx;
	}

	//音乐图
	.left-topb {
		margin-top: 20rpx;
	}

	.music-progress {
		margin: 0 40rpx;
	}

	.palymus-box {
		margin-top: 11rpx;
		justify-content: space-between;
		display: flex;
	}

	.paly-box,
	.volume-box {
		display: inline-block;
		height: 55rpx;
	}

	.volume-box {
		width: 160rpx;
		vertical-align: top;
		line-height: 55rpx;

		image {
			width: 18rpx;
			height: 18rpx;
			margin-right: 6rpx;
			vertical-align: middle;
		}
	}

	.my-progress {
		vertical-align: middle;
		width: 136rpx;
		display: inline-block;
	}

	.left-img,
	.right-img {
		width: 19rpx;
		height: 24rpx;
		margin: 10rpx 45rpx;
	}

	.center-img {
		width: 44rpx;
		height: 55rpx;
	}

	.resource-box {
		margin: 126rpx 200rpx 0 200rpx;
	}

	.resource-title {
		margin-top: 23rpx;
	}

	.resource-titleone {
		padding: 0 11rpx;
		text-align: center;
		width: 162rpx;
		background: #51ADFF;
		border-radius: 4rpx;
		color: #FFFFFF;
		font-size: 18rpx;
		line-height: 25rpx;
		height: 28rpx;
	}

	.resource-titletwo {
		height: 30rpx;
		font-size: 22rpx;
		color: #333333;
		line-height: 30rpx;
	}

	.left,
	.right {
		display: inline-block;
	}

	.left-top {
		margin: 20rpx 0;
		width: 1100rpx;
		height: 660rpx;
		background: #FFFFFF;
	}

	.left-topt {
		padding: 40rpx;
	}

	.left-toptl {
		display: inline-block;

		image {
			width: 352rpx;
			height: 398rpx;
		}
	}

	.left-toptr {
		margin-left: 76rpx;
		display: inline-block;
		vertical-align: top;
	}

	.left-toptrone {
		text-align: center;
		color: #FFFFFF;
		font-size: 18rpx;
		width: 162rpx;
		height: 28rpx;
		background: #51ADFF;
		border-radius: 4rpx;
	}

	.left-toptrtwo {
		margin: 8rpx 0;
		height: 30rpx;
		font-size: 22rpx;
		color: #333333;
		line-height: 30rpx;
		width: 580rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		cursor:pointer;
	}

	.left-toptrthree {
		height: 22rpx;
		font-size: 16rpx;
		color: #999999;
		line-height: 22rpx;
	}

	.left-toptrfour {
		margin-top: 57rpx;
		height: 30rpx;
		font-size: 22rpx;
		color: #333333;
		line-height: 30rpx;
	}

	.right {
		margin: 20rpx 0;
		padding: 26rpx 24rpx;
		float: right;
		width: 340rpx;
		height: 946rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.15);

		view {
			width: 348rpx;
		}
	}

	.right-con{
		width: 340rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.imRecommend-title {
		padding-top: 24rpx;

		image {
			margin-right: 7rpx;
			width: 29rpx;
			height: 29rpx;
			vertical-align: middle;
		}

		view {
			display: inline-block;
			vertical-align: middle;
		}
	}

	.left-top-cell {
		margin: 20rpx 1%;
		display: inline-block;
		width: 23%;
		justify-content: space-between;

		audio {
			padding: 20rpx 0;
			background: #FFFFFF;
			width: 100%;
			background-size: 100%;
		}

		view {
			margin-top: 12rpx;
		}
	}

	.left-top-title {
		font-size: 18rpx;
		color: #333333;
		line-height: 27rpx;
		cursor:pointer;
	}

	.left-top-titlet {
		display: inline-block;
		width: 200rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.left-top-des {
		font-size: 16rpx;
		color: #666666;
		line-height: 24rpx;
	}

	.text-right {
		float: right;
	}

	//right
	.right-title {
		height: 30rpx;
		font-size: 22rpx;
		color: #333333;
		line-height: 30rpx;
		image{
			margin-right: 16rpx;
			width: 32rpx;
			height: 30rpx;
			vertical-align: middle;
		}
	}
	.right-con{
		color: #999999;
	}
	.right-condata,	.right-concid{
		color: #007AFF;
		cursor:pointer;
	}
	.downloads-btn {
		text-decoration: none;
		display: block;
		width: 298rpx;
		height: 74rpx;
		background: linear-gradient(228deg, #0092FF 0%, #0059FF 100%);
		border-radius: 4rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 74rpx;
		margin: 128rpx 0 29rpx 0;
	}

	.right-titleone {
		margin: 63rpx 0 24rpx 0;
	}

	.right-titletwo {
		margin: 28rpx 0 16rpx 0;
	}

	.right-titlethree {
		margin: 28rpx 0 16rpx 0;
	}

	.right-titlefour {
		margin: 28rpx 0 16rpx 0;
	}

	.right-titlefive {
		margin: 48rpx 0 16rpx 0;
	}

	.right-titlesix {
		margin: 46rpx 0 16rpx 0;
	}
</style>
