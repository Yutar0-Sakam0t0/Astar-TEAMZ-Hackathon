import pool from '../../dbConfig/db';
import { NextResponse } from "next/server";

export async function POST(req) {

  if (req.method === 'POST') {
    const teamId = await req.json();
    console.log(teamId);

    try {
      const result = await pool.query('SELECT count(*) FROM REWARD WHERE team_id = $1 AND expiration > CURRENT_TIMESTAMP', [teamId]);

      const count = parseInt(result.rows[0].count);
      console.log(count);

      return NextResponse.json({ count: count }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}