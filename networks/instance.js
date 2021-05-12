import {get,post} from "./api.js"

// 请求地址
const baseURL = 'https://meituan.thexxdd.cn/api'

//////首页///////
//轮播图
export const getBanner = () => get(`${baseURL}/getbanner`)
//抢购
export const getRecom = () => get(`${baseURL}/recom`)
//榜单
export const getBillboard = () => get(`${baseURL}/billboard`)
//卡片
export const getCommodcrad = (page) => get(`${baseURL}/commodcrad?page=${page}`)


//////搜索页面///////
//搜索接口
export const getSearch = (searchkey,page) => get(`${baseURL}/search?keyword=${searchkey}&page=${page}`)

/////详情页

// 商品详情页{商品介绍}
export const getIntroduce = (id) => get(`${baseURL}/introduce?id=`+id)
// 商品评价
export const wxcommnt = (id) => get(`${baseURL}/wxcommnt?id=`+id)
// 获取单个商品是否收藏
export const collection = (id) => get(`${baseURL}/collection?id=`+id)
// 购物车数据
export const mycart = () => get(`${baseURL}/mycart`)
//商品仓库数据
export const wxsku = (id) => get(`${baseURL}/wxsku?id=`+id)
//参数
export const parameter = (id) => get(`${baseURL}/parameter?id=`+id)


// 收藏和取消收藏
export const enshrine = (data) => post(`${baseURL}/enshrine`,data)
// 加入购物车
export const atcart = (data) => post(`${baseURL}/atcart`,data)

// 获取每个sku的库存，价格
export const querysku = (data) => post(`${baseURL}/querysku`,data)

// 校验登录
export const tokening = () => get(`${baseURL}/tokening`)















//登录
export const wxlogin = (data) => post(`${baseURL}/wxlogin`,data)