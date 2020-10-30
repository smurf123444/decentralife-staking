pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;
//SPDX-License-Identifier: UNLICENSED
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
    struct User
    {
    string name;
    address myaddress;
    }


    
mapping(address => User) private userStructs;
    
    using SafeMath for uint256;
    
     modifier onlyOwner(){
            require(msg.sender == owner);
            _;
        }
    address public owner;
    string public symbol;
    string public name;
    address public airdrop_address;
    address public staker_address;
    uint256 public initialSupply; // 1 million tokens
    uint256 public decimals;
    uint256 public min_supply;
    uint256 public max_supply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => uint256) public lastTXtime;
    mapping(address => uint256) public lastLT_TXtime;
    mapping(address => uint256) public lastST_TXtime;
    mapping(address => bool) public passlist;
    uint256 public staker_pct;
    bool public isBurning;
    bool public manager;
    uint256 public total_supply;
    uint256 public turn;
    uint256 public tx_n; 
    uint256 public init_supply;
    uint256 public mint_pct;
    uint256 public burn_pct;
    uint256 public airdrop_pct;
    uint256 public treasury_pct;
    uint256 private staker_balance;
    address[200] public airdropQualifiedAddress;
    address private airdrop_address_toList;
    uint256 public airdropAddressCount;
    uint256 public minimum_for_airdrop;
    address public uniswap_router;
    address public uniswap_factory;
    uint256 public onepct;
    uint256 public owner_limit;
    uint256 public airdrop_limit;
    uint256 public stakers_limit;
    uint256 public inactive_burn;
    uint256 public airdrop_threshold;
    bool private firstrun;
    uint256 private last_turnTime;
    bool private botThrottling;
    bool private macro_contraction;
    uint256 public init_ceiling;
    uint256 public init_floor;
    address[] private stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;
    uint256 private deciCalc;
    address private ZERO_ADDRESS = 0x0000000000000000000000000000000000000000;
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
    
    

constructor(string memory _symbol, string memory _name,uint256  _decimals ,  uint256 _supply, uint256 _max_supply, uint256 _min_supply) public {
    init_supply = _supply * 10 ** _decimals;
    owner = msg.sender;
    airdrop_address = msg.sender;
    staker_address = msg.sender;
    userStructs[address(this)].name = _name;
    name = userStructs[address(this)].name;
    symbol = _symbol;
    decimals = _decimals;
    balanceOf[msg.sender] = init_supply;
    lastTXtime[msg.sender] = now;
    lastST_TXtime[msg.sender] = now;
    lastLT_TXtime[msg.sender] = now;
    passlist[msg.sender] = false;
    initialSupply = init_supply;
    min_supply = _min_supply * 10 ** _decimals;
    max_supply = _max_supply * 10 ** _decimals;
    init_ceiling = max_supply;
    init_floor = min_supply;
    macro_contraction = true;
    turn = 0;
    last_turnTime = now;
    isBurning = true;
    manager = true;
    tx_n = 0;
    deciCalc = (10 ** _decimals);
    mint_pct = (125 * deciCalc).div(10000);//0.0125
    burn_pct = (125 * deciCalc).div(10000);//0.0125
    airdrop_pct = (85 * deciCalc).div(10000);//0.0085
    treasury_pct = (50 * deciCalc).div(10000);//0.0050
    staker_pct = (1 * deciCalc).div(1000);//0.001
    owner_limit = (15 * deciCalc).div(1000);//0.015
    airdrop_limit = (5 * deciCalc).div(1000);//0.05
    inactive_burn = (25 * deciCalc).div(10000);//0.25
    airdrop_threshold = (25 * deciCalc).div(10000);//0.0025
    onepct = (deciCalc).div(10000);//0.01
    airdropAddressCount = 1;
    minimum_for_airdrop = 0;
    firstrun = true;
    botThrottling = true;
    airdropQualifiedAddress[0] = airdrop_address;
    airdrop_address_toList = airdrop_address;
    uniswap_factory = owner;
    uniswap_router = owner;
    total_supply = _max_supply * 10 ** _decimals;

    emit Transfer(address(this), owner, init_supply);
}

function initSupply() view external returns (uint256 num){
    return (init_supply);
}


function totalSupply() view external returns (uint256 num){
    return (total_supply);
}


function _allowance(address _owner, address _spender)view external returns (uint256 num){
    return (allowance[_owner][_spender]);
}   


function burnRate() view external returns (uint256 num){
    return (burn_pct);
}
    
function mintRate() view external returns (uint256 num){
    return (mint_pct);
}

function showAirdropThreshold() view external returns (uint256 num){
    return (airdrop_threshold);
}

function showQualifiedAddresses() view external returns (address[200] memory addr){
    return (airdropQualifiedAddress);
}

function checkWhenLast_USER_Transaction(address _address) view external returns (uint256 num){
    return (lastTXtime[_address]);
}


function LAST_TX_LONGTERM_BURN_COUNTER(address _address) view external returns(uint256 num){
    return lastLT_TXtime[_address];
}

function LAST_TX_SHORTERM_BURN_COUNTER(address _address) view external returns(uint256 num){
    return lastST_TXtime[_address];
}

function lastTurnTime() view external returns(uint256 num){
    return last_turnTime;
}
function macroContraction() view external returns(bool num){
        return macro_contraction;
}


function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
}
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
}
function pctCalc_minusScale(uint256 _value, uint256 _pct) public view returns (uint256 item){
        uint256 res = (_value * _pct) / 10 ** decimals;
        return res;
}
function airdrop() public returns (bool value) {
        uint256 onePctSupply = pctCalc_minusScale(total_supply, onepct);
        uint256 split = 0;
        if (balanceOf[airdrop_address] <= onePctSupply)
        {
            split = balanceOf[airdrop_address] / 250;
        }
        else if(balanceOf[airdrop_address] > onePctSupply)
        {
            split = balanceOf[airdrop_address] / 180;
        }
        else
        {
            split = balanceOf[airdrop_address] / 220;
        }

        if ((balanceOf[airdrop_address] - split) > 0)
        {
            balanceOf[airdrop_address] -= split;
            balanceOf[airdropQualifiedAddress[airdropAddressCount]] += split;
            lastTXtime[airdrop_address] = now;
            lastLT_TXtime[airdrop_address] = now;
            lastST_TXtime[airdrop_address] = now;
            emit Transfer(airdrop_address, airdropQualifiedAddress[airdropAddressCount], split);
        return (true);
        }
}
function _mint(address _to, uint256 _value) internal returns (bool){
        require(_to != ZERO_ADDRESS, "Cannot be a blank address");
        total_supply = _value.add(total_supply);
        balanceOf[_to] += _value;
        emit Transfer(ZERO_ADDRESS, _to, _value);
        return (true);
}
function _macro_contraction_bounds() internal returns (bool boo){
        if (isBurning == true){
            min_supply = min_supply / 2;
        }
        else{
            max_supply = max_supply / 2;
        }
        return true;
}
function _macro_expansion_bounds() internal returns (bool stak){
    if (isBurning == true){
        min_supply = min_supply * 2;
    }
    else{
        max_supply = max_supply  * 2;
    }
    if(turn == 56){
        max_supply = init_ceiling;
        min_supply = init_floor;
        turn = 0;
        macro_contraction = false;
    }
    return (true);
}
function _turn() internal returns(bool boo){
    turn += 1;
    if(turn == 1 && firstrun == false){
        mint_pct = (125 * deciCalc).div(10000); //0.0125
        burn_pct = (125 * deciCalc).div(10000); //0.0125
        airdrop_pct = (85 * deciCalc).div(10000); //0.0085
        treasury_pct = (50 * deciCalc).div(10000); //0.0050
        staker_pct = (1 * deciCalc).div(1000);//0.001
        macro_contraction = true;
    }
    if (turn >= 2 && turn <=56) {
        _macro_contraction_bounds();
        macro_contraction = false;
    }
    last_turnTime = now;
    return(true);
}
function _burn(address _to, uint256 _value) internal returns(bool boo){
    assert(_to != ZERO_ADDRESS);
    total_supply -= _value;
    balanceOf[_to] -= _value;
    emit Transfer(_to, ZERO_ADDRESS, _value);
    return (true);
}
function _rateadj() internal returns (bool boo){
    if (isBurning == true){
        burn_pct += (burn_pct / 10);
        mint_pct += (mint_pct / 10);
        airdrop_pct += (airdrop_pct / 10);
        treasury_pct += (treasury_pct / 10);
        staker_pct += (staker_pct / 10);
    }
    else{
        burn_pct -= (burn_pct / 10);
        mint_pct += (mint_pct / 10);
        airdrop_pct -= (airdrop_pct / 10);
        treasury_pct -= (treasury_pct / 10);
        staker_pct -= (staker_pct / 10);
    }

    if (burn_pct > onepct * 6){
        burn_pct -= (onepct * 2);
    }
    if (mint_pct > onepct * 6){
        mint_pct -= (onepct * 2);
    }

    if (airdrop_pct > onepct * 3){
        airdrop_pct -= onepct;
    }

    if (treasury_pct > onepct * 3){ 
        treasury_pct -= onepct;
    }
    
    if (staker_pct > onepct * 3){
        staker_pct -= onepct;
    }

    if (burn_pct < onepct || mint_pct < onepct || airdrop_pct < onepct/2){
        mint_pct = (125 * deciCalc).div(10000); //0.0125
        burn_pct = (125 * deciCalc).div(10000); //0.0125
        airdrop_pct = (85 * deciCalc).div(10000); //0.0085
        treasury_pct = (50 * deciCalc).div(10000); //0.0050
        staker_pct = (1 * deciCalc).div(1000);//0.001
    return (true);
    }
}
function isContract(address _addr) internal view returns (bool boo){
  uint32 size;
  assembly {
    size := extcodesize(_addr)
  }
  return (size > 0);
}
function burn_Inactive_Address(address _address) external returns(bool boo){
    require(_address != ZERO_ADDRESS, "This is a zero address. Use the burn inactive contract function instead.");
    require(isContract(_address) != false, "This is a contract address. Use the burn inactive contract function instead.");
    uint256 inactive_bal = 0;
    if (_address == airdrop_address){
        require(now > lastTXtime[_address] + 604800, "Unable to burn, the airdrop address has been active for the last 7 days");
        inactive_bal = pctCalc_minusScale(balanceOf[_address], inactive_burn);
        _burn(_address, inactive_bal);
        lastTXtime[_address] = now;
    }
    else
    {
        require((now > lastST_TXtime[_address] + 302400) || (now > lastLT_TXtime[_address] + 518400), "Unable to burn, the address has been active.");
        if (now > lastST_TXtime[_address] + 3024000){
            inactive_bal = pctCalc_minusScale(balanceOf[_address], inactive_burn);
            _burn(_address, inactive_bal);
            lastST_TXtime[_address] = now;
        }
        else if (now > (lastLT_TXtime[_address] + 5184000)){
            _burn(_address, balanceOf[_address]);
        }
    }
    return (true);
}
function burn_Inactive_Contract(address _address) external returns(bool boo){
    require(_address != ZERO_ADDRESS, "zero address");
    require(isContract(_address) != false, "Not a Contract");
    require(_address != uniswap_factory, "BAD BOY!");
    require(_address != uniswap_router, "NAUGHTY BOY! Dont make me stick a dildo in you.");
    uint256 inactive_bal = 0;
    require(now > lastST_TXtime[_address] + 5259486 || now > lastLT_TXtime[_address] + 7802829, "Unable to burn, contract has been active");
    if(now > lastST_TXtime[_address] + 5259486){
        inactive_bal = pctCalc_minusScale(balanceOf[_address], inactive_burn);
        _burn(_address, inactive_bal);
        lastST_TXtime[_address] = now;
    }
    else if(now > lastLT_TXtime[_address] + 7802829){
        _burn(_address, balanceOf[_address]);
        lastLT_TXtime[_address] = now;
    }
    return (true);
}
function flashback(address[259] memory _list, uint256[259] memory _values) external returns(bool boo){
    require(msg.sender != ZERO_ADDRESS, "Not zero address");
    require(msg.sender == owner, "Must be the Owner to call this function");
    for(uint i = 0; i <= 259; i++){
        if (_list[i] != ZERO_ADDRESS){
            balanceOf[msg.sender] -= _values[i];
            balanceOf[_list[i]] += _values[i];
            lastTXtime[_list[i]] = now;
            lastST_TXtime[_list[i]] = now;
            lastLT_TXtime[_list[i]] = now;
            emit Transfer(msg.sender, _list[i], _values[i]);
        }
    }
    return (true);
}
function manager_killswitch() external returns (bool boo){
      // Anyone can take the manager controls away on Date and time GMT Friday, October 30, 2020 10:02:35 AM
    require(msg.sender != ZERO_ADDRESS, "Error Zero Address");
    require(now > 1604052155, "Not Yet ;)");
    manager = false;
    return(true);
}
function setPassList(address _address) external returns(bool boo){
        require(_address != ZERO_ADDRESS, "Zero Address Error");
        require(_address == owner, "Address must be owner");
        passlist[_address] = true;
        return (true);
    }
function remPasslist(address _address) external returns(bool boo){
        require(_address != ZERO_ADDRESS, "Zero address error");
        require (_address == owner, "Function must be called by owner.");
        passlist[_address] = false;
        return (true);
    }
    function manager_burn(address _to, uint256 _value) external returns (bool boo){
        require(manager == true, "function must be called by the Manager");
        require (_to != ZERO_ADDRESS, "cant be to Zero Address, Error");
        require (msg.sender != ZERO_ADDRESS, "Sender cant be Zero Address, Error");
        require(msg.sender == owner, "Function must be called by Owner");
        total_supply -= _value;
        balanceOf[_to] -= _value;
        emit Transfer(_to, ZERO_ADDRESS, _value);
        return (true);
    }

function setAirdropAddress(address _airdropAddress) external returns(bool boo){
    require(manager == true, "Manager not present");
    require(msg.sender != ZERO_ADDRESS, "Zero Address error");
    require(_airdropAddress != ZERO_ADDRESS, "Zero address error");
    require(msg.sender == owner, "Only owner can call this function");
    require(msg.sender == airdrop_address, "Owner must be airdrop address.");
    airdrop_address = _airdropAddress;
    return (true);
}
function setStakersAddress(address _stakerAddress) external returns(bool boo){
    require(manager == true, "Manager not present");
    require(msg.sender != ZERO_ADDRESS, "Zero Address error");
    require(_stakerAddress != ZERO_ADDRESS, "Zero address error");
    require(msg.sender == owner, "Only owner can call this function");
    require(msg.sender == staker_address, "Owner must be staker address.");
    staker_address = _stakerAddress;
    return (true);
}

function setUniswapRouter(address _uniswapRouter) external returns (bool boo){
        require (manager == true, "ERROR: Manager must be active");
        require (msg.sender != ZERO_ADDRESS, "Zero Address from sender");
        require (_uniswapRouter != ZERO_ADDRESS, "uniswap router address is ZERO address");
        require (msg.sender == owner, "Owner only can call this function , must be the manager aswell" );
        uniswap_router = _uniswapRouter;
        return (true);
    }
function setUniswapFactory(address _uniswapFactory) external returns(bool boo){
        require (manager == true, "ERROR: Manager must be active");
        require (msg.sender != ZERO_ADDRESS, "Zero Address from sender");
        require (_uniswapFactory != ZERO_ADDRESS, "uniswap router address is ZERO address");
        require (msg.sender == owner, "Owner only can call this function , must be the manager aswell" );
        uniswap_factory = _uniswapFactory;
        return (true);

}
function airdropProcess(uint256 _amount, address _txorigin, address _sender, address _receiver) internal returns(bool boo){
        minimum_for_airdrop = pctCalc_minusScale(balanceOf[airdrop_address], airdrop_threshold);
        if(_amount >= minimum_for_airdrop){
            if (isContract(_txorigin) == false)
            {
                airdrop_address_toList = _txorigin;
            }
            else{
                if(isContract(_sender) == true){
                    airdrop_address_toList = _receiver;
                }
                else{
                    airdrop_address_toList = _sender;
                }
            }
            if(firstrun == true){
                if (airdropAddressCount < 199)
                {
                    airdropQualifiedAddress[airdropAddressCount] = airdrop_address_toList;
                }
                else if(airdropAddressCount == 199){
                    firstrun = false;
                    airdropQualifiedAddress[airdropAddressCount] = airdrop_address_toList;
                    airdropAddressCount = 0;
                    airdrop();
                    airdropAddressCount += 1;
                }
            }
            else{
                if(airdropAddressCount < 199){
                    airdrop();
                    airdropQualifiedAddress[airdropAddressCount] = airdrop_address_toList;
                    airdropAddressCount +=1;
                }
                else if(airdropAddressCount == 199){
                    airdrop();
                    airdropQualifiedAddress[airdropAddressCount] = airdrop_address_toList;
                    airdropAddressCount = 0;
                }
            }
        }
        return (true);
    }


function issueTokens() external {
require(msg.sender == address(this), "Not called by contract. ERROR" );
        
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint256 onePctSupply = pctCalc_minusScale(total_supply, onepct);
            uint256 split = 0;
        
        if (stakingBalance[recipient] <= onePctSupply)
        {
            split = balanceOf[staker_address] / 250;
        }
        else if(stakingBalance[recipient] > onePctSupply)
        {
            split = balanceOf[staker_address] / 180;
        }
        else
        {
            split = balanceOf[staker_address] / 220;
        }

        if ((balanceOf[staker_address] - split) > 0)
        {
        
        balanceOf[staker_address] -= split;
        balanceOf[recipient] += split;

            emit Transfer(airdrop_address, airdropQualifiedAddress[airdropAddressCount], split);
        }


    }
            
        lastTXtime[tx.origin] = now;

        lastLT_TXtime[tx.origin] = now;

        lastST_TXtime[tx.origin] = now;

}


function transfer(address _to, uint256 _value) external returns (bool boo){
    require(_value !=0, "Value must be greater than 0");
    require(_to != ZERO_ADDRESS, "Address cannot be ZERO address");
    uint256 turn_burn = 0;
    
    if(msg.sender != owner){
        if (botThrottling == true){
            if (tx_n < 100){
                require (_value < (200 * 10 ** decimals), "Maximum amount allowed is 200 SEX until 100th transaction.");
            }
        }
    }
    if((msg.sender == uniswap_factory && _to == uniswap_router) || msg.sender == uniswap_router && _to == uniswap_factory || passlist[msg.sender] == true)
    {
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
    else{
        if (now > last_turnTime + 60){
            if(total_supply >= max_supply)
            {
                isBurning = true;
                _turn();
                if(firstrun == false){
                    turn_burn = total_supply - max_supply;
                    if((balanceOf[airdrop_address] - (turn_burn * 2)) > 0)
                    {
                        _burn(airdrop_address, turn_burn * 2);
                    }
                    
                }

            }
            else if(total_supply <= min_supply){
            
                isBurning = false;
                _turn();
                uint256 turn_mint = min_supply - total_supply;
                _mint(airdrop_address, turn_mint*2);
            }

        }
           if (airdropAddressCount == 0){
            _rateadj();
           }
           if (isBurning == true){
            uint256 burn_amt = pctCalc_minusScale(_value, burn_pct);
            uint256 airdrop_amt= pctCalc_minusScale(_value, airdrop_pct);
            uint256 treasury_amt = pctCalc_minusScale(_value, treasury_pct);
            uint256 tx_amt = (_value - burn_amt - airdrop_amt - treasury_amt);
            uint256 staker_amt = pctCalc_minusScale(_value, staker_pct);
            _burn(msg.sender, burn_amt);
            balanceOf[msg.sender] -= tx_amt;
            balanceOf[_to] += tx_amt;
            emit Transfer(msg.sender, _to, tx_amt);
            
            uint256 ownerlimit = pctCalc_minusScale(total_supply, owner_limit);
            if (balanceOf[owner] <= ownerlimit){
                balanceOf[msg.sender] -= treasury_amt;
                balanceOf[owner] += treasury_amt;
                emit Transfer(msg.sender, owner, treasury_amt);
            }
            uint256 airdrop_wallet_limit = pctCalc_minusScale(total_supply, airdrop_limit);
            if (balanceOf[airdrop_address] <= airdrop_wallet_limit){
                balanceOf[msg.sender] -= airdrop_amt;
                balanceOf[airdrop_address] += airdrop_amt;
                emit Transfer(msg.sender, airdrop_address, airdrop_amt);
            }

                balanceOf[msg.sender] -= staker_amt;
                balanceOf[staker_address] += staker_amt;
                emit Transfer(msg.sender, staker_address, airdrop_amt);

            tx_n += 1;
            airdropProcess(_value, tx.origin, msg.sender, _to);
           }
           else if(isBurning == false)
           {
            uint256 mint_amt = pctCalc_minusScale(_value, mint_pct);
            uint256 airdrop_amt = pctCalc_minusScale(_value, airdrop_pct);
            uint256 treasury_amt = pctCalc_minusScale(_value, treasury_pct);
            uint256 staker_amt = pctCalc_minusScale(_value, staker_pct);
            uint256 tx_amt = (_value - airdrop_amt - treasury_amt);
            _mint(tx.origin, mint_amt);
            balanceOf[msg.sender] -= tx_amt;
            balanceOf[_to] += tx_amt;    
            emit Transfer(msg.sender, _to, tx_amt);
            uint256 ownerlimit = pctCalc_minusScale(total_supply, owner_limit);
            if (balanceOf[owner] <= ownerlimit){
                balanceOf[msg.sender] -= treasury_amt;
                balanceOf[owner] += treasury_amt;
                emit Transfer(msg.sender, owner, treasury_amt);
            }
            uint256 airdrop_wallet_limit = pctCalc_minusScale(total_supply, airdrop_limit);
            if (balanceOf[airdrop_address] <= airdrop_wallet_limit){
                balanceOf[msg.sender] -= airdrop_amt;
                balanceOf[airdrop_address] += airdrop_amt;
                emit Transfer(msg.sender, airdrop_address, airdrop_amt);
            }

                balanceOf[msg.sender] -= staker_amt;
                balanceOf[staker_address] += staker_amt;
                emit Transfer(msg.sender, staker_address, airdrop_amt);

            tx_n += 1;
            airdropProcess(_value, tx.origin, msg.sender, _to);
            this.issueTokens();
           }
           
               else{
                   revert("ERROR at TX Block");
                }

    }

    lastTXtime[tx.origin] = now;
    lastTXtime[msg.sender] = now;
    lastTXtime[_to] = now;
    lastLT_TXtime[tx.origin] = now;
    lastLT_TXtime[msg.sender] = now;
    lastLT_TXtime[_to] = now;
    lastST_TXtime[tx.origin] = now;
    lastST_TXtime[msg.sender] = now;
    lastST_TXtime[_to] = now;

    return (true);

}

function stakeTokens(uint256 _amount) external {
        require(_amount > 0, "amount cannot be 0");
        require(balanceOf[msg.sender] >= _amount, "Not enough in balance");
                /* enforce the minimum stake time */

        this.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
        lastTXtime[tx.origin] = now;
        lastTXtime[msg.sender] = now;
        lastLT_TXtime[tx.origin] = now;
        lastLT_TXtime[msg.sender] = now;

        lastST_TXtime[tx.origin] = now;
        lastST_TXtime[msg.sender] = now;

        emit Transfer(msg.sender, address(this), _amount);

    }

    // Unstaking Tokens (Withdraw)
function unstakeTokens() external {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance cannot be 0");
        this.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
        lastTXtime[tx.origin] = now;
        lastTXtime[msg.sender] = now;
        lastLT_TXtime[tx.origin] = now;
        lastLT_TXtime[msg.sender] = now;

        lastST_TXtime[tx.origin] = now;
        lastST_TXtime[msg.sender] = now;

        emit Transfer(msg.sender, address(this), stakingBalance[msg.sender]);
    }
}