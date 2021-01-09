import request from '@/api/request'
// 查询全部
function brandList() {
    return request({
        url: '/lejuAdmin/brand/findAllBrand',
        method: 'get'
    })
}
export {
    brandList
}