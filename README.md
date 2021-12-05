# ETH-Shuffler
Ethereum coinshuffling is based on an asynchronous implementation of the Web3JS library to communicate with the ethereum blockchain (main and testnets included), collaborating with the Ethereumjs-tx library, used to issue transactions, deploy & call smart contracts programmatically. It is built entirely in javascript and is designed with interoperability in mind. This template can - and is intended - to be integrated into multiple platforms along with the final wallet software produced by the development team of ARCANE TECHNOLOGIES.


# Diclaimer - APIs Used
## This work was made possible and further facilitated via use of the following API services:
API Service       | Homepage URL                                    | API Documentation
----------------- | ----------------------------------------------- | ---------------------------------------------------------
Blockcypher       | [blockcypher.com](https://www.blockcypher.com/) | https://www.blockcypher.com/dev/bitcoin/


# Brief Description
Ethereum shuffling applies by collecting, mixing and finally redistributing funds payable to a smart contract that, currently in its alpha-version, accepts a list of addresses for each caller along with currency to shuffle. By default, once the number of participants reaches 3, the collected funds will be forwarded to each of the addresses provided in equal outputs of a constant 5 mETH (0.005 ETH). None of the state variables capture the addresses or the balances of each caller for sake of their privacy and only a single event is emitted to notify that the shuffling round is completed.

![ss1.png](https://github.com/ArcaneTechnologies/ETH-Shuffler/blob/main/screenshots/ss1.png)

# Technical Documentation
Developers (and all else both interested and technically knowledgeable) may study the documentation behind the web3.js library here:
1. Web3JS Documentation - https://web3js.readthedocs.io/en/v1.4.0/