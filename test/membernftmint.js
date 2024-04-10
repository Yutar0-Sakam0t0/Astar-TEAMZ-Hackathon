const { loadFixture } = require("./loadFixture");

async function main() {
    const { provider, chainId, ERC6551Account, ERC6551Registry, TeamNFT, MemberNFT, signer1 } = await loadFixture();    
    const implementation = ERC6551Account.target;
    const salt = "0x0000000000000000000000000000000000000000000000000000000000000000";
    const memtokenId = 2;
    const memtokenContract = MemberNFT.target;
    const memaccount = await ERC6551Registry.account(implementation, salt, chainId, memtokenContract, memtokenId);
    const code = await provider.getCode(memaccount);

    //TeamNFTのTBA
    const teamtokenId = 1;
    const teamtokenContract = TeamNFT.target;
    const teamaccount = await ERC6551Registry.account(implementation, salt, chainId, teamtokenContract, teamtokenId);

    //MemberNFTのmint
    const tx = await MemberNFT.memberNftMint(teamaccount, memtokenId); 
    const receipt = await tx.wait();
    console.log("mint", teamaccount, memtokenId);
    const owner = await MemberNFT.ownerOf(memtokenId);
    console.log("ownerOf", memtokenId, owner);

    //MemberNFTにERC6551のTBAを作成
    if (code == "0x") {
      const tx = await ERC6551Registry.createAccount(implementation, salt, chainId, memtokenContract, memtokenId);
      const receipt = await tx.wait();
      console.log("createAccount");
    }
    console.log("team account(TBA)", teamaccount);
    console.log("member account(TBA)", memaccount);
}

main().then(() => {
    process.exit();
}).catch((error) => {
    console.error(error);
    process.exitCode = 1;
    process.exit();
});