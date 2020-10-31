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

    tokenFarm = await TokenFarm.at('0x267a12fEE79d1A83A77dFE974bDe1837A00adF1e')


  })

  // Start Testing
  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'TITSASSsuka')
    })

    it('contract has tokens', async () => {
      let balance = await tokenFarm.balanceOf(owner)
      assert.equal(balance.toString(), tokens('10000'))
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
  
  })
})
})
