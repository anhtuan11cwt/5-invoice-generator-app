import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const VerifyEmailPage = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.verifyEmail(code);

      toast.success("Xác thực email thành công! Vui lòng đăng nhập.");
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
                    Xác Thực Email
                  </h4>
                  <p className="text-muted small">
                    Nhập mã xác thực 6 số đã được gửi đến email của bạn
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      className="form-label small fw-medium"
                      htmlFor="code"
                    >
                      Mã xác thực
                    </label>
                    <input
                      className="text-center form-control"
                      id="code"
                      maxLength={6}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="000000"
                      required
                      style={{ fontSize: "1.5rem", letterSpacing: "4px" }}
                      type="text"
                      value={code}
                    />
                  </div>

                  <button
                    className="py-2 w-100 btn btn-primary"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Đang xác thực..." : "Xác Thực"}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    className="text-decoration-none btn btn-link small"
                    onClick={() => navigate("/login")}
                    type="button"
                  >
                    Quay lại đăng nhập
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
