import './globals.css';

export const metadata = {
  title: 'Bantrab — Sign in',
  description: 'Bantrab authentication demo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
