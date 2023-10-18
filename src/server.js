'use strict';

const { PeerRPCServer } = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const { OrderBook, OrderType } = require('./orderbook');
const { validateOrder } = require('./utils/validation');

const link = new Link({
    grape: 'http://127.0.0.1:30001',
});
link.start();

const peer = new PeerRPCServer(link, {
    timeout: 300000,
});
peer.init();

const port = 1024 + Math.floor(Math.random() * 1000);

const service = peer.transport('server');
service.listen(port);
console.log('listening on', service.port)

setInterval(() => {
    link.announce('exchange', service.port, {});
}, 1000);

const orderBook = new OrderBook();

service.on('request', (rid, key, payload, handler) => {

    if (validateOrder(payload)) {
        if (payload.type === 'order') {
            if (payload.orderType === OrderType.BUY) {
                const matchedOrders = orderBook.matchSellOrder(payload);
    
                if (matchedOrders.length > 0) {
                    for (const matchedOrder of matchedOrders) {
                        executeOrder(payload, matchedOrder);
                        handler.reply(null, { status: 'Execute the order and notify those involved' });
                    }
                } else {
                    orderBook.addBuyOrder(payload);
                    handler.reply(null, { status: 'add the buy order to the list of orders' });
                }
            } else if (payload.orderType === OrderType.SELL) {
                const matchedOrders = orderBook.matchBuyOrder(payload);
                
                if (matchedOrders.length > 0) {
                    for (const matchedOrder of matchedOrders) {
                        executeOrder(matchedOrder, payload);
                        handler.reply(null, { status: 'Execute the order and notify those involved' });
                    }
                } else {
                    orderBook.addSellOrder(payload);
                    handler.reply(null, { status: 'add the sales order to the list of orders' });
                }
            }
        }
    } else {
        handler.reply(null, { status: 'Invalid order' });
    }
});

function executeOrder(buyOrder, sellOrder) {
    console.log('Function to execute the order');
    console.log('Buy Order:')
    console.log(buyOrder)
    console.log('Sell Order:')
    console.log(sellOrder)
}