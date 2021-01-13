import request from '@/api/request'
// 获取分类列表
function getCategory() {
    return request({
        url: `/lejuAdmin/category/getAllCategory`,
        method: 'get'
    })
}
// 更新分类
function updateCategory(data) {
    return request({
        url: ` /lejuAdmin/category/updateCategory`,
        method: 'post',
        data
    })
}
export {
    getCategory,
    updateCategory
}