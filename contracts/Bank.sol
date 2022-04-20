// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Bank {
    IERC20 private token;

    mapping(address => uint256) private accounts;

    constructor(IERC20 _token) {
        token = _token;
    }

    function accountBalance(address acc) public view returns (uint256) {
        return accounts[acc];
    }

    function deposit(uint256 amount) public {}

    function withdrawal(uint256 amount) public {}
}
