<template>
	<view v-if="show" class="grace-empty">
		<slot name="img"></slot>
		<slot name="text"></slot>
		<slot name="other"></slot>
	</view>
</template>
<script>
	export default {
		name: "graceEmptyNew",
		props: {
			show : {
				type : Boolean,
				default : false
			}
		},
		data() {
			return {
			}
		},
		methods:{
		}
	}
</script>
<style scoped>
.grace-empty{display:flex; flex-direction:column; justify-content:center; align-items:center;}
</style>