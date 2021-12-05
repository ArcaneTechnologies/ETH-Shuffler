// Imports
let EthWalletAPI = require('./api')
let Web3 = require('web3')
let Tx = require('ethereumjs-tx').Transaction
let axios = require('axios')

// Settings
let Wei = 10**18
let ABI   = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"DealShuffledFunds","type":"event"},{"inputs":[],"name":"CJA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"addrSpace","type":"address[]"}],"name":"storeAddresses","outputs":[],"stateMutability":"payable","type":"function"}]
let cAddr = '0x3e4dce69cec268b4d5e4f45f0a44118ad483e6f3'

// Main Code
class ETHWallet {
  constructor() {
    this.api         = new EthWalletAPI();
    this.url_main    = "https://mainnet.infura.io/v3/4ae1a7cf65794f9dbb5222f2e10316c8"
    this.url_rinkeby = "https://rinkeby.infura.io/v3/4ae1a7cf65794f9dbb5222f2e10316c8"
    this.url_ropsten = "https://ropsten.infura.io/v3/4ae1a7cf65794f9dbb5222f2e10316c8"
    this.url_kovan   = "https://kovan.infura.io/v3/4ae1a7cf65794f9dbb5222f2e10316c8"
    this.url_goerli  = "https://goerli.infura.io/v3/4ae1a7cf65794f9dbb5222f2e10316c8"
    this.url         = this.url_main // Default Network is the Ethereum Mainnet
    
    // Array to hold all accounts for a user
    this.keychain = []
  }

  ShowWallet(i=0) {
    return this.keychain[i]
  }

  SwitchNetwork(net) {
    switch(net) {
      case "main":
        this.url = this.url_main; break
      case "rinkeby":
        this.url = this.url_rinkeby; break
      case "ropsten":
        this.url = this.url_ropsten; break
      case "kovan":
        this.url = this.url_kovan  ; break
      case "goerli":
        this.url = this.url_goerli ; break
      default:
        console.error("Error: Network Not Supported --- Default to Mainnet")
        this.url = this.url_main
    }
  }

  NewWallet(net,key=false) {
    return new Promise((resolve, reject) => {
      try {
        // Switch Network if Necessary, and Establish Connection
        if (net !== "main") {this.SwitchNetwork(net)}
        let accounts = new Web3(new Web3.providers.HttpProvider(this.url)).eth.accounts
        
        // Create New Account (or Import Old Account, using a Private Key)
        let Account = key ? accounts.privateKeyToAccount(key) : accounts.create()
        if (!key) this.keychain.push(Account)
        resolve(Account)
      } catch (err) { reject(err) }
    });
  }

  AccountBalance(net,Address=this.keychain[0].address) {
    return new Promise(async (resolve,reject) => {
      try {
        // Switch Network if Necessary, and Establish Connection
        if (net !== "main") {this.SwitchNetwork(net)}
        let web3 = new Web3(this.url)

        // Fetch Address Balance in ETH
        let balance = web3.utils.fromWei(await web3.eth.getBalance(Address), "ether")
        resolve(Number(balance))
      } catch (err) { reject(err) }
    })
  }

  getCurrentGasPrices() {
    return new Promise((resolve, reject) => {
      axios.get('https://ethgasstation.info/json/ethgasAPI.json').then(response => {
        resolve({
          low: response.data.safeLow / 10,
          medium: response.data.average / 10,
          high: response.data.fast / 10
        })
      }).catch(error => reject(error))
    })
  }
  
  PrivateFromPublic(Address,Array=this.keychain) {
    return new Promise((resolve, reject) => {
      try {
        resolve(Array[Array.map(x => x.address).indexOf(Address)].privateKey)
      } catch (err) { reject('ERROR: Address not Found') }
    })
  }
  
  // Entered Amounts in Ether
  SendTransaction(net,SenderAddress,SenderPrivKey,ReceiverAddress,TxAmount) {
    return new Promise((resolve,reject) => {
      try {
        // Switch Network if Necessary, and Establish Connection
        if (net !== "main") {this.SwitchNetwork(net)}
        let web3 = new Web3(new Web3.providers.HttpProvider(this.url))
        
        // Validation Check
        this.AccountBalance(net,SenderAddress).then(balance => {
          if(balance < TxAmount) { reject('ERROR: Insufficient Funds') }
        }).catch(err => reject(err))

        // Transaction Code
        web3.eth.getTransactionCount(SenderAddress,(err,txcount) => {
          if (err) reject(err)
          this.getCurrentGasPrices().then(gasPrices => {
            // Pt[1/3]: Make Transaction
            // let gasPrice = gasPrices.low * 1000000000; // x1gwei
            let TxObject = {
              nonce: web3.utils.toHex(txcount),
              to: ReceiverAddress,
              value: web3.utils.toHex(web3.utils.toWei(TxAmount.toString(), "ether")),
              gasLimit: web3.utils.toHex(21000),
              gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei"))
            }
        
            // Pt[2/3]: Sign Transaction
            let tx = new Tx(TxObject,{"chain":net})
            let privKey = Buffer.from((SenderPrivKey.split("0x"))[1],'hex')
            tx.sign(privKey)

            // Pt[3/3]: Post Transaction
            let SerializedTx = tx.serialize()
            let RawTx = '0x' + SerializedTx.toString("hex")
            web3.eth.sendSignedTransaction(RawTx,(err,txhash) => {
              if (err) {reject(err)} else resolve(txhash)
            })
          })
        })
      } catch (err) { reject(err) }
    })
  }
}

module.exports = new ETHWallet();