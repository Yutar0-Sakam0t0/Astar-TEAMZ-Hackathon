import pool from '../../dbConfig/db';
import { NextResponse } from "next/server";

export async function POST(req) {

  if (req.method === 'POST') {
    const { teamId, userId } = await req.json();
    console.log(teamId, userId);

    try {
      const result = await pool.query('SELECT pass, user_tba FROM MEMBER WHERE team_id = $1 and user_id = $2', [teamId, userId]);

      if (result.rows.length < 1) {
        return NextResponse.json({ data: null }, { status: 200 });
      }

      const pass = result.rows[0].pass;
      const usertba = result.rows[0].user_tba;

      console.log(pass,usertba);

      return NextResponse.json({ data: 'complete', pass: pass, usertba: usertba }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}