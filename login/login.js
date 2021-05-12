// 微信登陆
import {wxlogin} from '../networks/instance.js'
class wxLogin {
	constructor(user, msg) {
		this.user = user
		this.msg = msg
	}
	// 调用接口登录, async返回promise
	async loGin() {
		// 拒绝登录
		if (this.msg != 'getUserInfo:ok') {
			throw ('拒绝登录')
		}
		// 获取code
		let userdata = await this.wxlogin()
		
		wxlogin(userdata).then(res =>{
			uni.setStorageSync('wxuser', res.data) // 存储用户信息到本地缓存
			// new toast('登录成功').showtoast()
			uni.showToast({
				title: '登陆成功',
				icon: 'success'
			})
		})
	}
	// 获取code
	wxlogin() {
		let {
			nickName,
			avatarUrl
		} = this.user
		return new Promise((resolve, reject) => {
			wx.login({
				success: (res) => {
					let data = {
						appid: 'wxbfd6f2e068c64fba',
						secret: 'aa3bb45716ea53729eed28203b4bb7d8',
						nickName,
						avatarUrl,
						code: res.code
					}
					resolve(data)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
}

export default wxLogin
