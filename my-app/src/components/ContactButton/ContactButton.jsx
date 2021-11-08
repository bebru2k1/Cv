import React from "react";
import "./ContactButton.css";
import * as Icon from "react-feather";
function ContactButton() {
  return (
    <div className="contact">
      <p className="contact__title">Liên hệ với mình</p>
      <div class="wrapper">
        <div class="icon facebook">
          <div class="tooltip">Facebook</div>

          <Icon.Facebook />
        </div>
        <div class="icon twitter">
          <div class="tooltip">Twitter</div>

          <Icon.Twitter />
        </div>
        <div class="icon instagram">
          <div class="tooltip">Instagram</div>

          <Icon.Instagram />
        </div>
        <div class="icon github">
          <div class="tooltip">Github</div>

          <Icon.GitHub />
        </div>
        <div class="icon youtube">
          <div class="tooltip">Youtube</div>

          <Icon.Youtube />
        </div>
      </div>
    </div>
  );
}

export default ContactButton;
