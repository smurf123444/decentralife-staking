const TokenFarm = artifacts.require('../contracts/TokenFarm.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
  let tokenFarm

  before(async () => {
    // Load Contracts

    tokenFarm = await TokenFarm.at('0x0c10C469Ea23f24cD7ED71402120D5688C073e9B')


  })

  // Start Testing
  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'TITSASSsuka')
    })
  })

  describe('Farming tokens', async () => {

    it('Staking to Token Farm', async () => {
      let result

        await tokenFarm.approve(tokenFarm.address, tokens('100'), { from: owner })
        await tokenFarm.stakeTokens(tokens('100'))
        result = await tokenFarm.stakingBalance(owner)
        assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')
        result = await tokenFarm.isStaking(owner)
        assert.equal(result.toString(), 'true', 'investor staking status correct after staking')
    })

    it('UnStaking to Token Farm', async () => {
      let result


        await tokenFarm.unstakeTokens({ from: owner })
        result = await tokenFarm.stakingBalance(owner)
        assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')
        result = await tokenFarm.isStaking(owner)
        assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
    })
/*
    it('issuing Stake.', async () => {
      await tokenFarm.issueTokens()
      // Issue Tokens
      

      // Check balances after issuance
      result = await tokenFarm.stakingBalance(owner)
      assert.equal(result.toString(), tokens('100'), 'investor DApp Token wallet balance correct affter issuance')

      // Ensure that only onwer can issue tokens
      await tokenFarm.issueTokens({ from: investor }).should.be.rejected;

      // Unstake tokens
      await tokenFarm.unstakeTokens({ from: owner })

      // Check results after unstaking
      result = await tokenFarm.balanceOf(owner)
      assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct after staking')


      result = await tokenFarm.stakingBalance(owner)
      assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')

      result = await tokenFarm.isStaking(owner)
      assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
  
  })*/
  it('Transfer Tokens Repedetly.', async () => {
    var i, t;
    await tokenFarm.approve(investor, tokens('100000'), { from: investor })
    await tokenFarm.approve(owner, tokens('100000'), { from: owner})
    for(i = 0; i < 1000000; i++){
      t = 100;
      await tokenFarm._transfer(investor, tokens((t--).toString()), { from: owner })
      await tokenFarm._transfer(owner, tokens((t--).toString()), { from: investor })
      if (t === 0)
      {
        t = 100;
      }
    }

})

})
})
