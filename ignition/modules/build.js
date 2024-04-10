const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("build", (m) => {
  const ERC6551Account = m.contract("ERC6551Account", []);
  const ERC6551Registry = m.contract("ERC6551Registry", []);
  const TeamNFT = m.contract("TeamNFT", []);
  const MemberNFT = m.contract("MemberNFT", []);
  const RewardNFT = m.contract("RewardNFT", []);

  return { ERC6551Account, ERC6551Registry, TeamNFT, MemberNFT, RewardNFT };
});
