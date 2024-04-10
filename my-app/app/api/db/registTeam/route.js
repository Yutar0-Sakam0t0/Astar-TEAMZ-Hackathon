import pool from '../../dbConfig/db';
import { NextResponse } from "next/server";

export async function POST(req) {

  if (req.method === 'POST') {
    const { teamId, teamTba } = await req.json();
    console.log(teamId, teamTba);

    try {
      const result = await pool.query('INSERT INTO TEAM (team_id, team_tba) VALUES ($1, $2)', [teamId, teamTba]);

      return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}