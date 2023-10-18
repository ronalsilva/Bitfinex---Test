# Bitfinex P2P Exchange

## Description

The Bitfinex P2P Exchange is a simplified peer-to-peer (P2P) exchange system that allows clients to send buy and sell orders for financial assets. Each client has their own order book and orders are distributed to other clients. When a buy order matches a sell order, the exchange is executed and any remaining orders are added to the order book.

## Project Architecture

The project has the following folder structure:

- `src/`: Contains the project's source code.
  - `orderbook.js`: It represents the order book.
  - `validation.js`: Contains order validation functions.
  - `client.js`: Implements the client to interact with the server.
  - `server.js`: The main server that receives orders from clients.
- `node_modules/`: Contains the project's dependencies.
- `package.json`: Node.js configuration file that lists the project's dependencies.

## How to Run

1. Install the project dependencies: `npm i`

2. Start the Grape servers (you can run npm run grape1 and grape2):
    `grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'`
    `grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'`

3. Start the server: `npm run server`

4. Start the client: `npm run client`

## Example of use

- To send a sell order: `sell 5 ABC at 45`
- To send a purchase order: `buy 10 XYZ at 50`

## Limitations and Future Improvements

- The project is a simplified implementation and may not meet all the requirements of a real exchange system.
- Add customer authentication and improved security.
- Improve the order matching mechanism to handle more complex cases.

## Feedback :)

This project was developed as a test, even if the code was not to your liking, if possible send feedback with points of improvement, this will help me to grow even more as a professional, thank you very much.

Developed by Ronald Junger