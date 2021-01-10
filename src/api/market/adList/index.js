import request from '@/api/request'
//新增广告
function addAds(data) {
    return request({
        url: '/lejuAdmin/advertise/addAds',
        method: 'post',
        data
    })
}
// 查看广告列表
function adsList() {
    return request({
        url: '/lejuAdmin/advertise/adsList',
        method: 'get'

    })
}
//删除广告
function delAds(adsId) {
    return request({
        url: `/lejuAdmin/advertise/delAds/${adsId}`,
        method: 'delete'
    })
}
// 更新广告
function updateAds(data) {
    return request({
        url: `/lejuAdmin/advertise/updateAds`,
        method: 'post',
        data
    })
}
export {
    addAds,
    adsList,
    delAds,
    updateAds
}