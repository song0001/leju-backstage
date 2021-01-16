import request from '@/api/request'
//  角色管理

// 获取角色分页列表
function findRolesByPage(start, limit, data) {
    return request({
        url: `/admin/sysAuth/role/findRolesByPage/${start}/${limit}`,
        method: 'GET',
        data
    })
}
// 查询所有角色
function findAllRoles() {
    return request({
        url: `/admin/sysAuth/role/findAllRoles`,
        method: 'GET'
    })
}
// 删除角色
function removeRole(id) {
    return request({
        url: `/admin/sysAuth/role/removeRole/${id}`,
        method: 'DELETE'
    })
}
// 新增角色
function saveRolePermissions(data) {
    return request({
        url: `/admin/sysAuth/role/saveRolePermissions`,
        method: 'POST',
        data
    })
}
// 修改角色和权限
function updateRolePermissions(data) {
    return request({
        url: `/admin/sysAuth/role/updateRolePermissions`,
        method: 'PUT',
        data
    })
}
// 获取角色明细
function role(id) {
    return request({
        url: `/admin/sysAuth/role/${id}`,
        method: 'GET'
    })
}

export {
    findRolesByPage,
    removeRole,
    saveRolePermissions,
    updateRolePermissions,
    findAllRoles,
    role
}