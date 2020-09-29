pragma solidity ^0.6.12;

library SafeMath{
      function mul(uint256 a, uint256 b) internal pure returns (uint256) 
    {
        if (a == 0) {
        return 0;}
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) 
    {
        uint256 c = a / b;
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) 
    {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) 
    {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }

}

contract TokenFarm {
    using SafeMath for uint256;
    string public name = "Decentralife Token Farm";
    address public owner;
    address private decentralifeContract = 0xB50becf0152A3b41622B90d8ABebB3F3a09B98B4;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor() public {
        owner = msg.sender;
    }

function stakeTokens(uint256 _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        // Fetch staking balance
        uint256 balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }
    
    function Time_call() returns (uint256){
        return block.number; 
    }

    // Issuing Tokens
function issueTokens() public {
        // Only owner can call this function
      require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint256 i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint256 bankCommission = stakingBalance[recipient].div(2);
            uint256 balance = stakingBalance[recipient].sub(bankCommission);
            if(balance > 0) {
                decentralifeContract.call(abi.encodeWithSignature("transfer(recipient, balance)", msg.sender, value, hex"0000000000"));
                stakingBalance[owner] = stakingBalance[owner].add(bankCommission);
            }
        }
    }
}
