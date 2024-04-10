# まどぎわ部 / Madogiwa-bu  
This project aim to create an innovative DAO-type platform where anyone can easily join the community and earn rewards by completing tasks.  

---
このプロジェクトは、誰もが簡単にコミュニティに参加し、タスクを完了することで報酬を獲得できる革新的なDAO型プラットフォームを作成することを目指しています。  

## Description:
Users can earn points by actively participating in their team and fulfilling assigned tasks. At the end of each designated period, the user with the highest total points aggregate will receive an NFT linked to Real World Assets (RWA). We adopt a simple account management system that does not require a wallet, allowing users to manage their accounts with a combination of Team ID, User ID, and password.  

In the future, we aim to implement a feature where users can give each other "likes" for completed tasks and achievements. These accolades will be accumulated within the NFTs owned by each user, creating a continuous profile within the platform. We believe this will appeal to users unfamiliar with web3 technologies.
Considering further scalability, it's possible to explore the integration of users' profile NFTs with other platforms.

---
ユーザーは、チームに積極的に参加し、割り当てられたタスクを遂行することでポイントを獲得できます。指定された期間の終了時に、合計ポイントが最も高いユーザーには、現実に存在する有形資産（＝RWA, Real World Asset）に紐づいたNFTが授与されます。さらに、通常利用するために複雑な手順が必要なweb3（暗号資産）ウォレットを必要としないシンプルなアカウント管理システムを採用し、ユーザーはチームID、ユーザーID、パスワードの組み合わせでアカウントを管理できます。

将来的には、ユーザー同士が完了したタスクや成果に対して「いいね」を送り合える機能を実装する予定です。これらの称賛は、各ユーザーが所有するNFT内に蓄積され、プラットフォーム内での継続的なプロフィールを作成します。これはWeb3技術に馴染みのないユーザーにも魅力的な機能になると考えています。
更なるスケールを考えれば、ユーザーのプロフィールNFTが他のプラットフォームと連携を持たせることも視野に入れることができます。

## Features Provided:
- *Walletless:* Users can easily log in with their User ID and password without the need for a web3 wallet.
- *Gasless:* NFTs can be issued easily without requiring gas fees.
- *Composability and Portability* NFTs are issued to TBAs by ERC-6551 standard, making management easy even with multiple community structures.

---
- *ウォレットレス* ユーザーはweb3ウォレットを必要とせず、ユーザーIDとパスワードで簡単にログインできます。
- *ガスレス* NFTは、ガス料金を必要とせずに簡単に発行できます。
- *複合性と移植性* NFTはERC-6551規格によってTBAに発行され、複数のコミュニティ構造があっても管理が容易になります。

## Tech Stacks:
- *Blockchain:* Astar zkEVM（zkyoto）
- *Smart Contract:* Solidity
- *Frontend:* Next.js , Tailwind CSS
- *Backend:* Node.js
- *Database:* PostgreSQL
- *Test & Deploy:* hardhat

## Installation:
1. Clone the repository from GitHub.
```shell
git clone <github repository URL>
```

2. Install Node.js and npm on your machine.
- Node.js: v20.9.0  
- npm: v10.1.0

Verify Node.js and npm versions with the following command.  
```shell
node --version
npm --version
```

3. Run npm install to install project dependencies.
```shell
npm install
```

4. Deploy smart contracts to the blockchain.
```shell
npx hardhat ignition deploy ./ignition/modules/build.js --network <network-name>
```

5. Start the application with the following command.
```shell
npm run dev
```

## Demo Pages:
![Demo Page0](https://raw.githubusercontent.com/Yutar0-Sakam0t0/Astar-TEAMZ-Hackathon/master/images/image0.jpg)
![Demo Page1](https://raw.githubusercontent.com/Yutar0-Sakam0t0/Astar-TEAMZ-Hackathon/master/images/image1.jpg)
![Demo Page2](https://raw.githubusercontent.com/Yutar0-Sakam0t0/Astar-TEAMZ-Hackathon/master/images/image2.jpg)
![Demo Page3](https://raw.githubusercontent.com/Yutar0-Sakam0t0/Astar-TEAMZ-Hackathon/master/images/image3.jpg)
![Demo Page4](https://raw.githubusercontent.com/Yutar0-Sakam0t0/Astar-TEAMZ-Hackathon/master/images/image4.jpg)

## *Video Link:*



