<template>
	<view class="card-add-image">
		<image class="card-add-img" :src="imgUrl" :data-imgurl="imgUrl" @tap="addImg" :mode="imgMode"></image>
<!--		<view class="grace-add-list-remove grace-icons icon-close"-->
<!--			  :style="{color:closeBtnColor}" @tap.stop="removeImg" v-if="imgUrl!==''"></view>-->

	</view>
</template>
<script>
export default {
	props:{
		btnName : {
			type : String,
			default : "添加照片"
		},
		closeBtnColor : {
			type : String,
			default : "#999999"
		},
		uploadServerUrl : {
			type : String,
			default : ''
		},
		progressSize :{
			type:Number,
			default:1
		},
		progressColor :{
			type:String,
			default:'#27BD81'
		},
		progressBGColor :{
			type:String,
			default:'#F8F8F8'
		},
		fileName : {type:String, default:'img'},
		formData : {type:Object, default:function(){return {};}},
		imgMode:{ type:String, default:'widthFix'},
		header:{type:Object, default:function(){return {};}}
	},
	data() {
		return {
			imgUrl:"",
			progress:0,
			error:false,
			imgLists : [],
			updatting : false,
			isUploadOver: false
		}
	},
	watch:{
		imgUrl : function(newVal, oldVal){
			if(!this.updatting){this.$emit('change', newVal);}
		}
	},
    methods:{
        addImg : function(){
        	let _this = this;
        	// 只能一张
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success:(res) => {
					for(let i = 0; i < res.tempFilePaths.length; i++){
						_this.imgUrl = res.tempFilePaths[i];
						_this.progress = 0;
						_this.error = false;
						_this.uploading = false;
						_this.isUploadOver = false;
						break;
					}
                },
				complete:function(){
				},
				fail:function(){
				}
            });
        },
        // removeImg : function(e){
        // 	let removeImg = {url:this.imgUrl,progress:this.progress,error:this.error}
        // 	this.imgUrl = "";
		// 	this.progress = 0;
		// 	this.error = false;
		// 	this.updatting = false;
		// 	this.isUploadOver = false;
		//
		// 	this.$emit('removeImg', removeImg);
        // },
		upload : function(){
			if(this.updatting){return ;}
			this.updatting = true;
			uni.showLoading({title:"图片上传中" });
			this.uploadBase();
		},
		retry : function () {
			this.upload();
		},
		uploadBase : function () {
			// 全部上传完成
			if(this.isUploadOver||this.imgUrl===undefined||this.imgUrl===""){
				this.updatting = false;
				uni.hideLoading();
				return ;
			}
			// 验证后端
			if(this.uploadServerUrl === ''){
				this.updatting = false;
				uni.showToast({title:"请设置上传服务器地址", icon:"none"});
				return ;
			}
			// 检查是否是默认值
			if(this.progress >= 1){
				this.updatting = false;
				return ;
			}
			this.error = false;
			// 创建上传对象
			let _this = this;
			const task = uni.uploadFile({
				url      : this.uploadServerUrl,
				filePath : this.imgUrl,
				name     : this.fileName,
				formData : this.formData,
				header   : this.header,
				success  : (uploadRes) => {
					uploadRes = JSON.parse(uploadRes.data);
					if(uploadRes.status != 'ok'){
						uni.showToast({title:"上传失败 : "+uploadRes.data, icon:"none"});
						this.errorResult();
					}else{
						//上传图片成功
						uni.hideLoading();

						_this.isUploadOver = true;
						_this.progress = 100;
						_this.imgUrl      = _this.$store.state.siteUrl+uploadRes.data;
						_this.error   = false;
						_this.updatting = false;

						let uploadedImg = {url:uploadRes.data,progress:_this.progress,error:_this.error}
						this.$emit('uploaded', uploadedImg);
					}
				},
				fail    : (e) => {
					uni.showToast({title:"上传失败，请点击图片重试", icon:"none"});
					this.error();
					
				}
			});
			task.onProgressUpdate((res) => {
				if(res.progress > 0){
					this.progress = res.progress;
				}
			});
		},
		// 上传错误
		errorResult : function(){
			this.updatting = false;
			this.isUploadOver = false;
			uni.hideLoading();
			setTimeout(()=>{
				this.progress = 0;
				this.error    = true;
				this.$emit('uploaderror');
			}, 500);
		},
		// 设置默认值
		setImg : function(imgUrl){
        	this.imgUrl = imgUrl
			this.progress = 100
			this.updatting = false
			this.isUploadOver = true
			this.error = false
		}
    }
}
</script>
<style scoped>
	.grace-add-list-remove{width:50rpx; height:50rpx; line-height:50rpx; text-align:center; font-size:40rpx; position:absolute; z-index:5; left: 55%; top:60rpx; color:#888888;}

.card-add-image {
	width: 100%;
	text-align: center;
}
.card-add-img {
	width: 160rpx;
	height: 160rpx !important;
	border-radius: 100rpx;
	background: #eee;
	margin: 20rpx auto;
}
</style>