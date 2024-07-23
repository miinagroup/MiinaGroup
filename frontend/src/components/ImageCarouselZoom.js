import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function ImageCarouselZoom(props) {

    return (     
        <>
            <Carousel showThumbs={false} autoPlay={false} interval={3000} infiniteLoop={true} showArrows={true} showIndicators={true} >            
                {props.data.map((image, index) => (
                    <div key={index}>            
                    <Zoom>
                        <img                         
                        src={image} 
                        style={{maxHeight: '330px', width: 'auto'}}
                        alt=""
                        />
                    </Zoom>
                    </div>            
                ))};
            </Carousel>
        </>     
    );
}