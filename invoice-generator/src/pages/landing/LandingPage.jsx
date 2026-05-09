import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import Footer from "../../components/Footer";
import "./LandingPage.css";

function LandingPage() {
  return (
    <>
      <header className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <h1 className="hero-title">
                Tạo Hóa Đơn Dễ Dàng, Kết Quả Chuyên Nghiệp
              </h1>
              <p className="hero-subtitle">
                Tạo hóa đẹp trong vài phút. Lưu, xem trước, tải xuống và gửi hóa
                đơn ngay lập tức.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link
                  className="btn btn-primary btn-lg rounded-pill px-4"
                  to="/generate"
                >
                  Tạo Hóa Đơn Đầu Tiên
                </Link>
                <button
                  className="btn btn-outline-dark btn-lg rounded-pill px-4"
                  onClick={() => {
                    document.getElementById("learn-more").scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  type="button"
                >
                  Tìm Hiểu Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5" id="learn-more">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Bắt Đầu Trong 4 Bước</h2>
            <p className="text-muted">Tạo hóa đơn dễ dàng</p>
          </div>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="step-card">
                <h5>1. Nhập Thông Tin</h5>
                <p>Điền thông tin hóa đơn</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-card">
                <h5>2. Chọn Mẫu</h5>
                <p>Chọn mẫu hóa đẹp</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-card">
                <h5>3. Xem Trước</h5>
                <p>Xem trước hóa đơn ngay</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-card">
                <h5>4. Tải Xuống</h5>
                <p>Lưu PDF chuyên nghiệp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                alt=""
                className="img-fluid rounded-4 shadow"
                src={assets.hero}
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Tại Sao Chọn Quick Invoice?</h2>
              <ul className="feature-list">
                <li>Mẫu hóa đẹp mắt</li>
                <li>Hỗ trợ xem trước trực tiếp</li>
                <li>Lưu hóa đơn ngay lập tức</li>
                <li>Tải PDF chuyên nghiệp</li>
                <li>Gửi email hóa đơn trực tiếp</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">
            Sẵn Sàng Tối Ưu Hóa Việc Tạo Hóa Đơn?
          </h2>
          <p className="mb-4">
            Tham gia cùng hàng nghìn freelancer và doanh nghiệp.
          </p>
          <Link
            className="btn btn-light btn-lg rounded-pill px-5"
            to="/generate"
          >
            Bắt Đầu Tạo Hóa Đơn
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default LandingPage;
