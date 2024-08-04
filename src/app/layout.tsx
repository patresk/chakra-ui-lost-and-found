import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import '../index.css';

export const metadata: Metadata = {
  title: 'Chakra UI Lost & Found',
  description: `Missing some components in Chakra UI? You've just found them! A collection of components that you would have ended up implementing yourself otherwise. They support your existing theme and dark mode out of the box.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <div id="root">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
