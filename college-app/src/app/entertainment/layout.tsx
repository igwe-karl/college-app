import Header from "../components/header";
import Footer from "../components/footer";

export default function HomeLayout({
  children, // will be a page or nested layout
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
