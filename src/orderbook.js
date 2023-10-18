const OrderType = {
    BUY: 'BUY',
    SELL: 'SELL',
  };
  
  class OrderBook {
    constructor() {
        this.buyOrders = [];
        this.sellOrders = [];
    }
  
    addBuyOrder(order) {
        this.buyOrders.push(order);
    }
  
    addSellOrder(order) {
        this.sellOrders.push(order);
    }
  
    matchBuyOrder(buyOrder) {
        const matchedOrders = [];
        for (let i = 0; i < this.sellOrders.length; i++) {
            const sellOrder = this.sellOrders[i];

            console.log(buyOrder.price)
            console.log(sellOrder.price)

            if (buyOrder.asset === sellOrder.asset && buyOrder.price >= sellOrder.price) {
                matchedOrders.push(sellOrder);
                this.sellOrders.splice(i, 1);
                i--;
            }
        }
        return matchedOrders;
    }
  
    matchSellOrder(sellOrder) {
        const matchedOrders = [];
        for (let i = 0; i < this.buyOrders.length; i++) {
            const buyOrder = this.buyOrders[i];

            if (sellOrder.asset === buyOrder.asset && sellOrder.price <= buyOrder.price) {
                matchedOrders.push(buyOrder);
                this.buyOrders.splice(i, 1);
                i--;
            }
        }
        return matchedOrders;
    }
}
  
module.exports = {
    OrderBook,
    OrderType,
};