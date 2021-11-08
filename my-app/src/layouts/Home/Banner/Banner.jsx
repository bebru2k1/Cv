import React from "react";
import imageMe from "../../../assets/image/me.jpg";
import "./Banner.css";
import Typer from "../../../components/Common/Typing";
import aboutme from "../../../assets/image/meabout.jpg";
function Banner() {
  return (
    <div>
      <div className="banner">
        <div className="banner__left">
          <p className="banner__left__title">Hi, Mình là </p>
          <Typer
            classNames={["box font-large", "box font-large"]}
            content={["Đức Anh", "Web Developer"]}
            speed={200}
            classNameCpn="banner__left__title__typing"
          />

          {/* <div className="banner-contact">
          <p>Kết nối với mình</p>
          <img
            src="https://img.icons8.com/plasticine/100/000000/facebook-circled.png"
            alt="facebook"
            className="banner-contact__image"
          />
          <img
            src="https://img.icons8.com/plasticine/100/000000/facebook-messenger.png"
            alt="messenger"
            className="banner-contact__image"
          />
        </div> */}
        </div>
        <div className="banner__right hiddenOnMobile">
          <img src={imageMe} alt="" />
        </div>
      </div>
      <div className="flex-layout">
        <div className="contact">
          <img src={aboutme} alt="" className="contact__aboutme" />
        </div>
        <div className="about">
          <div className="about__title font-large">Mình là ai?</div>
          <div className="about__des">
            <p>
              {" "}
              Chào mọi người mình là <span className="box">Đức Anh</span>.
              <br />
              <br />
              Mình đang là sinh viên sư phạm năm 2. <br />
            </p>
            <p>
              <br />
              Mình biết đến lập trình cũng do tình cờ. Mình theo học đến nay
              cũng được một năm. Do học một lúc hai ngành nên cũng gặp rất nhiều
              khó khăn.
            </p>
            <br />
            <p>Nhưng với niềm đam mê mình không từ bỏ.</p>
            <br />
            <p>
              Blog của mình viết về một số chủ đề như{" "}
              <span className="html-text ">HTML</span>,{" "}
              <span className="css-text ">CSS</span>,{" "}
              <span className="javascript-text ">JavaScript</span> và{" "}
              <span className="react-text ">React</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
