<template>
	<view>
		<view class="search-cont">
			<view class="search">
				<input type="text" placeholder-class="inputclass" confirm-type='search'
				placeholder="请输入关键字" v-model="searchkey" @confirm="onKeyInput" />
			</view>
			<view class="search-code" @click="search()">搜索</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-if="ifhistory">
			<view class="search-title">
				<view>最新搜索</view>
				<!-- 删除按钮 -->
				<view @click="removeStorage()">
					<image src="../../static/search/searchend.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in setdata" :key="index">
					<view @click="menubtn(item)">{{item}}</view>
				</block>
			</view>
		</view>
		<!-- 展示内容   卡片流-->
		<Com :commodityData="commodityData"></Com>
		<!-- 上拉加载 -->
		<Loadings ref="loading"></Loadings>
		<!-- 没有搜索结果 -->
		<view class="empty-cart" v-if="searchno">
			<image src="../../static/search/sousuono.svg" mode="widthFix"></image>
			<text>抱歉！暂无相关商品</text>
		</view>
	</view>
</template>

<script>
	import {getSearch} from '../../networks/instance.js'
	import Com from '../components/com.vue'
	import Loadings from '../components/loading.vue'
	export default {
		data() {
			return {
				searchkey:'',     //搜索关键字
				ifhistory:false,  //是否有搜索历史
				setdata:[],       //搜索历史数据
				page:0,           //初始页数
				commodityData:[],  //获取的搜索结果
				searchno:false,    //没有搜索结果
				searchlastkey:'',      //最后一次搜索结果
			}
		},
		mounted() {
			this.getStorage();
		},
		onReachBottom() {
			this.$refs.loading.loAd({
				loading: true
			})
			this.page++
			this.searchData(this.searchlastkey,this.page, '02')
		},
		methods: {
			search(){
				if(this.searchkey !== ''){
					this.ifhistory = false;
					this.page = 0;
					this.setStorage(this.searchkey)
					this.searchData(this.searchkey,this.page)
				}
			},
			//存储搜索历史到本地缓存
			setStorage(searchkey){
				let searcharray = uni.getStorageSync('search_key')||[]
				searcharray.unshift(searchkey)
				uni.setStorageSync('search_key',searcharray)
				uni.setStorageSync()
			},
			//获取数据
			getStorage(){
				let setdata = uni.getStorageSync('search_key');
				//数组去重
				let setdataarr = Array.from(new Set(setdata))
				if(setdataarr.length){
					this.setdata = setdataarr
					this.ifhistory = true
				} else {
					this.ifhistory = false
				}
			},
			// 键盘上搜索或回车键触发
			onKeyInput(e) {
				let searchKey = e.detail.value
				if (searchKey !== '') {
					this.ifhistory = false
					this.page = 0
					this.setStorage(searchKey)
					this.searchData(searchKey,this.page)
				}
			},
			// 清除搜索历史
			removeStorage() {
				uni.removeStorageSync('srarch_key')
				this.getStorage()
			},
			// 搜索历史的搜索
			menubtn(item) {
				this.ifhistory = false
				this.page = 0
				this.searchData(item,this.page)
			},
			//请求搜索接口
			searchData(searchkey,page,idn='01'){
				this.searchlastkey = searchkey;
				getSearch(searchkey,page).then(res =>{
					if(idn = '02'){
						if(res.data.length){
							this.commodityData = [...this.commodityData,...res.data]
						}else{
							this.$refs.loading.loAd({
								loading: true,
								tips: '没有更多了',
								picture: false
							})
						}
					}else{
						this.$refs.loading.loAd({loading:false});
						if(res.data.length){
							this.commodityData = res.data
							this.searchno = false
						}else{
							this.searchno = true
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
	.search {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		background: #FFFFFF;
		border-radius: 20upx;
		margin-left: 20upx;
	}

	.search input {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		font-size: 30upx;
		color: #666666;
		padding-left: 30upx;
	}

	.search-cont {
		display: flex;
		justify-content: space-between;
		height: 70upx;
		align-items: center;
		padding: 30upx 0;
		background: #f8f8f8;
	}

	.search-code {
		width: 150upx;
		height: 50upx;
		text-align: center;
		font-size: 30upx;
	}

	.search-history {
		margin: 20upx;
	}

	.search-title {
		font-size: 30upx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60upx;
		line-height: 60upx;
	}

	.search-title image {
		width: 36upx;
		height: 36upx;
		display: block;
	}

	.menu-block view {
		background: #f7f8fa;
		border-radius: 6upx;
		font-size: 27upx;
		color: #292c33;
		text-align: center;
		padding: 10upx;
		margin: 20upx 20upx 0 0;
	}

	.menu-block {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
</style>
