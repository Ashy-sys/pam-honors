import "./globals.css";

export const metadata = {
  title: "PAM HONORS | African Music Awards",
  description:
    "Official Pan-African music awards celebrating excellence in African music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">

        {/* NAVBAR */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-gray-900">
          <div className="flex justify-between items-center px-8 py-5">

            <h1 className="text-yellow-400 font-bold tracking-widest">
              PAM HONORS
            </h1>

            <nav className="flex gap-6 text-sm text-gray-400">
              <a href="/" className="hover:text-yellow-400 transition">Home</a>
              <a href="/about" className="hover:text-yellow-400 transition">About</a>
              <a href="/categories" className="hover:text-yellow-400 transition">Categories</a>
              <a href="/nominations" className="hover:text-yellow-400 transition">Nominations</a>
            </nav>

          </div>
        </header>

        {/* PAGE CONTENT */}
        <main>{children}</main>

      </body>
    </html>
  );
}