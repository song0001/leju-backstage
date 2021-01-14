// 用于存放所有的全局 过滤器方法
// import NP from 'number-precision'
/**
 * 把以分为单位的number转换为元为单位的字符串并且保留两位小数
 */
function money(v, n) {
    // v/100 并且保留2位小数  在关于钱的计算上 是否采用四舍五入是需要根据具体场景的
    // 我们这里最小单位是分 所以也不存在问题
    return (n || '') + v
}

function initAttrArr(v) {
    var reg = /^\[\{\"/ig
    if (reg.test(v)) {
        const arr = JSON.parse(v)
        let str = ''
        arr.forEach(ele => {
            str = str + ele.key + ':' + ele.value + ' '
        })
        return str
    } else {
        return v
    }
}
// function money(v, n) {
//     // v/100 并且保留2位小数  在关于钱的计算上 是否采用四舍五入是需要根据具体场景的
//     // 我们这里最小单位是分 所以也不存在问题
//     return (n || '') + NP.round(v / 100, 2)
// }

export default {
    money,
    initAttrArr
}