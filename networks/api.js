//封装api
let Base64 = require('./base64.js').Base64

// const request = class{
// 	 post(url,data){
// 		return new Promise((resolve,reject) =>{
// 			uni.request({
// 				url:url,
// 				method:'POST',
// 				data:data,
// 				header:{Authorization:this.baseFun()}
// 			}).then(res =>{
// 				resolve(res[1].data)
// 			}).catch(err =>{
// 				reject(err)
// 			})
// 		})
// 	}
	
	
// 	 get(url){
// 		return new Promise((resolve,reject) =>{
// 			uni.request({
// 				url:url,
// 				method:'GET',
// 				header:{Authorization:this.baseFun()}
// 			}).then(res =>{
// 				resolve(res[1].data)
// 			}).catch(err =>{
// 				reject(err)
// 			})
// 		})
// 	}
	
// 	// 加密token
// 	baseFun(){
// 		const token = uni.getStorageSync('wxuser').token
// 		const base64 = Base64.encode(token+':')
// 		return 'Basic ' + base64
// 	}
	
// }

	 export function post(url,data){
		return new Promise((resolve,reject) =>{
			uni.request({
				url:url,
				method:'POST',
				data:data,
				header:{Authorization:baseFun()}
			}).then(res =>{
				resolve(res[1].data)
			}).catch(err =>{
				reject(err)
			})
		})
	}
	
	
	 export function get(url){
		return new Promise((resolve,reject) =>{
			uni.request({
				url:url,
				method:'GET',
				header:{Authorization:baseFun()}
			}).then(res =>{
				resolve(res[1].data)
			}).catch(err=>{
				reject(err)
			})
		})
	}
	
	//加密token
	function baseFun(){
		const token = uni.getStorageSync('wxuser').token
		const base64 = Base64.encode(token+':')
		return 'Basic ' + base64
	}
	