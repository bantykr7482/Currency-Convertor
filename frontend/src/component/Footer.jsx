import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h3>🌍 SprintGlobalPay</h3>
          <p>Simple, fast & reliable currency conversion platform.</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Converter</a></li>
            <li><a href="#">Exchange Rates</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@sprintglobalpay.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} SprintGlobalPay. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
