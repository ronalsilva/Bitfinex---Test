function validateOrder(order) {

    if (!order) {
        return false;
    }
  
    if (order.orderType != 'BUY' && order.orderType != 'SELL') {
        return false;
    }
  
    if (typeof order.quantity !== 'number' || order.quantity <= 0) {
        return false;
    }
  
    if (typeof order.price !== 'number' || order.price <= 0) {
        return false;
    }
  
    if (typeof order.asset !== 'string' || order.asset.trim() === '') {
        return false;
    }
  
    return true;
}
  
module.exports = {
    validateOrder
};