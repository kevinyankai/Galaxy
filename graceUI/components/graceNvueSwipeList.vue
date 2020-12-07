<template>
	<view class="grace-swipe-list" :style="{width:width+'rpx'}">
		<graceNvueTouch v-for="(item, index) in msgsIn" :key="index" @thStart="thStart" @thMove="thMove" @thEnd="thEnd" :datas="[index]">
			<view class="grace-swipe-list-item" :style="{width:width+'rpx'}">
				<view class="grace-swipe-list-item-body" :style="{width:width+'rpx', marginLeft:(item.x * -1) + 'px'}">
					<view class="grace-swipe-list-img" :style="{width:imgSize[0], height:imgSize[1]}">
						<image :src="item.img" mode="widthFix" :style="{width:imgSize[0], height:imgSize[1], borderRadius:'6rpx'}"></image>
						<text class="grace-swipe-list-point" v-if="item.msgnumber > 0">{{item.msgnumber}}</text>
					</view>
					<view class="grace-swipe-list-content">
						<view class="grace-swipe-list-title">
							<text class="grace-swipe-list-title-text" :style="{fontSize:fontSizes[0], color:fontColors[0], flex:1}">{{item.title}}</text>
							<text class="grace-swipe-list-title-text" :style="{fontSize:fontSizes[1], color:fontColors[1], marginLeft:'25rpx', marginRight:'25rpx'}">{{item.time}}</text>
						</view>
						<text class="grace-swipe-list-desc" :style="{fontSize:fontSizes[2], color:fontColors[2], marginTop:'6rpx'}">{{item.content}}</text>
					</view>
				</view>
				<view class="grace-swipe-btns" :style="{width:item.x+'px'}">
					<view class="grace-swipe-btn" v-for="(btn, btnIndex) in item.btns" :key="btnIndex" 
					:style="{backgroundColor:btn.bgColor}" @tap.stop="btnTap(index, btnIndex)">
						<text class="grace-swipe-btn-text">{{btn.name}}</text>
					</view>
				</view>
			</view>
		</graceNvueTouch>
	</view>
</template>
<script>
export default{
	props:{
		width:{type:Number, default:750},
		msgs:{type:Array,default:function(){return [];}},
		imgSize:{type:Array,default:function(){return ['80rpx', '80rpx'];}},
		fontSizes:{type:Array,default:function(){return ['28rpx','22rpx', '22rpx'];}},
		fontColors:{type:Array,default:function(){return ['#323232','#888888', '#888888'];}},
		btnWidth:{type:Number, default:160}
	},
	data() {
		return {
			msgsIn: [],
			damping : 0.1
		}
	},
	created:function(){
		this.init(this.msgs);
	},
	watch:{
		msgs : function(nv){
			this.init(nv);
		}
	},
	methods:{
		init:function(msgs){
			var newmsg = [];
			msgs.forEach((item) => { item.x = 0; newmsg.push(item); });
			this.msgsIn = newmsg;
		},
		setItems : function (msgs){
			
		},
		thStart : function(e, index){
			this.damping = 0.1;
			var i = 0;
			this.msgsIn.forEach((item) => { 
				if(i != index){
					if(item.x > 10){this.toZero(i);}
				}
				i++;
			});
		},
		thMove : function (e, index){
			var item = this.msgsIn[index];
			item.x -= e[0][0] * this.damping;
			if(item.x > this.btnWidth){item.x = this.btnWidth;}
			if(item.x < 0){item.x = 0;}
			this.msgsIn.splice(index, 1, item);
			this.damping *= 1.2;
		},
		thEnd : function(e, index){
			if(e[1] < 150){
				if(this.msgsIn[index].x >= 5){
					this.toZero(index);
					return;
				}
				if(Math.abs(e[0][0]) < 30){this.$emit('itemTap',index);}
				return ;
			}
			var item = this.msgsIn[index];
			if(item.x < this.btnWidth / 3){item.x = 0;}else{item.x = this.btnWidth;}
			this.msgsIn.splice(index, 1, item);
		},
		toZero:function(index){
			if(this.msgsIn[index].x < 0 ){
				this.msgsIn[index].x = 0;
				this.msgsIn.splice(index, 1, this.msgs[index]);
				return;
			}
			this.msgsIn[index].x -= 10;
			this.msgsIn.splice(index, 1, this.msgsIn[index]);
			setTimeout(()=>{this.toZero(index);},10);
		},
		btnTap : function (index, indexBtn) {
			this.$emit('btnTap',index, indexBtn);
		}
	},
	components:{}
}
</script>
<style scoped>
.grace-swipe-list{overflow:hidden;}
.grace-swipe-list-item{overflow:hidden; position:relative;}
.grace-swipe-list-item-body{flex-direction:row; flex-wrap:nowrap; font-size:0; align-items:center;}
.grace-swipe-list-img{flex-shrink:0; margin-left:25rpx; font-size:0;}
.grace-swipe-list-point{border-radius:32rpx; height:30rpx; line-height:30rpx; padding:0 10rpx; font-size:20rpx; background-color:#FF0036; color:#FFFFFF; position:absolute; z-index:1; right:0; top:0;}
.grace-swipe-list-content{width:500rpx; flex:1; overflow:hidden; padding-top:25rpx; padding-bottom:25rpx; margin-left:22rpx; border-bottom-width:1px; border-style:solid; border-color:#F1F2F3;}
.grace-swipe-list-title{flex-direction:row; flex-wrap:nowrap; justify-content:space-between; overflow:hidden;}
.grace-swipe-list-title-text{line-height:38rpx; height:38rpx; overflow:hidden;}
.grace-swipe-list-desc{line-height:32rpx; height:32rpx; overflow:hidden; padding-right:25rpx;}
.grace-swipe-btns{width:0rpx; position:absolute; z-index:1; right:0; top:0; height:116rpx; flex-direction:row; flex-wrap:nowrap;}
.grace-swipe-btn{width:100rpx; flex:1; height:125rpx; flex-direction:row; flex-wrap:nowrap; justify-content:center; align-items:center; padding:20rpx; overflow:hidden;}
.grace-swipe-btn-text{line-height:36rpx; height:36rpx; overflow:hidden; font-size:28rpx; color:#FFFFFF;}
</style>
