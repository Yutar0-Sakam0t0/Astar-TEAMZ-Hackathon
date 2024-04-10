import pool from '../../dbConfig/db';
import { NextResponse } from "next/server";

export async function POST(req) {

  if (req.method === 'POST') {
    const { teamId, userId, tokenId } = await req.json();
    console.log(teamId, userId, tokenId);

    try {
      // 有効期限を設定(次の日曜日の23:59:59までとする)

      // 現在の日時を取得
      const currentDate = new Date();

      // 現在の曜日を取得（0: 日曜、1: 月曜、...、6: 土曜）
      const currentDayOfWeek = currentDate.getDay();

      // 次の日曜日までの日数を計算
      const daysUntilNextSunday = 7 - currentDayOfWeek;

      // 次の日曜日の日付を計算
      const nextSundayDate = new Date(currentDate.getTime() + daysUntilNextSunday * 24 * 60 * 60 * 1000);

      // 次の日曜日の23:59:59を設定
      nextSundayDate.setHours(23, 59, 59);

      // 日付を整形して表示
      const expiration = `${nextSundayDate.getFullYear()}-${(nextSundayDate.getMonth() + 1).toString().padStart(2, '0')}-${nextSundayDate.getDate().toString().padStart(2, '0')} ${nextSundayDate.getHours()}:${nextSundayDate.getMinutes()}:${nextSundayDate.getSeconds()}`;
      console.log(expiration)

      const result = await pool.query('INSERT INTO REWARD (team_id, user_id, token_id, mint_flg, burn_flg, expiration, date) VALUES ($1, $2, $3, FALSE, FALSE, $4, CURRENT_TIMESTAMP)', [teamId, userId, tokenId, expiration]);

      return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}
