// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//TeamNFTコントラクト
contract TeamNFT is ERC721, Ownable {
    constructor() ERC721("TeamNFT", "TNT") Ownable(msg.sender) {}

    uint256 public nextTokenId;

    //TeamNFTのmint
    function teamNftMint(address to) public onlyOwner {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
    }
}
