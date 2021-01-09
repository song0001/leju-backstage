import request from '@/api/request'
// 分页查询商品列表
function productList(start, limit, data) {
    return request({
        url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
        method: 'POST',
        data
    })
}
// 添加商品信息
function addProductAndSkus(data) {
    return request({
        url: `/lejuAdmin/product/addProductAndSkus`,
        method: 'POST',
        data
    })
}
// 删除商品
function productDelete(id, data) {
    return request({
        url: `/lejuAdmin/product/del/${id}`,
        method: 'delete',
        data
    })
}
// 更新商品和sku
function updateProductAndSkus(data) {
    return request({
        url: `/lejuAdmin/product/updateProductAndSkus`,
        method: 'post',
        data
    })
}
// 商品详情
function productDetail(id) {
    return request({
        url: `/lejuAdmin/product/productSkusDetail/${id}`,
        method: 'get'
    })
}
// 是否最新
function switchNewStatus(data) {
    return request({
        url: '/lejuAdmin/product/switchNewStatus',
        method: 'post',
        data
    })
}
// 是否预告
function switchPreviewStatus(data) {
    return request({
        url: '/lejuAdmin/product/switchPreviewStatus',
        method: 'post',
        data
    })
}
// 是否推荐状态
function switchRecommendStatus(data) {
    return request({
        url: '/lejuAdmin/product/switchRecommandStatus',
        method: 'post',
        data
    })
}

// 是否审核状态
function switchVerifyStatus(data) {
    return request({
        url: '/lejuAdmin/product/switchVerifyStatus', // 相对路径
        method: 'post',
        data
    })
}

// 是否发布状态
function switchPublishStatus(data) {
    return request({
        url: '/lejuAdmin/product/switchPublishStatus', // 相对路径
        method: 'post',
        data
    })
}
export {
    productList,
    addProductAndSkus,
    productDelete,
    productDetail,
    updateProductAndSkus,
    switchNewStatus,
    switchPreviewStatus,
    switchRecommendStatus,
    switchVerifyStatus,
    switchPublishStatus
}