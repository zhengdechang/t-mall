<template>
	<view class="Product-view">
		<block v-for="(item,index) in priceetc.Detaileddrawing" :key="index"> 
			<image :src="item" mode="widthFix" @click="previmg(index,priceetc.Detaileddrawing)"></image>
		</block>
	</view>
</template>

<script>
	import Prev from '../../../pubilc/prev.js'
	export default{
		props:{
			priceetc:{
				type:Object,
				default:() =>{}
			}
		},
		methods:{
			previmg(index,imaArray){
				new Prev(index,imaArray).previewImg()
			}
		}
	}
</script>

<style scoped>
	.Product-view {
		margin-top: 20upx;
		padding-bottom: 90upx;
	}

	.Product-view image {
		width: 100%;
		vertical-align: bottom;
	}
</style>

