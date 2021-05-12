//封装api
// let Base64 = require('./base64.js').Base64

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
		// const token = uni.getStorageSync('wxuser').token
		// const base64 = Base64.encode(token+':')
		// return 'Basic ' + base64
	  	return 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFhV1FpT2lKdlNVOHpNalZLTlZabU5FWkNUekZIV0hGQlRUVXRTWEoyZWkwMElpd2ljMk52Y0dVaU9qSXNJbWxoZENJNk1UWXlNRGN4TmpnNE5Td2laWGh3SWpveE5qSXdOekkwTURnMWZRLkFHbUx1RFBaeXVvUUVnQnRIVW5jd0Zpa0x6dHpuWmp0ZzF5bHdMdV9taWc6'
	}
	