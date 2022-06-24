// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Nft is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("sight nft", "snft") {} 

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    /*function contractURI() public pure returns (string memory) {
        return "JSON link to contract";
    }*/

    function mintItem(address minter, string memory tokenURI)
         public onlyOwner returns (uint256) {

             _tokenIds.increment();
             uint256 newItemId = _tokenIds.current();
             _mint(minter, newItemId);
             _setTokenURI(newItemId, tokenURI);
             return newItemId;

    }

}