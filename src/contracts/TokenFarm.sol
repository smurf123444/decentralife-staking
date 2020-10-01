pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

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
    function concat(bytes memory a, bytes memory b)
            internal pure returns (bytes memory) {
        return abi.encodePacked(a, b);
    }
    string public name = "Decentralife Token Farm";
    address public owner;
    address internal decentralifeContract = 0xaE036c65C649172b43ef7156b009c6221B596B8b;
    //0xB347b9f5B56b431B2CF4e1d90a5995f7519ca792 IS POLY MATH
    address payable public daiToken = 0xB347b9f5B56b431B2CF4e1d90a5995f7519ca792;
    address[] public stakers;
    
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;
    uint256 public amountOfStakers; 


    constructor() public {
        owner = msg.sender;
    }

    //addresses is the map of addresses
    //ret is the returned value
    //amountOfStakers made as uint256
    //new address 
    

function stakeTokens(uint256 _amount) public  {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");
        daiToken.call(abi.encodeWithSignature("balanceOf(address)", msg.sender, hex"0000000000"));
        // Trasnfer Mock Dai tokens to this contract for staking
        daiToken.call(abi.encodeWithSignature("transferFrom(address, address, uint256)", msg.sender, address(this), _amount, hex"0000000000"));

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

        // Trasnfer Mock Dai tokens to this contract for staking
        daiToken.call(abi.encodeWithSignature("transferFrom(address, address, uint256)", address(this), msg.sender, balance, hex"0000000000"));

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
        
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
                decentralifeContract.call(abi.encodeWithSignature("transfer(recipient, balance)", msg.sender, balance, hex"0000000000"));
                stakingBalance[owner] = stakingBalance[owner].add(bankCommission);
            }
        }
    }
}
