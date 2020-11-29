import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from '../assets/1.jpg';
// import Card from './card';
import Cardlist from './cardlist';
import banner2 from '../assets/banner2.jpg';
import banner1 from '../assets/banner1.jpg';
import './Homepg.css';
import React, {useState} from "react";
import './Home.css';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background:  '#00b5ad' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div

      className={className}
      style={{ ...style, display: "block", background: '#00b5ad' }}
      onClick={onClick}
    />
  );
}


export default function Home() {
    const { user, logout } = useAuth();
    const [error, setError] = useState(null);
    const history = useHistory();

    async function handleLogout(){
        setError('');
        try{
            await logout();
            history.push('/auth')
        } catch (err){
            setError('Failed To Logout');
        }
    }

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      // speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      
    };
    return (
      <div className='box'>
      
  <img style={{width: '100%' }} src={banner2}/>

       
        <Slider {...settings}>
          <div >
            <img src='https://imgd.aeplcdn.com/0x0/cw/ec/39048/Audi-etron-Exterior-170076.jpg?wm=0' className='contt'/>
          </div>
          <div>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZWAzJByZS9QJuXW0y1GIfGmOZpMTtdFFmQ&usqp=CAU' className='contt'/>
          </div>
          <div>
          <img src='https://cdn.vox-cdn.com/thumbor/_Uu8gFnGfJ87aPQ0LsjjGzkiMLU=/0x0:675x450/1200x800/filters:focal(284x171:392x279)/cdn.vox-cdn.com/uploads/chorus_image/image/66298585/Untitled_3.0.jpg' className='contt'/>
          </div>
          <div>
          <img src='https://www.businessinsider.in/thumb/msid-77377561,width-640,resizemode-4/Master.jpg' className='contt'/>
          </div>
          <div>
          <img src='https://www.att.com/catalog/en/skus/images/lg-k40-platinum%20gray-450x350.png' className='contt'/>
          </div>
          <div>
          <img src='https://imgd.aeplcdn.com/0x0/cw/ec/39048/Audi-etron-Exterior-170076.jpg?wm=0' className='contt'/>
          </div>
        </Slider>
        <div style={{padding:'25px' }}>
        <img style={{width: '100%' }} src={banner1}/>
        </div>
        
        <Cardlist/>
      </div>
    );
  }
}
