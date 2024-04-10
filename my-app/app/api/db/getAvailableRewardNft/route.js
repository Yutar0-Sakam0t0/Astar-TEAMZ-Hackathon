import pool from '../../dbConfig/db';
import { NextResponse } from "next/server";

export async function POST(req) {

  if (req.method === 'POST') {
    const { teamId, userId } = await req.json();
    console.log(teamId, userId);

    try {
      const result = await pool.query('SELECT token_id FROM REWARD WHERE burn_flg = FALSE AND team_id = $1 AND user_id = $2 AND expiration > CURRENT_TIMESTAMP', [teamId, userId]);

      if (result.rows.length < 1) {
        return NextResponse.json({ data: null }, { status: 200 });
      }

      const tokenIds = result.rows.map(row => row.token_id);
      console.log(tokenIds);

      return NextResponse.json({ data: tokenIds }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}