"use client"

import { useRouter, useSearchParams  } from 'next/navigation';
import { useState, useEffect } from 'react';
import HeaderImg from "./component/headerImg.js";
import InputForm from "./component/inputForm.js";
import ChildComponent from "./component/childComponent.js";
import { teamNftMint, teamTba, teamExist, registTeam, registMember, memberExist } from '../app/component/apiCall';
import bcrypt from 'bcryptjs'

export default function Home() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [screenHeight, setScreenHeight] = useState(0);
  const [memberCreatePage, setMemberCreatePage] = useState(false);
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [team_id, setteam_id] = useState("");
  const handlePageTrue = () => setMemberCreatePage(true);
  const handlePageFalse = () => setMemberCreatePage(false);
  const NotoSans = {
    fontFamily: 'NotoSansJP'
  };

  // 次の画面に受け渡すクエリパラメータ
  const query = {
    temaID: team_id,
    userID: user_id,
  };

  // TeamNFTのmint
  const xteamNftMint = async (event) => {
    
    // ボタン押下時のデフォルトのフォーム送信処理を無効化する
    event.preventDefault();

    // チームID存在確認
    const team_tba = await teamExist(team_id);

    // パスワードハッシュ化
    const hash = await hashPassword(password);
    console.log(hash);

    if (team_tba !== null) {
      // チームIDが存在する場合

      // ユーザID存在確認
      const userInfo = await memberExist(team_id, user_id);

      if (userInfo.data !== null) {
        // ユーザIDが存在する場合

        // パスワードハッシュ化 
        const passchk = await comparePassword(password, userInfo.pass);

        // パスワードチェック
        if (passchk == true ) {
          //メンバーTBA存在チェック
          if (userInfo.usertba !== null) {
            //TBA存在有
            router.push('/displayHome?teamID=' + team_id + '&userID=' + user_id);
          } else {
            //TBA存在無
            router.push('/childNftMint?teamID=' + team_id + '&userID=' + user_id);
          }

        } else {
          alert("ID もしくは パスワードが不正です");
        }

      } else {
        // ユーザIDが存在しない場合

        // Memberテーブルにレコード登録
        await registMember(team_id, user_id, hash);

        // メンバー登録画面へ遷移
        router.push('/childNftMint?teamID=' + team_id + '&userID=' + user_id);
      }
      
    } else {
      // チームIDが存在しない場合

      // チームNFTmint
      const tokenid = await teamNftMint();
      
      // チームTBA取得
      const teaTba = await teamTba(tokenid);
      
      // チームTBAをDBへ登録
      await registTeam(team_id, teaTba);

      // Memberテーブルにレコード登録
      await registMember(team_id, user_id, hash);

      // メンバー登録画面へ遷移
      router.push('/childNftMint?teamID=' + team_id + '&userID=' + user_id);
    }
    
    //return res.json()
  }

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

  // stateを更新する関数を定義
  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleteam_idChange = (event) => {
    setteam_id(event.target.value);
  };

  // パスワードハッシュ化
  const hashPassword = async (pass) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(pass, salt);
  }

  // パスワードチェック
  const comparePassword = async (rawPassword, hash) => {
    return bcrypt.compareSync(rawPassword, hash);
  }

  return memberCreatePage ? (
    <>
      {router.push('/childNftMint?teamID=' + team_id + '&userID=' + user_id)}
      
    </>
  ) : (
    <body style={NotoSans}>
      <div className="h-screen bg-whitesmoke">
        <div className="max-w-md mx-auto p-3 bg-white" style={{ height: `${screenHeight}px` }}>
          <HeaderImg />

          <div className="container mx-auto">
            <img src="/img/01_猫マスター.png" className="w-full" />
            <form className="mt-3">

              <div className="mt-3">
                <label htmlFor="user_id" className="block">IDを入力してください</label>
                <input placeholder="メールアドレス" type="text" id="user_id" name="user_id" className="w-full mt-1 border rounded-md p-2" value={user_id} onChange={handleUserIdChange} />
              </div>
              <div className="mt-3">
                <label htmlFor="password" className="block">パスワードを入力してください</label>
                <input placeholder="パスワード" type="password" id="password" name="password" className="w-full mt-1 border rounded-md p-2" value={password} onChange={handlePasswordChange} />
                <small className="form-text text-muted">*8文字以上の英数字</small>
              </div>


              <div className="justify-center mt-3">
                <div className="rounded-md p-5 bg-cfeeed" style={{ backgroundColor: '#CFEEED' }}>
                  ✓チームコード を入力してください<br />
                  ✓あたらしくチームを作る場合、あたらしいチームコード を入力してください
                  <div className="mt-3">
                    <input placeholder="チームコード" type="text" id="team_id" name="team_id" className="w-full mt-1 border rounded-md p-2" value={team_id} onChange={handleteam_idChange} />
                  </div>
                </div>
              </div>
              {/* <p>userid: {user_id}</p>
              <p>password: {password}</p>
              <p>team_id: {team_id}</p> */}

              <div className="container mt-4">
                <div className="flex justify-center">
                  <button
                    onClick={(event) => xteamNftMint(event)}
                    className="w-2/3 btn text-center py-2 px-4 rounded-full text-white text-xl drop-shadow-lg"
                    style={{ backgroundColor: '#86D2D2' }}>確定する
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}