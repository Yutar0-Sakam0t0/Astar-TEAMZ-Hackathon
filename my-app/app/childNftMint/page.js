"use client"

import { useRouter,useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import HeaderImg from "../component/headerImg.js";
import InputForm from "../component/inputForm.js";
import DisplayProfileImg from "../component/displayProfileImg.js";
import { memberNftMint, memberTba, updateMemberProf, getParentTBAby } from '../component/apiCall';

const childNftMint = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [homePage, setHomePage] = useState(false);
  const homePageTrue = () => setHomePage(true);
  const homePageFalse = () => setHomePage(false);
  const [prof_image, setProfImage] = useState("image_A");
  const [screenHeight, setScreenHeight] = useState(0);
  const [username, setUsername] = useState("");
  const NotoSans = {
    fontFamily: 'NotoSansJP'
  };

  // stateを更新する関数を定義
  const handleProfImageChange = (event) => {
    setProfImage(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const checkCondition = (arg) => {
    if (arg === prof_image) {
      return "opacity-1"; // 選択された画像の場合は透明度0
    } else {
      return "opacity-30"; // 選択されていない画像の場合は透明度50
    }
  };

  const displayHome = async (event) => {
    
    // ボタン押下時のデフォルトのフォーム送信処理を無効化する
    event.preventDefault();
    
    const teamId = searchParams.get("teamID");
    const userId = searchParams.get("userID");

    // TeamTBA取得
    const teamTba = await getParentTBAby(teamId);

    // MemberNFTのmint
    const tokenid = await memberNftMint(teamTba);

    // MemberTBA取得
    const memTba = await memberTba(tokenid);

    // MemberTBAをDBへ登録
    await updateMemberProf(prof_image, username, memTba, teamId, userId);
    
    //homePageTrue();
    router.push('/displayHome?teamID=' + teamId + '&userID=' + userId);
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

  return homePage ? (
    <>
      {router.push('/displayHome?teamID=' + teamId + '&userID=' + userId)}
      
    </>
  ) : (
    <body style={NotoSans}>
      <div className="h-screen bg-slate-100" style={{ height: `${screenHeight}px` }}>
        <div className="h-screen max-w-md mx-auto px-3 bg-white">
          <HeaderImg />

          <div className="container mx-auto">
            <img src="./img/02_どんな人.png" className="w-full" />

            {/* <p>prof image : {prof_image}</p>
            <p>{username}</p> */}

            <div className="container mt-3 sample-form">
              <form>
                {/* ABC */}
                <div className="flex mt-3">
                  <input onClick={handleProfImageChange} id="image_A" type="radio" value="image_A" name="image" className="hidden" />
                  <label htmlFor="image_A" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/A.png" className={checkCondition('image_A')} alt="A" />
                    </div>
                  </label>
                  <input onClick={handleProfImageChange} id="image_B" type="radio" value="image_B" name="image" className="hidden" />
                  <label htmlFor="image_B" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/B.png" className={checkCondition('image_B')} alt="B" />
                    </div>
                  </label>
                  <input onClick={handleProfImageChange} id="image_C" type="radio" value="image_C" name="image" className="hidden" />
                  <label htmlFor="image_C" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/C.png" className={checkCondition('image_C')} alt="C" />
                    </div>
                  </label>
                </div>

                {/* DEF */}
                <div className="flex mt-3">
                  <input onClick={handleProfImageChange} id="image_D" type="radio" value="image_D" name="image" className="hidden" />
                  <label htmlFor="image_D" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/D.png" className={checkCondition('image_D')} alt="D" />
                    </div>
                  </label>
                  <input onClick={handleProfImageChange} id="image_E" type="radio" value="image_E" name="image" className="hidden" />
                  <label htmlFor="image_E" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/E.png" className={checkCondition('image_E')} alt="E" />
                    </div>
                  </label>
                  <input onClick={handleProfImageChange} id="image_F" type="radio" value="image_F" name="image" className="hidden" />
                  <label htmlFor="image_F" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/F.png" className={checkCondition('image_F')} alt="F" />
                    </div>
                  </label>
                </div>
                {/* GHI */}
                <div className="flex mt-3">
                  <input onClick={handleProfImageChange} id="image_G" type="radio" value="image_G" name="image" className="hidden" />
                  <label htmlFor="image_G" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/G.png" className={checkCondition('image_G')} alt="G" />
                    </div>
                  </label>
                  <input onClick={handleProfImageChange} id="image_H" type="radio" value="image_H" name="image" className="hidden" />
                  <label htmlFor="image_H" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/H.png" className={checkCondition('image_H')} alt="H" />
                    </div>
                  </label>
                  <input onClick={handleProfImageChange} id="image_I" type="radio" value="image_I" name="image" className="hidden" />
                  <label htmlFor="image_I" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/I.png" className={checkCondition('image_I')} alt="I" />
                    </div>
                  </label>
                </div>
                {/* JKL */}
                <div className="flex mt-3">
                  <input onClick={handleProfImageChange} id="image_J" type="radio" value="image_J" name="image" className="hidden" />
                  <label htmlFor="image_J" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/J.png" className={checkCondition('image_J')} alt="J" />
                    </div>
                  </label>
                  <input onClick={handleProfImageChange} id="image_K" type="radio" value="image_K" name="image" className="hidden" />
                  <label htmlFor="image_K" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/K.png" className={checkCondition('image_K')} alt="K" />
                    </div>
                  </label>
                  <input onClick={handleProfImageChange} id="image_L" type="radio" value="image_L" name="image" className="hidden" />
                  <label htmlFor="image_L" className="w-1/3">
                    <div className="px-3">
                      <img src="./img/L.png" className={checkCondition('image_L')} alt="L" />
                    </div>
                  </label>
                </div>

                <div className="mt-3">
                  <input placeholder="ニックネーム" type="text" id="username" name="username" className="w-full mt-1 border rounded-md p-2" value={username} onChange={handleUsernameChange} autoComplete="off"/>
                </div>

                <div className="container mt-4">
                  <div className="flex justify-center">
                    <button
                      onClick={(event) => displayHome(event)}
                      className="w-2/3 btn text-center py-2 px-4 rounded-full text-white text-xl drop-shadow-lg"
                      style={{ backgroundColor: '#86D2D2' }}>確定する
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default childNftMint;