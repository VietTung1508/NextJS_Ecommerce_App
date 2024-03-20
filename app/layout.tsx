import "./globals.css";
import { Raleway } from "next/font/google";
import AuthContext from "./context/AuthContext";
import getCurrentUser from "./actions/getCurrentUser";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Policy from "./components/Policy";
import getCategories from "./actions/getCategories";
import Providers from "./provider";
import ToasterContext from "./context/ToasterContext";

const raleway = Raleway({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Viz",
  description: "The number one for book selling",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const categories = await getCategories();
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Providers>
          <ToasterContext />
          <Navbar currentUser={currentUser!} categories={categories} />
          <AuthContext>{children}</AuthContext>
          <Policy />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
