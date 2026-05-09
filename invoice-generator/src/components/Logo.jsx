import { assets } from "../assets/assets";

const Logo = () => {
  return (
    <img
      alt="Logo Quick Invoice"
      className="img-fluid"
      src={assets.logo}
      style={{
        height: "48px",
        objectFit: "contain",
        width: "48px",
      }}
    />
  );
};

export default Logo;
