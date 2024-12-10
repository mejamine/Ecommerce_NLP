import Slider from "react-slick";
import  { useEffect, useState } from 'react';
import SkletonLoading from './SkletonLoading';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProduitCard from "./ProduitCard";


const CarrouselP = () => {
    const [loading, setLoading] = useState(true)
    const [produits, setproduits] = useState([])


       //===Load Data ===//
       useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res = await fetch(`http://localhost:4000/ecommerce/produits`)
                const json = await res.json()
                if (json.success === false) {
                    setLoading(false)
                }
                else {
                    setproduits(json)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        })()
    }, []) 

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,  // Enable autoplay
      autoplaySpeed: 1500,
        
    
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    
      return (
        < section >
            <div
                className="mx-auto  p-6 bg-white"
            >

                 <div className="post_container !mt-4">
                    {
                        loading ?
                            <SkletonLoading />
                            :
                            <div className="slider_container">
                                <Slider {...settings} className='z-10 relative'>
                                    {
                                        produits && produits.map(produit => <ProduitCard key={produit._id} produit={produit} />)
                                    }
                                </Slider>
                            </div>
                    }

                </div>
                
            </div>
        </section>
      );
    }
 export default CarrouselP