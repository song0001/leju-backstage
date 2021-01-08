import request from '@/api/request'
// 添加限时活动
function addRecommend(data) {
    return request({
        url: `/lejuAdmin/homeRecommend/addRecommend`,
        method: 'POST',
        data
    })
}
// 删除限时活动
function delRecommend(recommendId) {
    return request({
        url: `/lejuAdmin/homeRecommend/delRecommend/${recommendId}`,
        method: 'DELETE',

    })
}
// 活动列表
function findAllRecommends() {
    return request({
        url: `/lejuAdmin/homeRecommend/findAllRecommends`,
        method: 'GET',

    })
}
//修改限时活动
function updateRecommend() {
    return request({
        url: `/lejuAdmin/homeRecommend/updateRecommend`,
        method: 'POST',

    })
}
export {
    addRecommend,
    delRecommend,
    findAllRecommends,
    updateRecommend
}