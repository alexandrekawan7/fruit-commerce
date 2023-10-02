import { Providers } from './providers';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fruits Commerce',
  description: 'Uma demonstração'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}