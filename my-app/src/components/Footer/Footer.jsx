import React from "react";
import facebookimage from "../../assets/image/facebookdon.png";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__contact">
        <p className="footer__contact__title">Liên hệ với tôi</p>
        <a
          className="footer__contact__facebook"
          href="https://www.facebook.com/kakalick/"
          target="blank"
        >
          <img
            className="footer__contact__facebook-icon"
            src={facebookimage}
            alt=""
          />
        </a>
      </div>
      <p className="footer__copyright">Copyright © 2021 Lê Đức Anh</p>
    </footer>
  );
}

export default Footer;
