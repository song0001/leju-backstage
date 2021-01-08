import request from '@/api/request'
// 查询注册用户列表
function findMembersByPage(start, limit, data) {
    return request({
        url: `/lejuAdmin/member/findMembersByPage/${start}/${limit}`,
        method: 'get',
        data
    })
}

export {
    findMembersByPage
}