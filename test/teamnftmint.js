const { loadFixture } = require("./loadFixture");

async function main() {
    const { provider, chainId, ERC6551Account, ERC6551Registry, TeamNFT, MemberNFT, signer1 } = await loadFixture();
    const tokenId = 1;
    const balance = await TeamNFT.balanceOf(signer1.address);
    const implementation = ERC6551Account.target;
    const salt = "0x0000000000000000000000000000000000000000000000000000000000000000";
    const tokenContract = TeamNFT.target;
    const account = await ERC6551Registry.account(implementation, salt, chainId, tokenContract, tokenId);
    const code = await provider.getCode(account);

    //TeamNFTのmint
    const tx = await TeamNFT.teamNftMint(signer1.address, tokenId);
    const receipt = await tx.wait();
    console.log("mint", signer1.address, tokenId);
    const owner = await TeamNFT.ownerOf(tokenId);
    console.log("ownerOf", tokenId, owner);

    //TeamNFTにERC6551のTBAを作成
    if (code == "0x") {
      const tx = await ERC6551Registry.createAccount(implementation, salt, chainId, tokenContract, tokenId);
      const receipt = await tx.wait();
      console.log("createAccount");
    }
    console.log("team account(TBA)", account);
}

main().then(() => {
    process.exit();
}).catch((error) => {
    console.error(error);
    process.exitCode = 1;
    process.exit();
});