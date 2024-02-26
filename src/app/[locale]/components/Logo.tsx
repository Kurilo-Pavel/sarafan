import "../styles/logo.css";
import Link from "next/link";

const Logo = () => {
  return <Link href="/" className="logo">
    <span className="headerLogo_name">SARAFAN</span>
    <span className="headerLogo_text">COLLECTION</span>
  </Link>
};
export default Logo;