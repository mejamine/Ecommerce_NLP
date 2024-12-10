import Slider from "react-slick";
import  { useEffect, useState } from 'react';
import SkletonLoading from './SkletonLoading';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProduitCard from "./ProduitCard";


const HomeService = () => {
    const [loading, setLoading] = useState(true)
    const [produits, setproduits] = useState([])
    const navigate = useNavigate()


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
    const handleButtonClick = () => {
      navigate('/store');  // Redirect to /Events route
    };
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
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
                className="mx-auto  p-10 bg-white"
            >
                <div className="content">
                    <h2 className='text-center text-3xl font-extrabold sm:text-5xl font-lora italic  text-black '>
                    NOTRE STORE
                    </h2>
                    <p className=' text-center font-content  font-medium text-sm sm:text-lg mt-10 mb-10 px-20 '>
                        write here an introduction to your store !
                    </p>                
                    </div>

                 <div className="post_container !mt-4">
                    {
                        loading ?
                            <SkletonLoading />
                            :
                            <div className="slider_container  px-auto">
                                <Slider {...settings} className='justify-between space-x-8'>
                                    {
                                        produits && produits.map(produit => <ProduitCard key={produit._id} produit={produit} />)
                                    }
                                </Slider>
                            </div>
                    }
                            <div className="text-center">
          <button 
            onClick={handleButtonClick}
            className="md:w-full xl:w-auto py-4 px-7 bg-black text-white font-heading rounded-md hover:opacity-90 text-sm"
          >
                    VOIR PLUS 
                    </button>
        </div>
                </div>
                
            </div>
        </section>
      );
    }
 export default HomeService