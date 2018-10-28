import React ,{Component} from 'react';
import '../App.css'

import header1 from '../images/header/header1.png'
import header2 from '../images/header/header2.png'
import header3 from '../images/header/header3.png'

import Slider from 'react-slick'

export default class Header extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      autoplay:true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    const styles = { backgroundSize:'cover',width:'100%'}
    return (
      <div className="header-top">
      <Slider {...settings}>
         <div className="item"> <img alt="header 1" src={header1} style={{...styles}}/> </div>
         <div className="item"> <img alt="header 2" src={header2} style={{...styles}}/></div>
         <div className="item"> <img alt="header 3" src={header3} style={{...styles}}/></div>
      </Slider>
      </div>
    );
  }
}
