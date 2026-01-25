import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "../styles/WhatsappFloatingButton.css";

function WhatsappFloatingButton() {
  return (
    <a
      href="https://wa.me/9443397824"
      className="whatsapp-float-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faWhatsapp} size="2x" />
    </a>
  );
}

export default WhatsappFloatingButton;
