import React, { Fragment } from "react";
import "./contact.css";

const Contact = () => {
  return (
    <Fragment>
      <div className="contact">
        <h1>Contact Us</h1>
        <p>
          Have questions or concerns? We're here to help! Feel free to reach out
          to our customer support team for assistance.
        </p>
        <p>
          <a className="mailBtn" href="mailto:tiwariparth26@gmail.com">
            Contact: tiwariparth26@gmail.com
          </a>
        </p>
        <p>Phone:1234567890</p>
      </div>
    </Fragment>
  );
};

export default Contact;
