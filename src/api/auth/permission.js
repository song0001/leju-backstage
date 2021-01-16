// 引入封装好的axios
import request from '@/api/request'

// 查询所有菜单
function findAllPermissions(data) {
    return request({
        url: '/admin/sysAuth/permission/findAllPermissions',
        method: 'GET',
        data
    })
}
// 删除菜单权限
function remove(id) {
    return request({
        url: `/admin/sysAuth/permission/remove/${id}`,
        method: 'DELETE'
    })
}
// 新增菜单权限
function save(data) {
    return request({
        url: `/admin/sysAuth/permission/save`,
        method: 'POST',
        data
    })
}
// 初始化菜单权限
function saveInitMenus(data) {
    return request({
        url: `/admin/sysAuth/permission/saveInitMenus`,
        method: 'POST',
        data
    })
}
// 修改菜单权限
function update(data) {
    return request({
        url: `/admin/sysAuth/permission/update`,
        method: 'PUT',
        data
    })
}

//   给角色分配权限
function saveRolePermission(data) {
    return request({
        url: `/admin/sysAuth/permission/saveRolePermission`,
        method: 'POST',
        data
    })
}

//  根据角色获取菜单
function selectAllMenu(roleId) {
    return request({
        url: `/admin/sysAuth/permission/selectAllMenu/${roleId}`,
        method: 'GET'
    })
}
export {
    findAllPermissions,
    remove,
    save,
    update,
    saveRolePermission,
    selectAllMenu,
    saveInitMenus
}