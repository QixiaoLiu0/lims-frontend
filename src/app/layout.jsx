import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "lims-frontend",
  description:
    "Streamline project management with an intuitive interface that helps teams collaborate, track progress, and meet deadlines efficiently.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
