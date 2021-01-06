var leju_token = 'leju-token'
var user_info = 'userInfo'
    // 注意!!! localStorage 只能存储字符串
    // 存token
export function setToken(token) {
    window.localStorage.setItem(leju_token, token)
}

//存userInfo
export function setUserInfo(obj) {
    window.localStorage.setItem(user_info, JSON.stringify(obj))
}
// 获取token
export function getToken() {
    return window.localStorage.getItem(leju_token)
}
// 获取userInfo
export function getUserInfo() {
    return window.localStorage.getItem(user_info)
}

// 删除token
export function removeToken() {
    return window.localStorage.removeItem(leju_token)
}

//删除用户
export function removeUserInfo() {
    return window.localStorage.removeItem(user_info)
}
// 全部删除
export function clearAll() {
    removeToken()
    removeUserInfo()
}