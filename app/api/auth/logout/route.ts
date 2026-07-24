import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function clearSession(request: Request) {
  const response = NextResponse.redirect(new URL('/', request.url), 303);
  for (const name of ['promptseen_session', 'promptseen_signed_in', 'promptseen_plan', 'promptseen_oauth_state']) {
    response.cookies.set(name, '', { path: '/', httpOnly: name === 'promptseen_session' || name === 'promptseen_oauth_state', secure: true, sameSite: 'lax', maxAge: 0 });
  }
  return response;
}

export async function POST(request: Request) {
  return clearSession(request);
}

export async function GET(request: Request) {
  return clearSession(request);
}