import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Divya Bharat | 4th Year Engineering Student & Software Architect',
  description: 'Portfolio of Divya Bharat, 4th-year engineering student specializing in distributed systems, AI & robotics with interactive 3D models and modern animations.',
  openGraph: {
    title: 'Divya Bharat | 4th Year Engineering Student & Software Architect',
    description: 'Portfolio of Divya Bharat, 4th-year engineering student specializing in distributed systems, AI & robotics with interactive 3D models and modern animations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divya Bharat | Engineering Portfolio',
    description: '4th-year engineering student specializing in distributed systems, AI & robotics with interactive 3D models.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
