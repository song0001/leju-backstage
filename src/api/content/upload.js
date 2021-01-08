import request from '@/api/request'
// 上传图片地址
function upload(data) {
    return request({
        url: `/lejuAdmin/material/uploadFileOss`,
        method: 'POST',
        data
    })
}
//查询素材列表
function findMaterialByPage(start, limit) {
    return request({
        url: `/lejuAdmin/material/findMaterialByPage/${start}/${limit}`,
        method: 'get',

    })
}
// 删除
function materialDeleteApi(id) {
    return request({
        url: `/lejuAdmin/material/delMaterial/${id}`, // 相对路径
        method: 'delete'

    })
}
export {
    upload,
    findMaterialByPage,
    materialDeleteApi
}