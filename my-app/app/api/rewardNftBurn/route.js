'use server';

import { NextResponse } from "next/server";
import { ethers, JsonRpcProvider, FetchRequest } from 'ethers';
import { HttpsProxyAgent } from 'https-proxy-agent';
import ContractABI from "../../utils/RewardNFT.json";

export async function POST(req) {
  const tokenId = Number(await req.json());
  console.log(tokenId);

  if (req.method === 'POST') {
    try {
      const proxy = process.env.HTTP_PROXY;
      let provider;

      if (proxy) {// プロキシ定義がある場合は設定を適用
        const providerUrl = process.env.PROVIDER_URL;
        const fetchRequest = new FetchRequest(providerUrl);
        FetchRequest.registerGetUrl(FetchRequest.createGetUrlFunc({ agent: new HttpsProxyAgent(proxy), }));
        provider = new JsonRpcProvider(fetchRequest);
      } else {// プロキシ定義がない場合
        provider = new JsonRpcProvider(process.env.PROVIDER_URL);
      }

      const privateKey = process.env.OWNER_PRIVATE_KEY;
      const signer = new ethers.Wallet(privateKey, provider);
      const rewardNftContract = new ethers.Contract(
        process.env.REWARD_NFT_CONTRACT_ADDRESS,
        ContractABI.abi,
        signer
      );

      //RewardNFTをmint
      // 引数をとってくるようにする
      let tx = await rewardNftContract.rewardNftBurn(tokenId);
      await tx.wait();

      console.log("burn complete !!");

      return NextResponse.json({ success: 'Reward NFT burned' }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}



