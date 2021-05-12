import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const state = {
	// 购物车的件数
	cartnum: '',
	// 收货地址数据
	addordr: {}
}
const mutations = {
	// 加入购物车成功后传值的购物车条数
	mutacart(state,nums){
		state.cartnum = nums
	},
	// 收货地址携带数据返回到订单页
	mutaadd(state,address){
		state.addordr = address
	}
}

export default new Vuex.Store({
	// 数据仓库中心
	state,
	// 传值
	// actions: 异步传值。不能一步到达数据仓库，store.dispatch()
	// getters: 计算属性，带有缓存
	// mutations: 同步传值，可以直接传给state，store.commit('mutacart',value)
	mutations,
})