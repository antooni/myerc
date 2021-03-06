// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "hardhat/console.sol";

import "./IERC20.sol";

contract Token is IERC20 {
    string public override name;
    string public override symbol;
    uint8 public override decimals;
    uint256 public override totalSupply;

    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256))public override allowance;

    constructor() {
        name = "myerc";
        symbol = "MYE";
        decimals = 18;
        totalSupply = uint256(17000000) * 10 **uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public override validDestination(_to) returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Your balance is too low");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender,_to,_value);
        
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public override validDestination(_to) returns (bool success) {
        require(balanceOf[_from] >= _value, "Sender balance is too low");
        require(allowance[_from][msg.sender] >= _value, "Spender allowance is too low");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from,_to,_value);

        allowance[_from][msg.sender] -= _value;
        emit Approval(_from,msg.sender,allowance[_from][msg.sender]);

        return true;
    }

    function approve(address _spender, uint256 _value) public override validSpender(_spender) returns (bool success) {
        require((_value == 0) || (allowance[msg.sender][_spender] == 0),"You first have to set allowance to zero, to avoid race condition, or use increase/decrease Approval");

        require(balanceOf[msg.sender] >= _value, "Your balance is too low to set allowance");
        
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender,_spender,allowance[msg.sender][_spender]);

        return true;
    }
    
    function increaseAllowance(address _spender, uint256 _addedValue) public validSpender(_spender) returns (bool success) {
        require(allowance[msg.sender][_spender] + _addedValue <= balanceOf[msg.sender], "Your balance is too low to set allowance");

        allowance[msg.sender][_spender] += _addedValue;
        emit Approval(msg.sender,_spender,allowance[msg.sender][_spender]);
        return true;
    }

    function decreaseAllowance(address _spender, uint256 _subValue) public validSpender(_spender) returns (bool success) {
        require(allowance[msg.sender][_spender] >= _subValue, "Cannot set allowance smaller than zero");

        allowance[msg.sender][_spender] -= _subValue;
        emit Approval(msg.sender,_spender,allowance[msg.sender][_spender]);
        return true;
    }

    modifier validDestination(address _to) {
        require(_to != address(0), "Cannot send tokens to 0x0 address");
        require(_to != address(this), "Cannot send tokens to smart-contract's address");
        _;
    }

    modifier validSpender(address _spender) {
        require(_spender != address(0),"Cannot set allowance, spender cannot be 0x0 address");
        _;
    }


}

