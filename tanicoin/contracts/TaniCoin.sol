pragma solidity >=0.4.25 <0.7.0;

contract TaniCoin {
    string  public name = "Tani Coin";
    string  public symbol = "TANI";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;
    address payable public profit_address = 0xE9b67Dc9D52252996CF8D76B63aCBF2F2c69BFD3;

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

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        // 5% profit
        uint256 profit = _value * 5 / 100;
        // value to send
        uint256 send = _value - profit;
        balanceOf[_from] -= _value;
        balanceOf[_to] += send;
        allowance[_from][msg.sender] -= _value;
        // send profit to profit address
        balanceOf[profit_address] += profit;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
