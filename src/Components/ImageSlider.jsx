import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./sliderimg.css"

//Some Css..



export default function Carousela() {
return (
<Carousel  infiniteLoop={true} autoPlay={true}showArrows={false}showThumbs={false}className='responsive-carousel'>
    <div>
        <img src="/gang.jpg" />
        <p className="legend">צוות הפיתוח(למחיקה) </p>
    </div>
    <div>
        <img src="cute.jpg" />
        <p className="legend">אחיינית חמודה</p>
    </div>
</Carousel>

);
}


