// app/layout.tsx

import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import 'react-calendar/dist/Calendar.css';
import "swiper/css";
import "swiper/css/bundle";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-tabs/style/react-tabs.css';

// Styles
import "../../styles/style.css";

import LayoutProvider from '../providers/LayoutProvider'; // Ensure this path is correct
import { Inter } from "next/font/google";
import { ReactNode } from 'react';
import ClientOnly from '../components/ClientOnly';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chambiar - AI workforce platform",
  description: "Chambiar - AI workforce platform",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutProvider>
          <ClientOnly>
            {children}
          </ClientOnly>
        </LayoutProvider>
      </body>
    </html>
  );
}
