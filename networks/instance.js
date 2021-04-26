import {get,post} from "./api.js"

// 请求地址
const baseURL = 'https://meituan.thexxdd.cn/api'

//轮播图
export const getBanner = () => get(`${baseURL}/getbanner`)
//抢购
export const getRecom = () => get(`${baseURL}/recom`)
//榜单
export const getBillboard = () => get(`${baseURL}/billboard`)
//卡片
export const getCommodcrad = (page) => get(`${baseURL}/commodcrad?page=${page}`)
