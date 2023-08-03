// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error InsufficientFunds(uint amount);

contract TransferContract {
    function transferToken(address tokenAddress, address recipient, uint256 amount) external {
        IERC20 token = IERC20(tokenAddress);
        uint userBalance = token.balanceOf(msg.sender);
        if (userBalance < amount) revert InsufficientFunds(userBalance);
        token.transferFrom(msg.sender, recipient, amount);
    }

    function transferEth(address payable recipient) external payable {
        uint messageValue = msg.value;
        if (messageValue <= 0) revert InsufficientFunds(messageValue);
        recipient.transfer(messageValue);
    }
}