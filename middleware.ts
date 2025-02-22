import { NextResponse } from 'next/server';

export async function middleware() {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    // Apply Content Security Policy (CSP)
    let cspHeader = '';
    if (process.env.NODE_ENV === 'production') {
        cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' https://vercel.live/_next-live/feedback/;
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data: https://authjs.dev/;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        worker-src 'self' blob:;
        frame-src https://vercel.live/;
        connect-src 'self' blob: https://www.google-analytics.com/ https://analytics.google.com/;
        upgrade-insecure-requests;
    `;
    } else if (process.env.NODE_ENV === 'development') {
        // cspHeader = `
        //     default-src 'self';
        //     script-src 'self' 'nonce-${nonce}' https://vercel.live/_next-live/feedback/;
        //     style-src 'self' 'unsafe-inline';
        //     img-src 'self' blob: data: https://authjs.dev/;
        //     font-src 'self';
        //     object-src 'none';
        //     base-uri 'self';
        //     form-action 'self';
        //     frame-ancestors 'none';
        //     worker-src 'self' blob:;
        //     frame-src https://vercel.live/;
        //     connect-src 'self' blob: https://www.google-analytics.com/ https://analytics.google.com/;
        //     upgrade-insecure-requests;
        // `;
    }

    const response = NextResponse.next();

    const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
    response.headers.set('x-nonce', nonce);

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)', // Apply middleware to all routes
    ],
};