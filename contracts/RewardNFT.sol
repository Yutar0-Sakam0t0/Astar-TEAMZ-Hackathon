// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//RewardNFTコントラクト
contract RewardNFT is ERC721, Ownable {
    constructor() ERC721("RewardNFT", "RNT") Ownable(msg.sender) {}

    uint256 public nextTokenId;

    //RewardNFTのmint
    function rewardNftMint(address to) public onlyOwner {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
    }

    // RewardNFTのburn
    function rewardNftBurn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }
}
