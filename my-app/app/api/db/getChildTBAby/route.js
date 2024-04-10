import pool from '../../dbConfig/db';
import { NextResponse } from "next/server";

export async function POST(req) {

  if (req.method === 'POST') {
    const { teamId, userId } = await req.json();
    console.log(teamId, userId);

    try {
      const result = await pool.query('SELECT user_tba FROM MEMBER WHERE team_id = $1 AND user_id = $2', [teamId, userId]);

      if (result.rows.length < 1) {
        return NextResponse.json({ data: null }, { status: 200 });
      }

      const userTba = result.rows[0].user_tba;
      console.log(userTba);

      return NextResponse.json({ data: userTba }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}