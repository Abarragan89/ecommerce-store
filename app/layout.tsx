import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { headers } from 'next/headers';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: {
    template: `%s | Larkspur & Lily`,
    default: APP_NAME
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL)
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersList = await headers();
  const nonce = headersList.get('x-nonce');
  if (!nonce) return

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        nonce={nonce}
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
