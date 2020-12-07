import React from "react";
import logo from '../assets/logo1.png';
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="ui three column very relaxed grid">
                <div className="column">
                    <img style={{width: '60px', height: '60px'}} src={logo}/><br/>
                    <i class="map marker alternate icon"></i>
                    <li>342-420-6969</li>
                    <li>Delhi, India</li>
                    <li>123 Street Kbu</li>

                </div>
                <div className="column">
                    <h4>Connect with Us :</h4>
                    <button class="ui circular facebook icon button">
                    <i class="facebook icon"></i>
                    </button>
                    <button class="ui circular twitter icon button">
                    <i class="twitter icon"></i>
                    </button>
                    <button class="ui circular linkedin icon button">
                    <i class="linkedin icon"></i>
                    </button>
                    <button class="ui circular google plus icon button">
                    <i class="google plus icon"></i>
                    </button>

                </div>
                <div className="column">
                    <h4>Contact Us</h4>
                    <i class="envelope icon"></i>mail@kbu.com<br/>
                    <i class="phone icon"></i>+91 4578963214
                    
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