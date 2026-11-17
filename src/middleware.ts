import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "./constants/routes";

const SESSION_COOKIE = "hf_session";

export const middleWare = (request: NextRequest) => {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const isLoginRoute = request.nextUrl.pathname.startsWith(ROUTES.LOGIN);

  if (!hasSession && !isLoginRoute) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (hasSession && isLoginRoute) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};

export default middleWare;
