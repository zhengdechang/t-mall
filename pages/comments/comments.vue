<template>
	<view class="comments-view">
		<!-- 分类 -->
		<view class="evaluate-class" v-if="labeldata.length">
			<block v-for="(item,index) in labeldata" :key="index">
				<text v-if="item.num===''" :class="{actives:num===index}" @click="labelFun(item.commid,item.label,index)">{{item.label}}</text>
				<text v-else :class="{actives:num===index}" @click="labelFun(item.commid,item.label,index)">{{item.label}}({{item.num}})</text>
			</block>
		</view>
		<!-- 评价 -->
		<block v-for="(item,index) in commdata" :key="index">
			<view class="comments-user">
				<view class="comments-top comments-flex">
					<image :src="item.avatarUrl" mode="widthFix"></image>
					<text>{{item.nickName}}</text>
				</view>
				<view class="comments-zh comments-flex">
					<text>{{item.time}}</text>
					<text>颜色分类:{{item.color}}</text>
					<text>尺码:{{item.size}}</text>
				</view>
				<view class="comments-mes">{{item.text}}</view>
				<view class="comments-img" v-if="item.isimg">
					<block v-for="(items,indexs) in item.image" :key="indexs">
						<view class="user-images">
							<image :src="items" mode="aspectFill" @click="previmg(indexs,item.image)"></image>
						</view>
					</block>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	const {Login} = require('../../public/logic.js')
	export default {
		data() {
			return {
				labeldata:[],
				commdata: [],
				num: 0, //选中第几个标签
			}
		},
		// onLoad生命周期可以接收上一个页面传过来的值
		onLoad(e) {
			this.reqComm(e.id)
		},
		methods: {
			async reqComm(id){
				let comtag = new this.Request(this.Urls.m().comtag + '?id=' + id).modeget()
				let comtconent = new this.Request(this.Urls.m().comtconent + '?id=' + id + '&label='+'全部').modeget()
				try{
					let res = await Promise.all([comtag,comtconent])
					// 标签
					this.labeldata = res[0].data
					// 评价内容
					this.commdata = res[1].data
				}catch(e){
					//TODO handle the exception
				}
			},
			previmg(index,imgArr){
				new Login(index,imgArr).previewImg()
			},
			async labelFun(commid,label,index){
				this.num = index
				let comtconent = await new this.Request(this.Urls.m().comtconent + '?id=' + commid + '&label='+ label).modeget()
				this.commdata = comtconent.data
			}
		}
	}
</script>

<style scoped>
	.comments-view {
		margin: 20upx;
	}

	/* 分类 */
	.evaluate-class {
		font-size: 25upx;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 50upx;
		border-bottom: 1px solid #eeeeee;
	}

	.evaluate-class text {
		background: #feecea;
		border-radius: 50upx;
		padding: 15upx;
		margin: 0upx 14upx 14upx 0;
	}

	/* 选中*/
	.actives {
		background: #FF0036 !important;
		color: #FFF !important;
	}

	/* user评价 */
	.comments-user {
		font-size: 30upx;
		padding-bottom: 15upx;
		border-bottom: 1px solid #eeeeee;
		margin: 25upx 0;
	}

	.comments-flex {
		display: flex;
		align-items: center;
	}

	.comments-top image {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		padding-right: 10upx;
	}

	.comments-zh {
		height: 80upx;
		font-size: 25upx;
		color: #a7a7a7;
	}

	.comments-zh text {
		padding-right: 8upx;
	}

	.comments-mes {
		line-height: 1.5;
	}

	.comments-top {
		height: 60upx;
	}

	.comments-img {
		display: flex;
		flex-wrap: wrap;
	}

	.user-images {
		width: calc(33.33% - 10rpx*2);
		height: 200rpx;
		padding: 10rpx;
	}

	.user-images image {
		width: 100%;
		height: 200rpx;
		border-radius: 2rpx;
	}
</style>
