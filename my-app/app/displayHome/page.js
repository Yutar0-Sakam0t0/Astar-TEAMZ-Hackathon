"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import HeaderImg from "../component/headerImg.js";
import DisplayProfileImg from "../component/displayProfileImg.js";
import { rewardNftMint, countRewardNftby, getChildTBAby, registRewardNft } from '../component/apiCall';
// chart.jsをインポートする
import { Chart, registerables } from "chart.js"
// eact-chartjs-2から、ドーナッツグラフをインポートする
import { Doughnut } from "react-chartjs-2"
// こちらのコードを書かないと画面にグラフを描画できない?
Chart.register(...registerables)

const displayHome = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [screenHeight, setScreenHeight] = useState(0);

    const teamId = searchParams.get("teamID");
    const userId = searchParams.get("userID");

    const NotoSans = {
        fontFamily: 'NotoSansJP'
    };

    const displayResult = async (event) => {

        // ボタン押下時のデフォルトのフォーム送信処理を無効化する
        event.preventDefault();

        //mint有無を確認
        const mintchk = await countRewardNftby(teamId);
        
        if (mintchk == 0) {

            //menbarTBAを取得
            const memtba = await getChildTBAby(teamId, userId);

            // リワードNFTmint
            const tokenID = await rewardNftMint(memtba);

            //Rewardテーブルを更新
            await registRewardNft(teamId, userId, tokenID);

            router.push('/displayResult?teamID=' + teamId + '&userID=' + userId);

        } else {
            //mint済みの場合は結果画面に遷移
            router.push('/displayResult?teamID=' + teamId + '&userID=' + userId);
        }
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


    // ドーナツチャートを描画
    const data = {
        labels: ["Kou_cha", "po.n.ko", "hige-oyaji", "torako"],
        datasets: [
            {
                label: 'point',
                data: [24, 19, 10, 7],
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
                position: 'left',
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

    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setSelectedButton(buttonId);
    };

    return (
        <body style={NotoSans}>
            <div className="h-screen bg-slate-100" style={{ height: `${screenHeight}px` }}>
                <div className="h-screen max-w-md bg-white">
                    <div className="max-w-md mx-auto px-3 bg-white">
                        <HeaderImg />
                    </div>
                    <div className="flex container max-w-2xl bg-white overflow-x-scroll">
                        <div className="flex flex-none">
                            <button className="btn" onClick={(event) => displayResult(event)}>
                                <img src="./img/A.png" alt="A" className="w-20 h-20 p-2" />
                                <p className="text-sm text-center">Kou_cha</p>
                            </button>

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
                            <div className="m-4 flex justify-center" style={{ height: '200px' }}>
                                <Doughnut data={data} options={options} />
                            </div>

                            <div id="task" className="h-1/2 overflow-y-scroll">
                                <div className="flex flex-col">
                                    <label className="w-full mt-4">
                                        <input id="001" type="button" value="5" name="image" className="hidden" />
                                        <button
                                            className={`btn w-full p-3 rounded-md text-left text-slate-700 border transition-colors duration-300 ${selectedButton === 1 ? 'bg-teal-300 text-white' : 'bg-white'}`}
                                            onClick={() => handleButtonClick(1)}
                                            style={{ borderColor: '#86D2D2' }}
                                        >
                                            レポート(5pt)
                                        </button>
                                    </label>
                                    <label className="w-full mt-4">
                                        <input id="002" type="button" value="5" name="image" className="hidden" />
                                        <button
                                            className={`btn w-full p-3 rounded-md text-left text-slate-700 border transition-colors duration-300 ${selectedButton === 2 ? 'bg-teal-300 text-white' : 'bg-white'}`}
                                            onClick={() => handleButtonClick(2)}
                                            style={{ borderColor: '#86D2D2' }}
                                        >
                                            部会発表(5pt)
                                        </button>
                                    </label>


                                    <label className="w-full mt-4">
                                        <input id="003" type="button" value="5" name="image" className="hidden" />
                                        <button
                                            className={`btn w-full p-3 rounded-md text-left text-slate-700 border transition-colors duration-300 ${selectedButton === 3 ? 'bg-teal-300 text-white' : 'bg-white'}`}
                                            onClick={() => handleButtonClick(3)}
                                            style={{ borderColor: '#86D2D2' }}
                                        >
                                            レポート(5pt)
                                        </button>
                                    </label>
                                    <label className="w-full mt-4">
                                        <input id="004" type="button" value="4" name="image" className="hidden" />
                                        <button
                                            className={`btn w-full p-3 rounded-md text-left text-slate-700 border transition-colors duration-300 ${selectedButton === 4 ? 'bg-teal-300 text-white' : 'bg-white'}`}
                                            onClick={() => handleButtonClick(4)}
                                            style={{ borderColor: '#86D2D2' }}
                                        >
                                            部会発表(5pt)
                                        </button>
                                    </label>


                                    <label className="w-full mt-4">
                                        <input id="005" type="button" value="3" name="image" className="hidden" />
                                        <button
                                            className={`btn w-full p-3 rounded-md text-left text-slate-700 border transition-colors duration-300 ${selectedButton === 5 ? 'bg-teal-300 text-white' : 'bg-white'}`}
                                            onClick={() => handleButtonClick(5)}
                                            style={{ borderColor: '#86D2D2' }}
                                        >
                                            レポート(5pt)
                                        </button>
                                    </label>
                                    <label className="w-full mt-4">
                                        <input id="006" type="button" value="3" name="image" className="hidden" />
                                        <button
                                            className={`btn w-full p-3 rounded-md text-left text-slate-700 border transition-colors duration-300 ${selectedButton === 6 ? 'bg-teal-300 text-white' : 'bg-white'}`}
                                            onClick={() => handleButtonClick(6)}
                                            style={{ borderColor: '#86D2D2' }}
                                        >
                                            部会発表(5pt)
                                        </button>
                                    </label>


                                    <label className="w-full mt-4">
                                        <input id="007" type="button" value="3" name="image" className="hidden" />
                                        <button
                                            className={`btn w-full p-3 rounded-md text-left text-slate-700 border transition-colors duration-300 ${selectedButton === 7 ? 'bg-teal-300 text-white' : 'bg-white'}`}
                                            onClick={() => handleButtonClick(7)}
                                            style={{ borderColor: '#86D2D2' }}
                                        >
                                            レポート(5pt)
                                        </button>
                                    </label>
                                    <label className="w-full mt-4">
                                        <input id="008" type="button" value="2" name="image" className="hidden" />
                                        <button
                                            className={`btn w-full p-3 rounded-md text-left text-slate-700 border transition-colors duration-300 ${selectedButton === 8 ? 'bg-teal-300 text-white' : 'bg-white'}`}
                                            onClick={() => handleButtonClick(8)}
                                            style={{ borderColor: '#86D2D2' }}
                                        >
                                            部会発表(5pt)
                                        </button>
                                    </label>


                                    <label className="w-full mt-4">
                                        <input id="009" type="button" value="2" name="image" className="hidden" />
                                        <button
                                            className={`btn w-full p-3 rounded-md text-left text-slate-700 border transition-colors duration-300 ${selectedButton === 9 ? 'bg-teal-300 text-white' : 'bg-white'}`}
                                            onClick={() => handleButtonClick(9)}
                                            style={{ borderColor: '#86D2D2' }}
                                        >
                                            レポート(5pt)
                                        </button>
                                    </label>
                                    <label className="w-full mt-4">
                                        <input id="010" type="button" value="1" name="image" className="hidden" />
                                        <button
                                            className={`btn w-full p-3 rounded-md text-left text-slate-700 border transition-colors duration-300 ${selectedButton === 10 ? 'bg-teal-300 text-white' : 'bg-white'}`}
                                            onClick={() => handleButtonClick(10)}
                                            style={{ borderColor: '#86D2D2' }}
                                        >
                                            部会発表(5pt)
                                        </button>
                                    </label>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default displayHome;