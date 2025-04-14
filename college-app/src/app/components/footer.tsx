//create a footer component for this project//

export default function Footer() {
  return (
    <div className="flex flex-row items-center justify-between bg-black p-4 px-20 text-white">
      <div>
        <p>All rights reserved &copy; 2025</p>
      </div>
      <div className="flex flex-row space-x-10">
        <div className="flex flex-col">
          <h1>About us</h1>
          <p>Contact Us</p>
          <p>Sponsors</p>
          <p>Terms of Service</p>
        </div>
        <div className="flex flex-col">
          <h1>News</h1>
          <p>Entertainment</p>
          <p>Road Trip</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
