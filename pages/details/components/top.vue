<template>
	<view>
		<view class="navs-view">
			<view class="navs-image" :style="'height:'+topheight.height+'px;'" @click="pageback()">
				<image src="../../../static/details/fanhuihei.png" mode="widthFix"></image>
			</view>
			<view class="navs">
				<block v-for="(item,index) in navalue" :key="index">
					<view class="navs-nav" :class="{navactivetext:item.current == num}"
					 @click="navbtn(index)">{{item.name}}</view>
				</block>
			</view>
			<view style="width: 20px; padding-right:20rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:0,
				navalue:[
					{
						name:'商品',
						current:0
				    }, 
					{
						name:'评价',
						current:1
					}, 
					{
						name:'详情 ',
						current:2
					}, 
				]
			}
		},
		porps:{
			topheight:{
				type:Object,
				default:()=>[]
			}
		},
		methods:{
			navbtn(index){
				setTimeout(() =>{
					this.num = index
				},200);
				if(index==0){
					this.backTop()
				}else{
					this.$parent.father(index)
				}
			},
			//返回顶部
			backTop(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:300
				})
			},
			//滚动时切换tab
			changeTab(value){
				this.num = value
			},
			//返回上一级
			pageback(){
				uni.navigateBack({
					dalta:1
				})
			}
		}
	}
</script>

<style scoped>
	.navs-nav {
		font-size: 30upx;
		width: 100upx;
		text-align: center;
		color: #464230;
	}

	.navs-image image {
		width: 20px;
		height: 20px;
	}

	.navs-image {
		width: 20px;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
	}

	.navs {
		display: flex;
		justify-content: center;
		align-self: center;
	}

	.navactivetext {
		border-bottom: 5upx solid #3d3b32;
	}

	.navs-view {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>

