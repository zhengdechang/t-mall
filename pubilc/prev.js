// 预览图片
class Prev {
	constructor(index,imgarr) {
	    this.index = index
		this.imgarr = imgarr
	}
	previewImg(){
		uni.previewImage({
			current: this.index,
			urls: this.imgarr
		})
		.then(res=>{
			console.log(res)
		})
		.catch(err=>{
			console.log(err)
		})
	}
}

export default Prev