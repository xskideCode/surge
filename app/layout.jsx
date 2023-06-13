import "@styles/globals.css";

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
