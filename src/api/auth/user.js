// 引入封装好的axios
import request from '@/api/request'

// 获取用户列表
function findUsersByPage(start, limit, data) {
    return request({
        url: `/admin/sysAuth/user/findUsersByPage/${start}/${limit}`,
        method: 'POST',
        data
    })
}

function saveUserRoles(data) {
    return request({
        url: '/admin/sysAuth/user/saveUserRoles',
        method: 'POST',
        data
    })
}
function updateUserRoles(data) {
    return request({
        url: '/admin/sysAuth/user/updateUserRoles',
        method: 'PUT',
        data
    })
}

function removeUser(id) {
    return request({
        url: `/admin/sysAuth/user/removeUser/${id}`,
        method: 'DELETE'
    })
}
/**
 * 根据用户id获取角色
 * @param {} userId
 */
function findUserInfo(userId) {
    return request({
        url: `/admin/sysAuth/user/${userId}`,
        method: 'GET'
    })
}

export default {
    findUsersByPage,
    saveUserRoles,
    updateUserRoles,
    findUserInfo,
    removeUser

}
