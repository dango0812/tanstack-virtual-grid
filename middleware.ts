// next
import { NextResponse, NextRequest } from "next/server";
// accept-language
import acceptLanguage from "accept-language";
// i18n
import { fallbackLng, languages, cookieName } from "@i18n/settings";

acceptLanguage.languages(languages);

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|sitemap.xml|robots.txt).*)"]
};

export function middleware(req: NextRequest) {
    const { pathname, search } = req.nextUrl;

    if (pathname.indexOf("icon") > -1 || pathname.indexOf("chrome") > -1) {
        return NextResponse.next();
    }

    const lng = getLanguage(req);

    let response = NextResponse.next();
    let target = `${pathname}${search}`;
    let mustRedirect = false;

    if (lng === fallbackLng) {
        if (target === `/${fallbackLng}` || target.startsWith(`/${fallbackLng}/`)) {
            target = target.replace(`/${fallbackLng}`, target === `/${fallbackLng}` ? "/" : "");
            mustRedirect = true;
        }

        if (mustRedirect) {
            response = NextResponse.redirect(new URL(target, req.url));
        }

        if (!pathname.startsWith(`/${fallbackLng}/`) && pathname !== `/${fallbackLng}` && lng === fallbackLng) {
            response = NextResponse.rewrite(new URL(`/${fallbackLng}${pathname}${search}`, req.url));
        }
        
    } else {
        if (!languages.some((lang) => lang === pathname?.split("/")[1]) && !pathname.startsWith("/_next")) {
            target = `/${lng}${pathname}${search}`;
            response = NextResponse.redirect(new URL(`${target}`, req.url));
        }
    }

    response.cookies.set(cookieName, lng);
    return response;
}

function getLanguage(req: NextRequest) {
    let lng: string | null | undefined = req.nextUrl.pathname?.split("/")[1];

    if (!languages.some(lang => lang === lng)) {
        lng = null;
    }

    if (!lng && req.cookies.has(cookieName)) {
        lng = req.cookies.get(cookieName)?.value;
    }

    if (!lng && req.headers.get("Accept-Language")) {
        lng = acceptLanguage.get(req.headers.get("Accept-Language"));
    }

    if (!lng) {
        lng = fallbackLng;
    }

    return lng;
}