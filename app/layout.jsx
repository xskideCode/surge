import "@styles/globals.css";

import Script from 'next/script'
import Navbar from "@components/navbar/Navbar";
import Provider from "@components/providers/Provider";
import RegisterModal from "@components/modals/RegisterModal";
import ToasterProvider from "@components/providers/ToasterProvider";
import LoginModal from "@components/modals/LoginModal";
import Footer from "@components/home/Footer";
import SearchModal from "@components/modals/SearchModal";

export const metadata = {
  title: "Surge Community",
  description: "Discover & Share Youtube Videos",
};

const RootLayout = ({ children }) => (
  <html lang="en">

    {/* Google tag (gtag.js) */}
    
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>

    <head>
      <link rel="icon" href="/assets/icons/favicon.ico" />
    </head>
    <body>
      <Provider>
        <div className="main bg-primary font-poppins" />
        <main className="app">
          <Navbar />
          <ToasterProvider />
          <SearchModal />
          <LoginModal />
          <RegisterModal />
          {children}
          <Footer />
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
