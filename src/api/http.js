import axios from './config'


// 登录
export const login = data => axios.post('/login',data)

//-------------------- 商品管理

// 添加商品
export const addGoods = data => axios.post('/goods',data)

// 查询商品
export const selectGoods = params => axios.get('/goods',{params})
 
// 按名称查询
export const selectGoodsName = params => axios.get('/goods_name',{params})

//按商品状态查询  
// 商品状态 0： 未通过   1： 审核中   2： 已审核（仓库中）  3：上架  4：下架

export const selectGoodsState = params => axios.get('/goods_state',{params})

//查询仓库中（需要改）2
// export const selectWarehouseGoods = params => axios.get('/goods_state',{params})



// 删除商品
export const delGoods = params => axios.delete('/goods',{params})

//修改商品信息
export const editGoods = data => axios.put('/goods',data)


