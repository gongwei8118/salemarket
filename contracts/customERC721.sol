// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract CustomERC721 is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;
    string private _initBaseURI;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) ERC721(name, symbol) {
        _initBaseURI = baseURI;
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _initBaseURI = newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _initBaseURI;
    }

    function currentTokenId() public view returns (uint256) {
        return _tokenIdTracker.current();
    }

    function mintOne(address recipient) public onlyOwner returns (uint256) {
        uint256 newTokenId = _tokenIdTracker.current();
        _safeMint(recipient, newTokenId);
        _tokenIdTracker.increment();
        return newTokenId;
    }

    function mintMany(address recipient, uint256 amount) public onlyOwner returns (uint256[] memory){
        uint256[] memory tokenIds = new uint256[](amount);
        for (uint256 i=0; i<amount; i++ ){
            uint256 newTokenId = mintOne(recipient);
           tokenIds[i] = newTokenId;
        }
        return tokenIds;
    }

}