import React from "react";
import logo from '../assets/logo1.png';
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="ui three column very relaxed grid">
                <div className="column">
                    <img style={{width: '100px', height: '100px'}} src={logo}/>

                    <li>342-420-6969</li>
                    <li>Delhi, India</li>
                    <li>123 Street Kbu</li>

                </div>
                <div className="column">
                    <h4>Connect with Us</h4>

                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Youtube</li>

                </div>
                <div className="column">
                    <h4>Contact Us</h4>

                    <li>mail@kbu.com</li>
                    <li>+91 4578963214</li>


                </div>
                <div>
                    <p>
                        &copy;{new Date().getFullYear()} KEEP BORROW USE | All rights reserved |
                        Terms Of Service | Privacy
                    </p>
                </div>
            </div>

        </div>

    );
}

export default Footer;