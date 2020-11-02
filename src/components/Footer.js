import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../assets/logo1.png';
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <img style={{width: '100px', height: '100px'}} src={logo}/>
            <h1 className="list-unstyled">
              <li>342-420-6969</li>
              <li>Delhi, India</li>
              <li>123 Street Kbu</li>
            </h1>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Connect with Us</h4>
            <ui className="list-unstyled">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Youtube</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Contact Us</h4>
            <ui className="list-unstyled">
              <li>mail@kbu.com</li>
              <li>+91 4578963214</li>
              
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} KEEP BORROW USE | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;