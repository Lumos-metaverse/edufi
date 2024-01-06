// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EduFi is ERC20, Ownable {
    uint256 public constant tokenPerPost = 2 * 10 ** 18;

    constructor() ERC20("EduFi Token", "EDUFI") Ownable(msg.sender) {}

    function mint() internal {
        _mint(msg.sender, tokenPerPost);
    }
}