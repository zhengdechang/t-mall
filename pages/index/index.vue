<template>
	<view>
		<Search></Search>
		<Swiper :banner="banner"></Swiper>
		<Purchase :recomData="recomData"></Purchase>
		<Rank :rankData='rankData'></Rank>
		<Commodity :commodityData='commodityData'></Commodity>
		<Loading ref="Loading"></Loading>
	</view>
</template>

<script>
	import Search from './component/search.vue'
	import Swiper from './component/swiper.vue'
	import Purchase from './component/purchase.vue'
	import Rank from './component/rank.vue'
	import Commodity from '../components/commodity.vue'
	import Loading from '../components/loading.vue'
	import {getBanner,getRecom,getBillboard,getCommodcrad} from '../../networks/instance.js'
	export default {
		data() {
			return {
				banner:[],         //轮播数据
				recomData:[],      //抢购数据
				rankData:[],       //榜单数据
				commodityData:[],  //卡片流
				page:0,            //卡片流分页
			}
		},
		onLoad() {

		},
		components:{
			Search,
			Swiper,
			Purchase,
			Rank,
			Commodity,
			Loading,
		},
		created() {
			this.init()
		},
		onReachBottom() {
			this.$refs.Loading.loAd({
				loading: true
			})
			this.page++
			this.PullUp(this.page)
		},
		methods: {
		   init(){
				this.getbanner()
				this.getrecom()
				this.getbillboard()
				this.getcommodcrad(this.page)
		   },
		   getbanner(){
				getBanner().then(res =>{
					this.banner = res.data
				})
			},
		   getrecom(){
			   getRecom().then(res =>{
				   this.recomData = res.data
			   })
		   },
		   getbillboard(){
			   getBillboard().then(res =>{
				   this.rankData = res.data
			   })
		   },
		   getcommodcrad(page){
			   getCommodcrad(page).then(res =>{
				   this.commodityData = res.data
			   })
		   },
		   //卡片触底触底加载
		   PullUp(page){
			   getCommodcrad(page).then(res =>{
					if(!res.data.length){
						this.$refs.Loading.loAd({loading:true, tips:'没有更多了',picture:false})
						// this.$refs.loadon.loAd({whether:true, tips:'没有更多了',picture:false})
					}else{
						this.commodityData = [...this.commodityData, ...res.data]
					}
			   })
		   },
		   
		}
	}
</script>

<style>
	page {
		background-color: #f4f4f4;
	}
</style>
