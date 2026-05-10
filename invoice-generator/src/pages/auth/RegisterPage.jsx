import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    confirmPassword: "",
    email: "",
    fullName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    if (!formData.fullName.trim()) {
      toast.error("Vui lòng nhập họ tên!");
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password,
      });
      toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác thực.");
      navigate("/verify-email");
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
          <div className="col-md-6 col-lg-5">
            <div className="shadow-sm border-0 card">
              <div className="p-4 card-body">
                <div className="mb-4 text-center">
                  <h4 className="fw-bold" style={{ color: "#0D6EFD" }}>
                    Đăng Ký
                  </h4>
                  <p className="text-muted small">
                    Tạo tài khoản để sử dụng Quick Invoice
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      className="form-label small fw-medium"
                      htmlFor="fullName"
                    >
                      Họ và tên
                    </label>
                    <input
                      className="form-control"
                      disabled={loading}
                      id="fullName"
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Nguyễn Văn A"
                      required
                      type="text"
                      value={formData.fullName}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      className="form-label small fw-medium"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      disabled={loading}
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
                        disabled={loading}
                        id="password"
                        minLength={6}
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
                        disabled={loading}
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

                  <div className="mb-3">
                    <label
                      className="form-label small fw-medium"
                      htmlFor="confirmPassword"
                    >
                      Xác nhận mật khẩu
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        disabled={loading}
                        id="confirmPassword"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="********"
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                      />
                      <button
                        className="btn-outline-secondary btn"
                        disabled={loading}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{ borderLeft: "none" }}
                        type="button"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    className="py-2 w-100 btn btn-primary"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Đang đăng ký..." : "Đăng Ký"}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <span className="text-muted small">
                    Đã có tài khoản?{" "}
                    <Link
                      className="text-decoration-none fw-medium"
                      style={{ color: "#0D6EFD" }}
                      to="/login"
                    >
                      Đăng nhập
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

export default RegisterPage;
