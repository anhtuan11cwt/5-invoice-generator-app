import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setStep(2);
      toast.success("Đã gửi mã đặt lại mật khẩu đến email!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.resetPassword(code, newPassword);
      toast.success("Đặt lại mật khẩu thành công!");
      navigate("/login");
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
                    {step === 1 ? "Quên Mật Khẩu" : "Đặt Lại Mật Khẩu"}
                  </h4>
                  <p className="text-muted small">
                    {step === 1
                      ? "Nhập email để nhận mã đặt lại mật khẩu"
                      : "Nhập mã và mật khẩu mới"}
                  </p>
                </div>

                {step === 1 ? (
                  <form onSubmit={handleSendEmail}>
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
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        type="email"
                        value={email}
                      />
                    </div>

                    <button
                      className="py-2 w-100 btn btn-primary"
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? "Đang gửi..." : "Gửi Mã Xác Thực"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                      <label
                        className="form-label small fw-medium"
                        htmlFor="code"
                      >
                        Mã xác thực
                      </label>
                      <input
                        className="form-control"
                        id="code"
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Nhập mã..."
                        required
                        type="text"
                        value={code}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        className="form-label small fw-medium"
                        htmlFor="newPassword"
                      >
                        Mật khẩu mới
                      </label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          id="newPassword"
                          minLength={6}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="********"
                          required
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
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

                    <button
                      className="py-2 w-100 btn btn-primary"
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? "Đang đặt lại..." : "Đặt Lại Mật Khẩu"}
                    </button>
                  </form>
                )}

                <div className="mt-4 text-center">
                  <Link
                    className="text-decoration-none small"
                    style={{ color: "#0D6EFD" }}
                    to="/login"
                  >
                    Quay lại đăng nhập
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
