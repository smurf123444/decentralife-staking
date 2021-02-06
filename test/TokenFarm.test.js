const TokenFarm = artifacts.require('../contracts/TokenFarm.sol')
const timeMachine = require('ganache-time-traveler');
const helper = require("./helpers/helpers");
  /*

Deploy COntract

Start Day 1

Deposit ether to contract

Wait 1 day (day 2)

Exit from contract lobby

Stake tokens to contract

Wait another day (day 3)

Unstake Tokens

Check balance of tokens

Send some to another address

Send it back to main address 

Repeat last 2 steps 100 times in a loop.
*/

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor, patron]) => {
  let tokenFarm
  before(async () => {
    // Load Contracts
//step 1
    tokenFarm = await TokenFarm.at('0x1B39FB31b18E87d5082872732f0c192e6f261f0b')
})


describe('Test Sequence Begin: ', async () => {
//step 2
it('Time Dependent Test', async () => {
       await timeMachine.advanceTimeAndBlock(86400);
});

//step 3
it('Enter the XF lobby with 1 token (ether)', async () => {
    var i, t;
    await tokenFarm.xfLobbyEnter(owner, { value: tokens('1')})
});
//step 4
it('Advance 1 day into future for exit of XF lobby (Day 2)', async () => {
  await timeMachine.advanceTimeAndBlock(86400);
});
//step 5
it('Exit XF lobby with proper values', async () => {
  var i, t;
  await tokenFarm.xfLobbyExit('1', '0',{ from: owner })
});
//step 6
it('Start the Staking process', async () => {
  var i, t;
  await tokenFarm.stakeStart(tokens('.0001'), 1,{ from: owner })
});
//step 7
it('Advance 1 day into future for exit of Stake (Day 3)', async () => {
  await timeMachine.advanceTimeAndBlock(86400);
});
//step 8
it('End the Staking process', async () => {
  var i, t;
  await tokenFarm.stakeEnd('0', '1',{ from: owner })
});
//step 9
it(' Check Balance if greater than 0', async () => {
  result = await tokenFarm.balanceOf(owner)
  assert.equal(result.toString(), '68078631041488049', 'owner has some tokens (YAY!)')
})

});


//step 10
/*
it('Transfer Tokens Repedetly.', async () => {
    var i, t;
    t = .0001;
    await tokenFarm.approve(investor, '100', { from: owner })

    await tokenFarm.approve(patron, '100', { from: owner })
    await tokenFarm.transfer(investor, '100', { from: owner })
    await tokenFarm.transfer(patron, '100', { from: owner })

    for(i = 0; i < 100; i++){
      await tokenFarm.transfer(patron, tokens('1'), { from: investor })
      await tokenFarm.transfer(investor, tokens('1'), { from: patron })
    
    }

})
*/
/*
  // Start Testing
  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'HEX')
    })
  })
  beforeEach(async() => {
       let snapshot = await timeMachine.takeSnapshot();
       snapshotId = snapshot['result'];
   });
 
   afterEach(async() => {
       await timeMachine.revertToSnapshot(snapshotId);
   });

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
  */


})
