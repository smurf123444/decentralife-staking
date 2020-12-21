const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/' + '885661b2ff2f4167b4c6570a07306408'));
async function checkYFIPrice() {
    console.log(`Checking YFI Price now... @ ${now()} ...\n`)
    try {
      await 
        axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
          query: `
          {
            tokenDayDatas(first: 1, orderBy: date, orderDirection: desc,
             where: {
               token: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e"
             }
            ) {
               token{
                name
              }
               date
               priceUSD
            }
            }
          `
        })
        .then((res) => {
          for (const tokenDayDatas of res.data.data.tokenDayDatas) {
            var myYFI = parseFloat(tokenDayDatas.priceUSD)
            myYFI = myYFI.toPrecision(4)    
            myYFI = Math.ceil(myYFI)
           //console.log("inside func", myETH)
           YFIPriceArray.push(myYFI)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
      return
    }
  }

class TransactionChecker {
    web3;
    account;

    constructor(projectId, account) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/' + '885661b2ff2f4167b4c6570a07306408'));
        this.account = account.toLowerCase();
    }

    async checkBlock() {
        //let block = await this.web3.eth.getBlock(1920050);
        //let number = block.number;
        let i = 22682754;
        while (i < 22682764) {
            i++;
            let block = await this.web3.eth.getBlock(i);
            let number = block.number;
           // console.log('Searching block ' + number);
        if (block != null && block.transactions != null) {
          //  console.log(block.timestamp)


            for (let txHash of block.transactions) {
                //contract : 0x075e4f66c4d53dd2d37b91bd7382b34f3b681b4f
                let tx = await this.web3.eth.getTransaction(txHash);
              if (tx.to != null)
              {
              if ('0x075e4f66c4d53dd2d37b91bd7382b34f3b681b4f' == tx.to.toLowerCase()) {
                    console.log('Transaction found on block: ' + number);
                    console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
                }
            }
          }
        }
    }
    }
}


let txChecker = new TransactionChecker(process.env.INFURA_ID, '0x5bC8bf5A75D221fF30b2c2B2a7235D6aeEFF4A84');
//setInterval(() => {
    txChecker.checkBlock();

    //web3.eth.getBlock(10855106).then(console.log);
//}, 15 * 1000);