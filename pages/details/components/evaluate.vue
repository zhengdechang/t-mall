<template>
	<view class="evaluate-view" v-if="comment[0].commlen">
		<view class="evaluate-top">
			<view>商品评价({{comment[0].commlen}})</view>
			<view class="evaluate-rig" @click="comments(comment[0].parcontent[0].commid)">
				<text>查看全部</text>
				<image src="../../../static/details/quanbu.svg" mode="widthFix"></image>
			</view>
		</view>
		<!-- 分类 -->
		<view class="evaluate-class" v-if="comment[0].commtag.length">
			<block v-for="(item,index) in comment[0].commtag" :key="index">
				<text>{{item.label}}({{item.num}})</text>
			</block>
		</view>
		<!-- 评价取前两条 -->
		<view class="evaluate-User">
			<block v-for="(item,index) in comment[0].parcontent" :key="index">
				<view>
					<view class="USering">
						<image :src="item.avatarUrl" mode="widthFix"></image>
						<text>{{item.nickName}}</text>
					</view>
					<view class="USering-text">{{item.text}}</view>
					<view class="USering-time">
						<text>{{item.time}}</text>
						<text>颜色:{{item.color}}</text>
						<text>尺码:{{item.size}}</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			comment:{
				type:Array,
				default:() =>[]
			}
		},
		methods:{
			// 跳转到评论详情
			comments(id){
				uni.navigateTo({
					url:'../comment/comments?id='+id
				})
			}
		}
		
	}
</script>

<style scoped>
	.evaluate-view {
		background: #FFFFFF;
		margin-top: 20upx;
		padding: 20upx;
	}

	.evaluate-top {
		font-size: 30upx;
		height: 50upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.evaluate-rig image {
		width: 27upx;
		height: 27upx;
		padding-left: 20upx;
	}

	.evaluate-rig {
		display: flex;
		align-items: center;
	}

	/* 分类 */
	.evaluate-class {
		font-size: 25upx;
		display: flex;
		flex-wrap: wrap;
		margin: 15upx 0;
	}

	.evaluate-class text {
		background: #feecea;
		border-radius: 50upx;
		padding: 15upx;
		margin: 0upx 14upx 14upx 0;
	}

	/* 用户评价 */
	.evaluate-User {
		font-size: 25upx;
		color: #999999;
	}

	.evaluate-User image {
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
		padding-right: 10upx;
	}

	.USering {
		height: 50upx;
		/* background: #007AFF; */
		display: flex;
		align-items: center;
	}

	.USering-text {
		color: #333333;
		line-height: 40upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		/* // 控制多行的行数 */
		-webkit-line-clamp: 2; 
		-webkit-box-orient: vertical;
	}

	.USering-time {
		display: flex;
		align-items: center;
		height: 50upx;
	}

	.USering-time text:nth-child(1) {
		padding-right: 10upx;
	}
</style>
