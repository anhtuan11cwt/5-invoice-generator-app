import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success("Đăng nhập thành công!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: "#f8f9fa" }}
    >
      <div className="container">
        <div className="justify-content-center row">
          <div className="col-md-5 col-lg-4">
            <div className="shadow-sm border-0 card">
              <div className="p-4 card-body">
                <div className="mb-4 text-center">
                  <h4 className="fw-bold" style={{ color: "#0D6EFD" }}>
                    Đăng Nhập
                  </h4>
                  <p className="text-muted small">
                    Đăng nhập để quản lý hóa đơn
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      className="form-label small fw-medium"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      required
                      type="email"
                      value={formData.email}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      className="form-label small fw-medium"
                      htmlFor="password"
                    >
                      Mật khẩu
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        id="password"
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="********"
                        required
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                      />
                      <button
                        className="btn-outline-secondary btn"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ borderLeft: "none" }}
                        type="button"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-3 text-end">
                    <Link
                      className="text-decoration-none small"
                      style={{ color: "#0D6EFD" }}
                      to="/forgot-password"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <button
                    className="py-2 w-100 btn btn-primary"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <span className="text-muted small">
                    Chưa có tài khoản?{" "}
                    <Link
                      className="text-decoration-none fw-medium"
                      style={{ color: "#0D6EFD" }}
                      to="/register"
                    >
                      Đăng ký ngay
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
