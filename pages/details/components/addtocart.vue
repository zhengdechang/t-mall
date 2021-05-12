<template>
	<!-- 公用的商品sku选择组件 -->
	<view v-if="couponif">
		<view class="Coupon-yin anim" :catchtouchmove="true" @click="hideCou()"></view>
		<view class="Coupon-view coup-anim padd">
			<!-- 商品图片 -->
			<view class="commodity-view">
				<view class="commodity-left-img">
					<image :src="attribute.image" mode="aspectFill"></image>
				</view>
				<view class="commodity-zh">
					<view>¥{{attribute.price}}</view>
					<view>库存{{attribute.totalstock}}件</view>
					<view class="choice">
						<text>{{choice}}:</text>
						<text>{{skumen.color}}</text>
						<text>{{skumen.size}}</text>
					</view>
				</view>
				<view class="commodity-right-img" @click="hideCou()">
					<image src="../../../static/details/guanbi.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- 主要颜色 -->
			<view class="sku-view">
				<text class="sku-title">主要颜色</text>
				<view class="sku-mian">
					<block v-for="(item,index) in skudata[1]" :key="index">
						<view @click="colorFun(item.color,index)" :class="{active:index===colornum}">
							<image :src="item.image" mode="aspectFill"></image>
							<text>{{item.color}}</text>
						</view>
					</block>
				</view>
			</view>
			<!-- 尺寸 -->
			<view class="sku-view">
				<text class="sku-title">尺码</text>
				<view class="sku-mian sku-two">
					<block v-for="(item,index) in skudata[0]" :key="index">
						<view @click="sizeFun(item,index)" :class="{active:index===sizenum}">{{item}}</view>
					</block>
				</view>
			</view>
			<!-- 购买数量 -->
			<view class="sku-view sku-height" v-if="mean != '001'">
				<view class="sku-title numes">购买数量</view>
				<view class="sku-mums-gight">
					<view @click="reDuce()">-</view>
					<view>{{many}}</view>
					<view @click="pLus()">+</view>
				</view>
			</view>
		</view>
		<!-- 确定 -->
		<view class="determine coup-anim" v-if="mean == '001'">确定</view>
		<view class="determine coup-anim" v-if="mean == '002'" @click="skumen.ban && detErmine()">确定</view>
		<view class="determine coup-anim" v-if="mean == '003'" @click="skumen.ban && purChase()">确定</view>
		<!-- 登录弹窗 -->
		<showmodal ref="show"></showmodal>
	</view>
</template>

<script>
	import {tokening,querysku,atcart,mycart} from '../../../networks/instance.js'
	import showmodal from '../../components/showmodal.vue'
	export default {
		data() {
			return {
				// 显示/隐藏该组件
				couponif: false,
				// 002: 加入购物车；003：直接购买
				mean: '002',
				// 商品id
				id: '',
				// 商品展示的sku
				attribute: {},
				// 标题
				title: '',
				// 选了颜色
				colornum: -1,
				colorvalue: '',
				// 选了尺码
				sizenum: -1,
				sizevalue: '',
				// 购买数量
				many: 1
			}
		},
		components:{
			showmodal
		},
		props: {
			skudata: {
				type: Array,
				default: () => []
			}
		},
		watch: {
			// 获取父组件来的sku默认展示数据
			skudata(newVal, oldVal) {
				this.id = newVal[2].id
				this.attribute = newVal[2]
				this.title = newVal[2].title
			},
			// 是否选择了尺码和颜色条件
			skumen(newVal, oldVal) {
				let {
					color,
					size
				} = newVal
				if (color && size) {
					this.skuRequest({
						id: this.id,
						size,
						color
					})
				}
			}
		},
		computed: {
			// 选择sku的改变
			choice() {
				if (this.colorvalue === '' || this.sizevalue === '') {
					return '请选择'
				} else {
					return '已选择'
				}
			},
			skumen() {
				if (this.sizevalue && this.colorvalue) {
					return {
						color: this.colorvalue,
						size: this.sizevalue,
						ban: true
					}
				} else if (this.sizevalue === '' && this.colorvalue === '') {
					return {
						color: '主要颜色',
						size: '尺码',
						ban: false
					}
				} else if (this.sizevalue === '' && this.colorvalue) {
					return {
						color: '',
						size: '尺码',
						ban: false
					}
				} else if (this.sizevalue && this.colorvalue === '') {
					return {
						color: '主要颜色',
						size: '',
						ban: false
					}
				}
			}
		},
		methods: {
			// 被其他组件调用显示sku组件
			showCou(mean) {
				this.mean = mean
				this.couponif = true
			},
			hideCou() {
				this.couponif = false
			},
			// 选择颜色
			colorFun(color, index) {
				this.colornum = index
				this.colorvalue = color
			},
			// 选择尺码
			sizeFun(size, index) {
				this.sizenum = index
				this.sizevalue = size
			},
			// 减商品数量
			reDuce() {
				this.many <= 1 ? this.many = 1 : this.many--
			},
			// 加数量
			pLus() {
				this.many++
			},
			// 加入购物车
			async detErmine() {
				let {
					image,
					price
				} = this.attribute
				let data = {
					id: this.id,
					size: this.sizevalue,
					color: this.colorvalue,
					image,
					price,
					title: this.title,
					many: this.many
				}
				atcart(data).then(res =>{
					if (res.msg.errcode) {
						// 需要登录
						this.$refs.show.showing('coll')
					} else {
						this.hideCou()
						uni.showToast({
							title: '加入购物车成功',
							icon: 'success'
						})
						// 获取购物车的件数
						mycart().then(res =>{
							this.$store.commit('mutacart', res.data.length)
						})
					  }
				})
			},
			// 直接下单
			async purChase() {
				let {
					image,
					price
				} = this.attribute
				let data = [{
					id: this.id,
					size: this.sizevalue,
					color: this.colorvalue,
					image,
					price,
					title: this.title,
					many: this.many,
					total_price:  parseFloat((this.many * price).toFixed(10))
				}]
				// 校验登录状态
				tokening().then(res =>{
					if(res.msg.errcode){
						this.$refs.show.showing('coll')
					}else if(res.msg === "SUCCESS") {
						// 数组,对象转换成字符串才能携带值
						let cartdata = JSON.stringify(data)
						uni.navigateTo({
							url: '../payment-page/payment/payment?cartdata='+cartdata
						})
					}
				})
			},
			// 请求每个sku的数据/库存价格
			async skuRequest(obj) {
				querysku(obj).then(res =>{
					this.attribute = res.data[0]
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../../pattern/animat.css");
	@import url("../../../pattern/styles.css");
	.padd {
		padding: 15upx;
		margin-bottom: 90rpx;
	}

	.Coupon-view text {
		display: block;
	}

	.commodity-view {
		height: 200upx;
		display: flex;
	}

	.commodity-left-img {
		width: 200upx;
		height: 200upx;
	}

	.commodity-left-img image {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
	}

	.commodity-zh {
		font-size: 27upx;
		color: #3d4245;
		flex: 1;
	}

	.commodity-zh view:nth-child(1) {
		font-size: 35upx;
		color: #fe0036;
	}

	.commodity-zh view {
		padding-top: 10upx;
		padding-left: 15upx;
	}

	.choice {
		display: flex;
		align-items: center;
	}

	.choice text {
		padding-right: 8upx;
	}

	.commodity-right-img {
		width: 50upx;
		height: 50upx;
	}

	.commodity-right-img image {
		width: 50upx;
		height: 50upx;
	}

	/* sku */
	.sku-view {
		margin-top: 40upx;
		border-bottom: 1px solid #e5e5e5;
	}

	.sku-title {
		font-size: 30upx;
		color: #051b28;
		font-weight: bold;
		margin-bottom: 20upx;
	}

	.sku-mian image {
		width: 45upx;
		height: 45upx;
		padding-right: 17upx;
	}

	.sku-mian view {
		display: flex;
		align-items: center;
		height: 65upx;
		background: #f5f5f5;
		border: 1rpx solid #f5f5f5;
		border-radius: 20upx;
		padding: 0 14upx;
		margin-right: 30upx;
		margin-bottom: 30upx;
	}

	.sku-mian {
		font-size: 27upx;
		color: #051b28;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.sku-two view {
		padding: 0 35upx;
	}

	/* 购买数量 */
	.sku-height {
		height: 120upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.numes {
		margin: 0 !important;
	}

	.sku-mums-gight {
		display: flex;
		align-items: center;
	}

	.sku-mums-gight view {
		font-size: 30upx;
		color: #051b28;
		font-weight: bold;
		background: #f5f5f5;
		border-radius: 10upx;
		width: 90upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
	}

	.sku-mums-gight view:nth-child(2) {
		background: none !important;
	}

	.determine {
		z-index: 999;
		font-size: 30upx;
		color: #FFFFFF;
		background: #fe0036;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	/* 选了颜色加上边框 */
	.active {
		border: 1rpx solid red !important;
	}
</style>
