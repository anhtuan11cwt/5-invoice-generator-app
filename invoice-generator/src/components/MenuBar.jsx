import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Logo from "./Logo";

const MenuBar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Đăng xuất thành công!");
  };

  return (
    <nav className="sticky-top bg-white shadow-sm navbar navbar-expand-lg navbar-light">
      <div className="py-2 container">
        <Link className="d-flex align-items-center navbar-brand" to="/">
          <Logo />
          <span
            className="ms-3 fw-bold fs-4"
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
          <ul className="align-items-center ms-auto navbar-nav">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">
                Trang Chủ
              </Link>
            </li>

            {isAuthenticated && (
              <>
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
              </>
            )}

            <li className="ms-lg-3 mt-3 mt-lg-0 nav-item">
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">{user?.fullName}</span>
                  <button
                    className="px-3 rounded-pill btn-outline-danger btn"
                    onClick={handleLogout}
                    type="button"
                  >
                    Đăng Xuất
                  </button>
                </div>
              ) : (
                <Link
                  className="px-4 rounded-pill btn btn-primary"
                  to="/login"
                  type="button"
                >
                  Đăng Nhập / Đăng Ký
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
