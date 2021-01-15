import request from '@/api/request'
//  账号管理 (用户管理)

// 获取用户分页列表
function findUsersByPage(start, limit, data) {
    return request({
        url: `/admin/sysAuth/user/findUsersByPage/${start}/${limit}`,
        method: 'POST',
        data
    })
}
// 删除管理用户
function removeUser(id) {
    return request({
        url: `/admin/sysAuth/user/removeUser/${id}`,
        method: 'DELETE'
    })
}
// 新增用户
function saveUserRoles(data) {
    return request({
        url: '/admin/sysAuth/user/saveUserRoles',
        method: 'POST',
        data
    })
}
// 更新用户
function updateUserRoles(data) {
    return request({
        url: '/admin/sysAuth/user/updateUserRoles',
        method: 'PUT',
        data
    })
}

// 获取用户明细
function user(userId) {
    return request({
        url: `/admin/sysAuth/user/${userId}`,
        method: 'GET'
    })
}

export {
    findUsersByPage,
    removeUser,
    saveUserRoles,
    updateUserRoles,
    user
}