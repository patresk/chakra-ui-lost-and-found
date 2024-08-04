import type { Metadata } from 'next';

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
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
