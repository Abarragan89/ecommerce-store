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
    //     cspHeader = `
    //     default-src 'self';
    //     script-src 'self' 'unsafe-inline' 'nonce-${nonce}' 'unsafe-eval' http://localhost:3000 https://pagead2.googlesyndication.com/ https://cdn.jsdelivr.net https://www.googletagmanager.com/gtag/;
    //     style-src 'self' 'unsafe-inline';
    //     img-src 'self' blob: data: http://localhost:3000 https://unfinished-pages.s3.us-east-2.amazonaws.com https://*.googleusercontent.com https://*.yahoo.com https://*.outlook.com https://authjs.dev/ https://ep1.adtrafficquality.google/pagead/ https://pagead2.googlesyndication.com/;
    //     font-src 'self';
    //     object-src 'none';
    //     worker-src 'self' blob:;
    //     base-uri 'self';
    //     form-action 'self';
    //     frame-src https://www.youtube.com/ https://googleads.g.doubleclick.net/ https://ep2.adtrafficquality.google/ https://www.google.com/;
    //     connect-src 'self' blob: https://ep1.adtrafficquality.google/ https://csi.gstatic.com/ https://www.googletagmanager.com/gtag/;
    //     frame-ancestors 'none';
    //     upgrade-insecure-requests;
    // `;
    }
    
    const response = NextResponse.next();

    const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
    response.headers.set('x-nonce', nonce);

    return response;
}