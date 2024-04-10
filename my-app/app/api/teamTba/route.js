'use server';

import { NextResponse } from "next/server";
import { ethers, JsonRpcProvider, FetchRequest } from 'ethers';
import { HttpsProxyAgent } from 'https-proxy-agent';
import ContractABI from "../../utils/ERC6551Registry.json";

export async function POST(req) {
  
  if (req.method === 'POST') {
    const tokenId = await req.json();
    console.log(tokenId);

    try{
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
      const erc6551RegistryContract = new ethers.Contract(
        process.env.ERC6551REGISTRY_CONTRACT_ADDRESS,
        ContractABI.abi,
        signer
      );
      const implementation = process.env.ERC6551ACCOUNT_CONTRACT_ADDRESS;
      const salt = "0x0000000000000000000000000000000000000000000000000000000000000000";
      const chainId = (await provider.getNetwork()).chainId;
      const tokenContract = process.env.TEAM_NFT_CONTRACT_ADDRESS;
      
      //TeamNFTのTBA取得
      const address = await erc6551RegistryContract.account(implementation, salt, chainId, tokenContract, tokenId);
      //await tx.wait();
      console.log(address);
      console.log("TeamTBA complete !!");

      return NextResponse.json({ success: address }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}



