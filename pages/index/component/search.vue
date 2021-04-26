<template>
	<view class="search-view">
		<view class="search-icon">
			<image src="/static/search/logo.png" alt="" mode="widthFix"></image>
		</view>
		<view class="search-img" @click="search()">
			<image src="/static/search/sousuo.png" mode="widthFix"></image>
			<input type="text" placeholder="请输入内容" disabled>
		</view>
		<view class="search-icon">
			<image src="/static/search/saoma.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods: {
			search(){
				uni.navigateTo({
					url:'../search/search'
				})
			}
		},
		
	}
</script>

<style lang="less" scoped>
	.search-view {
		height: 100upx;
		background: #fe001d;
		display: flex;
		justify-content: space-between;
		align-items: center;
	
		image {
			width: 50upx;
			height: 50upx;
		}
	}
	
	.search-img {
		background: #FFFFFF;
		height: 70upx;
		border-radius: 50upx;
		display: flex;
		flex: 1;
		align-items: center;
		position: relative;
	
		input {
			width: 100%;
			font-size: 30upx;
			color: #b2b2b2;
			padding-left: 80upx;
		}
	
		image {
			width: 35upx;
			height: 35upx;
			position: absolute;
			left: 30upx;
			align-self: center;
		}
	}
	
	.search-icon {
		width: 50upx;
		height: 50upx;
		padding: 0 20upx;
	}
</style>
