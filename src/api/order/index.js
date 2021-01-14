import request from '@/api/request'

function findOrdersByPage(start, limit, data) { // 订单列表
    return request({
        url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`, // 相对路径
        method: 'post',
        data
    })
}

function orderDetail(orderId) { //查看订单明细
    return request({
        url: `/lejuAdmin/order/orderDetail/${orderId}`,
        method: 'get'
    })
}

function sendDone(data) { //确认发货
    return request({
        url: `/lejuAdmin/order/sendDone`,
        method: 'post',
        data
    })
}

function finishOrder(orderId) { //关闭订单
    return request({
        url: `/lejuAdmin/order/finishOrder/${orderId}`,
        method: 'post'

    })
}

function receiveProductsForce(orderId) { // 强制确认收货
    return request({
        url: `/lejuAdmin/order/receiveProductsForce/${orderId}`,
        method: 'post'

    })
}

function findReturnApply(start, limit, data) { // 退单列表API
    return request({
        url: `/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
        method: 'post',
        data
    })
}

function orderReturn(id) { // 退单明细
    return request({
        url: `/lejuAdmin/orderReturn/${id}`,
        method: 'get'
    })
}

function agreeApply(id, data) { // 同意退货
    return request({
        url: `/lejuAdmin/orderReturn/agreeApply/${id}`,
        method: 'post',
        data
    })
}

function rejectApply(id, data) { // 拒绝退货
    return request({
        url: `/lejuAdmin/orderReturn/rejectApply/${id}`,
        method: 'post',
        data
    })
}

function receiveProduct(id, data) { //收到退货
    return request({
        url: `/lejuAdmin/orderReturn/receiveProduct/${id}`,
        method: 'post',
        data
    })
}

export {
    findOrdersByPage,
    orderDetail,
    sendDone,
    finishOrder,
    receiveProductsForce,
    findReturnApply,
    orderReturn,
    agreeApply,
    rejectApply,
    receiveProduct
}