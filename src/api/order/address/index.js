import request from '@/api/request'
// 获取列表
function addressList() {
    return request({
        url: `/lejuAdmin/companyAddress/addressList`,
        method: 'get'
    })
}
// 收货默认
function setReceiveOne(data) {
    return request({
        url: `/lejuAdmin/companyAddress/setReceiveOne`,
        method: 'post',
        data
    })
}
// 设置发货默认
function setSendOne(data) {
    return request({
        url: `/lejuAdmin/companyAddress/setSendOne`,
        method: 'post',
        data
    })
}
// 更新地址信息
function updateAddress(data) {
    return request({
        url: `/lejuAdmin/companyAddress/update`,
        method: 'post',
        data
    })
}
// 删除地址信息
function deleteAddress(id) {
    return request({
        url: `/lejuAdmin/companyAddress/${id}`,
        method: 'delete'
    })
}
// 获取地址明细
function addressDetail(id) {
    return request({
        url: `/lejuAdmin/companyAddress/${id}`,
        method: 'get'
    })
}
// 保存新增地址
function saveAddress(data) {
    return request({
        url: `/lejuAdmin/companyAddress/save`,
        method: 'post',
        data
    })
}
export {
    addressList,
    setReceiveOne,
    setSendOne,
    updateAddress,
    deleteAddress,
    addressDetail,
    saveAddress
}