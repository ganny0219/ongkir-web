import type { Metadata } from "next";
import "./globals.css";
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-full max-w-[700px] px-4 md:px-0 mx-auto">
          <nav>
            <h1 className="text-4xl mb-2">CEK ONGKIR</h1>
            <ul className="bg-[#eaeaea] p-2 mb-2">
              <li className="cursor-pointer">
                <a href={process.env.NEXT_PUBLIC_BASE_URL}>Beranda</a>
              </li>
            </ul>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
