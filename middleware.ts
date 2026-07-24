import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_HOST = 'promptseen.online';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim().toLowerCase();
  const isHttp = url.protocol === 'http:' || forwardedProto === 'http';

  // Keep every public URL on one crawlable origin. This also prevents GSC from
  // retaining HTTP/www variants as separate redirecting URLs.
  if (host === 'www.promptseen.online') {
    return NextResponse.redirect(`https://${CANONICAL_HOST}${url.pathname}${url.search}`, 308);
  }

  if (host === CANONICAL_HOST && isHttp) {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
