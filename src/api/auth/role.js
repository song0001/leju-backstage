// 引入封装好的axios
import request from '@/api/request'

// 获取角色列表
function findRolesByPage(start, limit, data) {
    return request({
        url: `/admin/sysAuth/role/findRolesByPage/${start}/${limit}`,
        method: 'GET',
        data
    })
}
function findAllRoles() {
    return request({
        url: `/admin/sysAuth/role/findAllRoles`,
        method: 'GET'
    })
}

function removeRole(id) {
    return request({
        url: `/admin/sysAuth/role/removeRole/${id}`,
        method: 'DELETE'
    })
}

function saveRolePermissions(data) {
    return request({
        url: `/admin/sysAuth/role/saveRolePermissions`,
        method: 'POST',
        data
    })
}

function updateRolePermissions(data) {
    return request({
        url: `/admin/sysAuth/role/updateRolePermissions`,
        method: 'PUT',
        data
    })
}

function getRolePermissions(id) {
    return request({
        url: `/admin/sysAuth/role/findRolePermissions/${id}`,
        method: 'GET'
    })
}

export default {
    findRolesByPage,
    removeRole,
    saveRolePermissions,
    updateRolePermissions,
    getRolePermissions,
    findAllRoles
}
