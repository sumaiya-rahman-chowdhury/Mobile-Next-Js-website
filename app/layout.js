import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./component/Navbar";
import SessionProviderWrapper from "./component/SessionProvider";
// import { ToastBar } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font",
  subsets: ["latin"],
  weight: ["400", "700"], // Adjust weights as needed
});




export const metadata = {
  title: "Mobile App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <SessionProviderWrapper>
          <NavBar/>
          {/* <ToastBar/> */}
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
