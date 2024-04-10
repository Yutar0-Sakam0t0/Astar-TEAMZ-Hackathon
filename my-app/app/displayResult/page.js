"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import HeaderImg from "../component/headerImg.js";
import DisplayProfileImg from "../component/displayProfileImg.js";
import { getAvailableRewardNft, updateRewardNftBurn, rewardNftBurn } from '../component/apiCall';
// chart.jsをインポートする
import { Chart, registerables } from "chart.js"
// eact-chartjs-2から、ドーナッツグラフをインポートする
import { Doughnut } from "react-chartjs-2"
// こちらのコードを書かないと画面にグラフを描画できない
Chart.register(...registerables)

const displayResult = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const teamId = searchParams.get("teamID");
    const userId = searchParams.get("userID");
    const [screenHeight, setScreenHeight] = useState(0);
    const NotoSans = {
        fontFamily: 'NotoSansJP'
    };

    const xrewardNftBurn = async () => {
        // teamID, userIdをキーにしてRewardNftの情報を取得、tokenIdを指定してburn
        const tokenId = await getAvailableRewardNft(teamId, userId);

        // RewardNftのBurn実施
        await rewardNftBurn(tokenId);

        // Burn情報をDBへアップデート
        await updateRewardNftBurn(teamId, userId,tokenId);

    };

    // ドーナツチャートを描画
    const data = {
        labels: ["hige-oyaji", "po.n.ko", "Kou_cha", "torako"],
        datasets: [
            {
                label: 'point',
                data: [21, 19, 14, 11],
                backgroundColor: [
                    "#86D2D2",
                    "#F2F2F2",
                    "#D9D9D9",
                    "#BFBFBF",
                ],
            },
        ],
    };

    // 真ん中に表示するオブジェクト
    const counter = {
        id: 'counter',
        beforeDraw(chart, args, options) {
            const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.fillRect(width / 2, top + (height / 2), 0, 0);
            ctx.font = "32px 游ゴシック";
            ctx.textAlign = 'center';

            // 位置調整
            console.log("width", width);
            console.log("height", height);
            console.log("top", top);
            console.log("width / 2, top + (height / 2)", width / 2, top + (height / 2));
            ctx.fillText('24pt', width / 2, top + (height / 2));
        }
    };

    const options = {
        responsive: true,
        cutout: '75%', // Adjust this value to change the donut hole size
        plugins: {
            legend: {
                display: false,
                position: 'right',
            },
            title: {
                display: false,
                text: '円グラフ',
                position: 'top',
                align: 'center',
            },
            counter: {
                fontColor: 'red',
                fontSize: '50px',
            },
        },
        // plugins: [counter]
    };

     // RewordNFTのMint
    const operewordNftmint = async () => {
        
        //await rewordNftMint();
        
    };

    // RewordNFTのBurn
    const operewordNftburn = async () => {
    
        //await memberNftBurn();
        
    };

    // 画面サイズを取得
    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <body style={NotoSans}>
            <div className="h-screen bg-slate-100" style={{ height: `${screenHeight}px` }}>
                <div className="h-screen max-w-md bg-white">
                    <div className="max-w-md mx-auto px-3 bg-white">
                        <HeaderImg />
                    </div>
                    <div className="flex container max-w-2xl bg-white overflow-x-scroll">
                        <div className="flex flex-none">
                            <a href="result.html" className="btn">
                                <img src="./img/A.png" alt="A" className="w-20 h-20 p-2" />
                                <p className="text-sm text-center">Kou_cha</p>
                            </a>

                            <button className="btn">
                                <img src="./img/B.png" alt="B" className="w-20 h-20 p-2" />
                                <p className="text-sm text-center">po.n.ko</p>
                            </button>

                            <button className="btn">
                                <img src="./img/C.png" alt="C" className="w-20 h-20 p-2" />
                                <p className="text-sm text-center">hige-oyaji</p>
                            </button>

                            <button className="btn">
                                <img src="./img/D.png" alt="D" className="w-20 h-20 p-2" />
                                <p className="text-sm text-center">torako</p>
                            </button>

                            <button className="btn">
                                <img src="./img/E.png" alt="E" className="w-20 h-20 p-2" />
                                <p className="text-sm text-center">ユーザー名1</p>
                            </button>

                            <button className="btn">
                                <img src="./img/F.png" alt="F" className="w-20 h-20 p-2" />
                                <p className="text-sm text-center">ユーザー名1</p>
                            </button>

                            <button className="btn">
                                <img src="./img/G.png" alt="G" className="w-20 h-20 p-2" />
                                <p className="text-sm text-center">ユーザー名1</p>
                            </button>

                            <button className="btn">
                                <img src="./img/H.png" alt="H" className="w-20 h-20 p-2" />
                                <p className="text-sm text-center">ユーザー名1</p>
                            </button>
                        </div>
                    </div>
                    <div className="container px-3 max-w-md bg-white">
                        <div className="container col-12">
                            <div className="m-4 flex justify-center">
                                <img src="./img/03_頑張った賞.png" className="w-full" />
                            </div>

                            <div className="flex justify-center">
                                <img src="./img/05_結果表示.png" className="w-full" />
                            </div>

                            <div className="m-4 flex justify-center" style={{ height: '200px' }}>
                                <Doughnut data={data} options={options} />
                            </div>

                            <div className="m-4 flex justify-center">
                                <img src="./img/04_プレゼント.png" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="m-4 justify-center">
                        <div className="rounded-md p-4 bg-cfeeed" style={{ backgroundColor: '#CFEEED', textAlign: 'center' }}>
                            <div className="flex flex-none">
                                <a className="btn">
                                    <img src="./img/gourmet_kyotocoffee_eye.jpg" alt="A" className="w-20 h-20" />
                                </a>

                                <label className="m-4">
                                    コーヒーギフト券<br />
                                    (700円分)
                                </label>

                                <button className="btn" onClick={xrewardNftBurn}>
                                    <img src="./img/使う.png" alt="A" className="w-20 h-20" />
                                </button>
                            </div>
                        </div>
                        <label className="m-2 flex justify-end">
                            有効期限：2024/4/15
                        </label>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default displayResult;