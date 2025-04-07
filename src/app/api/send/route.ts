// src/app/api/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderEmail } from "../../utils/renderEmail";

export async function POST(req: NextRequest) {
  const {
    name,
    email,
    subject,
    team_1,
    team_2,
    id,
    contest,
    prices,
    prize_pool,
    spots,
    entry,
    win_teams,
    rank,
  } = await req.json();

  if (
    !name ||
    !email ||
    !subject ||
    !team_1 ||
    !team_2 ||
    !id ||
    !contest ||
    !prices ||
    !prize_pool ||
    !spots ||
    !entry ||
    !win_teams ||
    !rank
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const html = await renderEmail("full", {
    team_1,
    team_2,
    rank,
    win_teams,
    entry,
    spots,
    prize_pool,
    prices,
    contest,
    id,
    name,
    email,
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || "fantasysports@emaildream11.com",
      pass: process.env.SMTP_PASSWORD || "Qyops7712b@",
    },
  });

  const sender = "fantasysports@emaildream11.com"

  try {
    await transporter.sendMail({
      from: `Drean11 Fantasy Sports . ${sender}`,
      to: email,
      subject: `You Champion! You're a winner in  ${team_1} vs ${team_2}`,
      html,
    });
    

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
