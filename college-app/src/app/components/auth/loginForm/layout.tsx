"use client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white">
      {/* <Header /> */}
      <div>{children}</div>
      {/* <Footer /> */}
    </section>
  );
}
