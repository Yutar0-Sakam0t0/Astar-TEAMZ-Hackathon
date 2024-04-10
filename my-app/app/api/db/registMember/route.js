import pool from '../../dbConfig/db';
import { NextResponse } from "next/server";

export async function POST(req) {

  if (req.method === 'POST') {
    const { teamId, userId, pass } = await req.json();
    console.log(teamId, userId, pass);

    try {
      const result = await pool.query('INSERT INTO MEMBER (team_id, user_id, pass, img_id, name, User_tba, champ_flg) VALUES ($1, $2, $3, NULL, NULL, NULL, FALSE)', [teamId, userId, pass]);

      return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}