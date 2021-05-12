<template>
	<view>
		<view class="price-view">
			<view>当前价</view>
			<!-- 如有后期补优惠券 -->
			<!-- :class="{textstyle : num}" -->
			<view class="price-list">
				<text>￥{{priceetc.Trueprice}}</text>
				<!-- <text v-if="priceetc.coupon" class="coupon-text">券后¥{{priceetc.coupon_price}}</text> -->
				<text class="scribing">原价￥{{priceetc.Crossedprice}}</text>
			</view>
		</view>
		<!-- 领优惠券 -->
		<view class="Doscount-view">
			<text>{{priceetc.Goldcoin}}</text>
			<text>{{priceetc.itegral}}</text>
			<!-- <text v-if="priceetc.coupon" @click="couponsFun()">领劵</text> -->
		</view>
		<!-- 标题 -->
		<view class="price-Title">
			<view class="titleing">{{priceetc.title}}</view>
			<view class="price-Image" @click="parameFun(priceetc.id)">
				<image src="../../../static/details/canshu.svg" mode="widthFix"></image>
				<tex>参数</tex>
			</view>
		</view>
		<!-- 月销 -->
		<view class="Monthlu">销量{{priceetc.sales_volume}}</view>
	</view>
</template>

<script>
	import {parameter} from "../../../networks/instance.js"
	export default{
		props:{
			priceetc:{
				type:Object,
				default:()=>{}
			}
		},
		methods:{
			parameFun(id){
				parameter(id).then(res =>{
					this.$bus.$emit('parames', {
						show: true,
						data: res.data,
						})
				}).catch(err =>{
					consolo.log(err)
				})
			},
		},
	}
</script>

<style scoped>
	.price-view {
		background: linear-gradient(to right, #ff0000, #ff4000, #ff8000);
		height: 120upx;
		font-size: 35upx;
		padding-left: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #FFFFFF;
	}

	.price-list {
		display: flex;
		align-items: center;
		line-height: 50upx;
	}

	.price-list text:nth-child(1) {
		font-size: 40upx;
		padding-right: 10upx;
	}

	.price-list text:nth-child(2) {
		font-size: 25upx;
		/* background: red;
color: #fe0032;
height: 30upx;
line-height: 30upx;
text-align: center;
border-radius: 50upx;
padding: 9upx 23upx; */
	}

	.scribing {
		text-decoration: line-through;
		color: #b5b5b5 !important;
		padding-left: 7rpx;
	}

	.textstyle text:nth-child(2) {
		background: #FFFFFF !important;
	}

	.coupon-text {
		color: #FFFFFF !important;
	}

	/* 优惠券 */
	.Discount-view {
		font-size: 25upx;
		background: #FFFFFF;
		height: 100upx;
		display: flex;
		align-items: center;
		padding: 0 20upx;
	}

	.Discount-view text:nth-child(-n+2) {
		background: #ffeaef;
		height: 30upx;
		line-height: 30upx;
		text-align: center;
		padding: 10upx;
		border-radius: 10upx;
		margin-right: 10upx;
	}

	.Discount-view text:nth-child(3) {
		flex: 1;
		text-align: right;
	}

	/* 标题 */
	.price-Title {
		font-size: 35upx;
		height: 100upx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 0 20upx;
	}

	.titleing {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		flex: 1;
		/* // 控制多行的行数 */
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.price-Title image {
		width: 50upx;
		height: 50upx;
		padding-bottom: 5upx;
	}

	.price-Image {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		font-size: 25upx;
		width: 150upx;
		/* background: #1183E6; */
	}

	/* 月销 */
	.Monthly {
		background: #FFFFFF;
		font-size: 25upx;
		color: #999999;
		display: flex;
		justify-content: flex-end;
		height: 70upx;
		line-height: 70upx;
		padding-right: 20upx;
	}
</style>

