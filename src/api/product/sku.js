import request from '@/api/request'
// 获取列表
function getSkuList(productId) {
    return request({
        url: `/lejuAdmin/sku/getSkusByProductId/${productId}`, // 相对路径
        method: 'get'
    })
}
// 删除商品
function deleteSku(skuId) {
    return request({
        url: `/lejuAdmin/sku/delSku/${skuId}`, // 相对路径
        method: 'delete'

    })
}

// 添加商品和sku
function addSkus(data) {
    return request({
        url: `/lejuAdmin/sku/addProductSkus`, // 相对路径
        method: 'post',
        data
    })
}
// 添加商品和sku
function updateSkus(data) {
    return request({
        url: `/lejuAdmin/sku/updateSkuInfo`, // 相对路径
        method: 'post',
        data
    })
}

export {
    getSkuList,
    deleteSku,
    addSkus,
    updateSkus

}