import { Link } from "react-router-dom";
import Logo from "./Logo";

const MenuBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Logo />
          <span
            className="fw-bold fs-4 ms-3"
            style={{
              color: "#0D6EFD",
              letterSpacing: "-0.5px",
            }}
          >
            Quick Invoice
          </span>
        </Link>

        <button
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Chuyển đổi menu"
          className="navbar-toggler"
          data-bs-target="#navbarMenu"
          data-bs-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">
                Trang Chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/generate">
                Tạo Hóa Đơn
              </Link>
            </li>
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <button
                className="btn btn-primary rounded-pill px-4"
                type="button"
              >
                Đăng Nhập / Đăng Ký
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
