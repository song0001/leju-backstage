import request from '@/api/request'
// 获取文章列表
function getArticleList(start, limit, data) {
    return request({
        url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
        method: 'POST',
        data
    })
}
// 删除文章
function delArticle(id) {
    return request({
        url: `/lejuAdmin/productArticle/del/${id}`,
        method: 'DELETE'
    })
}

export {
    getArticleList,
    delArticle
}