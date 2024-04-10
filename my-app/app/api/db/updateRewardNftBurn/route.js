import pool from '../../dbConfig/db';
import { NextResponse } from "next/server";

export async function POST(req) {

  if (req.method === 'POST') {
    const { teamId, userId, tokenId } = await req.json();
    console.log(teamId, userId, tokenId);

    try {
      const result = await pool.query('UPDATE REWARD SET burn_flg = TRUE WHERE team_id = $1 AND user_id = $2 AND token_id = $3', [teamId, userId, Number(tokenId)]);

      return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}
