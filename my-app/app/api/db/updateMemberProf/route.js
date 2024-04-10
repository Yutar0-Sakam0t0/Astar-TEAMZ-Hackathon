import pool from '../../dbConfig/db';
import { NextResponse } from "next/server";

export async function POST(req) {

  if (req.method === 'POST') {
    const { imgId, nickName, userTBA, teamId, userId } = await req.json();
    console.log(imgId, nickName, userTBA, teamId, userId);

    try {
      const result = await pool.query('UPDATE MEMBER SET img_id = $1, name = $2, User_tba = $3 WHERE team_id = $4 AND user_id = $5', [imgId, nickName, userTBA, teamId, userId]);

      return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}
