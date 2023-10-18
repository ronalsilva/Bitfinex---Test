'use strict';

const { PeerRPCClient } = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const readline = require('readline');

const link = new Link({
    grape: 'http://127.0.0.1:30001',
});
link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function sendOrder(order) {
    peer.request('exchange', order, { timeout: 10000 }, (err, data) => {
        if (err) {
            console.error(err);
            console.log('Failed to send the order.');
        } else {
            console.log(data.status);
        }

        rl.prompt();
    });
}

rl.setPrompt('Enter your order (e.g., "buy 10 shares at 50" or "sell 5 shares at 60"): ');
rl.prompt();

rl.on('line', (input) => {
    const inputData = input.split(' ');
    const [action, quantity, asset, price] = inputData.filter(item => item != "at");
    
    if (action && quantity && asset && price) {
        const order = {
            type: 'order',
            orderType: action.toUpperCase(),
            quantity: parseInt(quantity, 10),
            asset,
            price: parseFloat(price),
        };

        console.log(order);
        sendOrder(order);
    } else {
        console.log('Invalid input. Please use the format "buy/sell quantity asset at price".');
        rl.prompt();
    }
}).on('close', () => {
    console.log('Client disconnected.');
    process.exit(0);
});