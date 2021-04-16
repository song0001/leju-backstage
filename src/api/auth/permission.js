// 引入封装好的axios
import request from '@/api/request'

// 获取用户列表
function findAllPermissions(data) {
    return request({
        url: '/admin/sysAuth/permission/findAllPermissions',
        method: 'GET',
        data
    })
}
function removePermission(id) {
    return request({
        url: `/admin/sysAuth/permission/remove/${id}`,
        method: 'DELETE'
    })
}
function savePermission(data) {
    return request({
        url: `/admin/sysAuth/permission/save`,
        method: 'POST',
        data
    })
}
function saveInitMenus(data) {
    return request({
        url: `/admin/sysAuth/permission/saveInitMenus`,
        method: 'POST',
        data
    })
}
function updatePermission(data) {
    return request({
        url: `/admin/sysAuth/permission/update`,
        method: 'PUT',
        data
    })
}
/**
 * 给角色分配权限
 * @param {*} data
 */
function saveRolePermission(data) {
    return request({
        url: `/admin/sysAuth/permission/saveRolePermission`,
        method: 'POST',
        data
    })
}
/**
 * 根据角色获取菜单
 * @param {*} roleId
 */
function selectAllMenu(roleId) {
    return request({
        url: `/admin/sysAuth/permission/selectAllMenu/${roleId}`,
        method: 'GET'
    })
}
export default {
    findAllPermissions,
    removePermission,
    savePermission,
    updatePermission,
    saveRolePermission,
    selectAllMenu,
    saveInitMenus
}
