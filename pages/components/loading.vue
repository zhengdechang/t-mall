<template>
	<!-- 上拉加载组件 -->
	<view class="loading" v-if="loading">
		<image src="/static/loading/loadtmall.gif" mode="widthFix" v-if="picture"></image>
		<text>{{tips}}</text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				loading: false,
				picture: true,
				tips: '玩命加载中'
			}
		},
		methods:{
			loAd(value){
				let {loading = false, tips='玩命加载中', picture=true} = value
				this.loading = loading
				this.tips = tips
				this.picture = picture
			}
		}
	}
</script>

<style scoped>
	.loading {
		width: 200rpx;
		height: 100upx;
		font-size: 20rpx;
		color: #A7A7A7;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.loading-men image {
		width: 60rpx;
		height: 80upx;
		display: block;
	}
</style>
