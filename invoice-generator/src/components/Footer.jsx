import { Globe, Mail, User } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <div className="d-flex align-items-center">
            <Logo />
            <span className="fw-bold ms-3">Quick Invoice</span>
          </div>
          <p className="mb-0 text-muted">
            © {new Date().getFullYear()} Quick Invoice. Mọi quyền được bảo lưu.
          </p>
          <div className="d-flex gap-3">
            <a
              aria-label="Twitter"
              className="text-muted"
              href="https://twitter.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Globe size={20} />
            </a>
            <a
              aria-label="Email"
              className="text-muted"
              href="mailto:contact@quickinvoice.com"
            >
              <Mail size={20} />
            </a>
            <a
              aria-label="Hồ sơ"
              className="text-muted"
              href="https://linkedin.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <User size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
