import pool from '../../dbConfig/db';
import { NextResponse } from "next/server";

export async function POST(req) {

  if (req.method === 'POST') {
    const teamId = await req.json();
    console.log(teamId);

    try {
      const result = await pool.query('SELECT team_tba FROM TEAM WHERE team_id = $1', [teamId]);

      if (result.rows.length < 1) {
        return NextResponse.json({ data: null }, { status: 200 });
      }

      const teamTba = result.rows[0].team_tba;
      console.log(teamTba);

      return NextResponse.json({ data: teamTba }, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}