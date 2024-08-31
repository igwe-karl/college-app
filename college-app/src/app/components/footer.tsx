//create a footer component for this project//

export default function Footer() {
  return (
    <div className="flex flex-row items-center justify-between bg-black p-4 px-20">
      <div>
        <h1>About us</h1>
        <p>Contact Us</p>
        <p>Sponsors</p>
        <p>Terms of Service</p>
      </div>
      <div>
        <p>News</p>
        <p>Entertainment</p>
        <p>Road Trip</p>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
}
