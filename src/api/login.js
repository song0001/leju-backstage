import request from '@/api/request'
// 登录接口
function login(data) {
    return request({
        url: '/lejuAdmin/index/login',
        method: 'POST',
        data
    })
}
// 首页大屏数据 仪表盘统计
function getDashboardData() {
    return request({
        url: '/lejuAdmin/dashboard/baseData',
        method: 'GET'

    })
}
export {
    login,
    getDashboardData
}