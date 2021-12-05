// ------ API Calls ------ //
let WebAPI = require('./src/api')
let myapi = new WebAPI()

// Test EthNetInfo()
// myapi.EthNetInfo().then(console.log)

// Test BlockInfo()
// myapi.BlockInfo(1663353).then(console.log)

// Test TxInfo()
// let txhash = '0x12f8ecac2b8ef25cd0d4312b5d3b8028783a1d60e921789ca3ff1cfd0019a041'
// let txhash = '0xba3bc826d21383d810e0cee6d6ecb830a463a4aa9f1d824076713a9c8053d256' // Ropsten
// myapi.TxInfo(txhash).then(console.log)

// Test ByContract()
// let txhash = "0x8daca9b6d92cd2aa34ed6b2c6c6ce6184b74728e4d71f82c29d68631cdf9b61b"
// myapi.ByContract(txhash).then(console.log)

// Test IsConfirmed()
// let txhash = "0x12f8ecac2b8ef25cd0d4312b5d3b8028783a1d60e921789ca3ff1cfd0019a041"
// myapi.IsConfirmed(txhash).then(console.log)

// Test AccountTxs()
// let address = "0x99c85bb64564d9ef9a99621301f22c9993cb89e3"
// myapi.AccountTxs(address).then(console.log)


// ------ Wallet Source Code ------ //
let mywallet = require('./src/wlt')

// Test NewWallet()
// mywallet.NewWallet()
// mywallet.NewWallet('ropsten')
// console.log(mywallet.keychain)
// console.log(mywallet.ShowWallet())
// mywallet.NewWallet('ropsten',mywallet.keychain[0].privateKey).then(console.log)

// Test AccountBalance()
// let address = "0x6635F83421Bf059cd8111f180f0727128685BaE4"
// mywallet.AccountBalance("rinkeby", address).then(console.log)
// mywallet.AccountBalance().then(console.log)

// Test getCurrentGasPrices()
// mywallet.getCurrentGasPrices().then(console.log)
// mywallet.getCurrentGasPrices().then(info => console.log(info.low))

// Test PrivateFromPublic()
// mywallet.PrivateFromPublic(mywallet.keychain[0].address).then(console.log)
// mywallet.PrivateFromPublic(address).then(console.log)

// Test SendTransaction()
// let address1 = "0x79e11d77f141ccf35136d338c81db3ff65f44a9a"
// let PrivKey1 = "0x482977d941978b8b461aaf8923d33d85aa7facd2f599927e809dbf698ea81e18"
// let address2 = "0xd0bff17f21c1c929e71d1c8ab0d54796c046e4e4"
// mywallet.AccountBalance("ropsten", address1).then(info => console.log('Balance 1: '+info))
// mywallet.AccountBalance("ropsten", address2).then(info => console.log('Balance 2: '+info))
// mywallet.SendTransaction("ropsten", address1, PrivKey1, address2, 0.3).then(info => console.log('TX HASH: '+info))