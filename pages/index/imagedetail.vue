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
			<!-- <view class="resource-title"><text class="resource-titleone">Owning data set</text><text class="resource-titletwo">【File name 】</text></view> -->
			<view class="resource-title"><text class="resource-titletwo">【{{basedata.fileName}}】</text></view>
			<view class="resource-con">
				<view class="left">
					<view class="left-top">
						<image :src="basedata.path" mode="heightFix"></image>
					</view>
					<view>Recommend</view>
					<view class="left-top-cell" v-for="(item,index) in celllist" :key="index">
						<view @click="gotodetail(item)">
							<image :src="item.path" style="cursor: pointer;"></image>
							<a :title="basedata.payloadCid"><view class="left-top-title">{{item.payloadCid}}</view></a>
							<!-- <view class="left-top-des"><text>20 downloads</text><text class="text-right">56 plays</text></view> -->
						</view>
					</view>
				</view>
				<view class="right">
					<view class="right-box">				
						<view class="right-title"><image src="../../static/images/edit.png"></image>information</view>
						<view class="right-title right-titleone">CID:</view>
						<a :title="basedata.payloadCid"><view class="right-con right-concid" @click="copy(basedata.payloadCid)">{{basedata.payloadCid}}</view></a>
						<view class="right-title right-titletwo">Miner:</view>
						<view class="right-con">{{basedata.minerId}}</view>
						<view class="right-title right-titlethree">Transaction id:</view>
						<view class="right-con">{{basedata.dealId}}</view>
						<view class="right-title right-titlefour">File size:</view>
						<view class="right-con">{{basedata.fileSize}}</view>
						<view class="right-title right-titlefive">Date:</view>
						<view class="right-con">{{basedata.createTime}}</view>
						<view class="right-title right-titlesix">From the data set：</view>
						<a :title="basedata.curatedDataset" :href="urldataSet"><view class="right-condata">{{basedata.curatedDataset}}</view></a>
						<a :href='basedata.path' class='downloads-btn' download>Downloads</a>
						<!-- <view class="downloads-btn" @click="downloads"></view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCopy from '../../common/xb-copy/uni-copy.js'
	var _this;
	export default {
		data() {
			return {
				celllist: [],
				keywords: '',
				cid: '',
				basedata: '',
				urldataSet:'',
			}
		},
		onLoad: function(option) {
			this.cid = option.cid
			this.firstrequest(option.cid)
		},
		onShow() {
			//this.firstrequest(this.cid)
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
					},
				})
			},
			firstrequest(cid) {
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
							uni.navigateTo({
								url: './musicdetail?cid=' + _this.keywords
							})
						}else if(res.data.details.types==3){
							_this.celllist = res.data.about.list //底部图片列表
							_this.basedata = res.data.details //right基本信息
							_this.urldataSet=res.data.dataSetInfo.url
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
			//当前页面底部list详情
			gotodetail(item) {
				this.firstrequest(item.payloadCid)
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.left{
		width: 70%;
	}
	.right{
		width: 25%;
	}
	.left,
	.right {
		display: inline-block;
	}
	.left-top {
		margin: 10rpx 0;
		width: 1100rpx;
		height: 660rpx;
		image {
			height: 660rpx;
			display: block;
			margin: 0 auto;
			//text-align: center;
			// position: relative;
			// top: 50%;
			// transform: translateY(-50%);
		}
	}

	.right {
		padding: 26rpx 24rpx;
		margin-top: 10rpx;
		float: right;
		width: 340rpx;
		height: 946rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.15);

		view {
			width: 348rpx;
		}
	}
	.right-box {
	}
	.right-con{
		width: 340rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.left-top-cell {
		margin: 20rpx 1%;
		display: inline-block;
		width: 23%;
		justify-content: space-between;
		image {
			width: 100%;
			height: 157rpx;
		}

		view {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 12rpx;
		}
	}

	.left-top-title {
		font-size: 18rpx;
		color: #333333;
		line-height: 27rpx;
		cursor:pointer;
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
		height: 32rpx;
		font-size: 22rpx;
		color: #333333;
		line-height: 30rpx;
		font-weight: bold;
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
	.right-condata,.right-concid{
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
