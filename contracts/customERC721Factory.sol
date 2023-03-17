// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./customERC721.sol";

contract CustomERC721Factory {
    mapping(address => address[]) public deployedContract;

    function createCustomERC721(        
        string memory name,
        string memory symbol,
        string memory initBaseURI) public payable returns (address) {
        CustomERC721 newContract = new CustomERC721(name, symbol, initBaseURI);
        newContract.transferOwnership(msg.sender);
        _addToArray(deployedContract[msg.sender], address(newContract));
        return address(newContract);
    }

    function deployedContractValueLength(address addressKey) public view returns (uint256){
        return deployedContract[addressKey].length;
    }

    function _addToArray(address[] storage _arr, address _addr) internal {
        _arr.push(_addr);
    }
}