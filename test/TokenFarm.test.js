const DaiToken = artifacts.require('DaiToken')
const DappToken = artifacts.require('DECENTRALIFEe')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm

  before(async () => {
    // Load Contracts
    daiToken = await DaiToken.new()
    dappToken = await DappToken.new()
    tokenFarm = await TokenFarm.new(daiToken.address, dappToken.address)

    // Transfer all Dapp tokens to farm (1 million)
    await dappToken.transfer(tokenFarm.address, tokens('1000000'))
    await dappToken.allowAddress(investor, true, { from: owner })

    // Send tokens to investor
    await daiToken.transfer(investor, tokens('100'), { from: owner })
  })

  describe('Mock DAI deployment', async () => {
    it('has a name', async () => {
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

  describe('DECENTRALIFE deployment', async () => {
    it('has a name', async () => {
      const name = await dappToken.name()
      assert.equal(name, 'DECENTRALIFE')
    })
  })

  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'Decentralife Token Farm')
    })

    it('contract has tokens', async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
    it('balance from dai token returned', async () => {
      let balance = await daiToken.balanceOf(investor)
      assert.equal(balance.toString(), tokens('100'))
    })
  })

  describe('Farming tokens', async () => {

    it('checking balance of investor is equal to 100', async () => {
      let result

      // Check investor balance before staking
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')
      await dappToken.allowAddress(investor, true, { from: owner })
      await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor })
    })
      // Stake Mock DAI Tokens
      it('checking allowance of investor for dai', async () => {
      result = await daiToken.allowance(investor,tokenFarm.address)
      console.log("HERE IS INFO")
      console.log(result)
      console.log("HERE IS INFO")
      })

     it('allow for transfer of Decentralife token for investor', async () => {
      let result
     result = await dappToken.canTransfer(investor)
  
     assert.equal(result.toString(), 'true', 'Investor is allowed for payout')
     })
     
     it('approving of daiToken to allow tokenFarm to transfer 100 on investors Behalf', async () => {
     await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor })
    })

    it('Staking to TokenFarm from Investor', async () => {
     await tokenFarm.stakeTokens(tokens('100'), { from: investor })
    })

     it('Investor has 0 mDai from staking to TokenFarm', async () => {
      let result
      // Check staking result
      result = await daiToken.balanceOf(investor)
      
      assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance correct after staking')
    })

    it('TokenFarm has 100 mDai from investor Staking', async () => {
      let result
      result = await daiToken.balanceOf(tokenFarm.address)
      
      assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI balance correct after staking')
    })

    it('Balance currently staked is correct', async () => {
      let result
      result = await tokenFarm.stakingBalance(investor)
      
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')
    })


    it('Staking Boolean returned true for investor', async () => {
      let result
      result = await tokenFarm.isStaking(investor)
      
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking')
    })


    it('Owner allows tokenFarm to transfer dappTokens.', async () => {
      //ALLOW DAPP TOO TRANSFER DECENTRALIFE
      await dappToken.allowAddress(tokenFarm.address, true, { from: owner })
    })


    it('Issuing tokens to stake holders.', async () => {
      // Issue Tokens
      await tokenFarm.issueTokens({ from: owner })
    })

    it('rewards investors for staking mDai tokens', async () => {
        let result;
      // Check balances after issuance
      result = await dappToken.balanceOf(investor)
      
      assert.equal(result.toString(), tokens('100'), 'investor DApp Token wallet balance correct affter issuance')
    })


    it('Issuing tokens to stake holders from third party (should be rejected)', async () => {
      // Ensure that only onwer can issue tokens
      await tokenFarm.issueTokens({ from: investor }).should.be.rejected;
    })


    it('Unstaking Tokens', async () => {
      // Unstake tokens
      await tokenFarm.unstakeTokens({ from: investor })
    })


      it('Balance returned to investor after unstaking.', async () => {
        let result;
      // Check results after unstaking
      result = await daiToken.balanceOf(investor)
      
      assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct after staking')
    })

    it('TokenFarm mDai balance should reduce to 0', async () => {
      result = await daiToken.balanceOf(tokenFarm.address)
      
      assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI balance correct after staking')
    })
    it('Staking balance of investor reduces to 0', async () => {
      result = await tokenFarm.stakingBalance(investor)
      
      assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')
    })
    it('Investor is NOT staking anymore...', async () => {
      result = await tokenFarm.isStaking(investor)
      
      assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
    })
  })

})
