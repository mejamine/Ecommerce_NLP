import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 
import { useNavigate } from 'react-router-dom'


export const NewProduct = () => {
    const [produit, setProduit] = useState(null); // État pour stocker le produit
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const navigate = useNavigate();

    

    useEffect(() => {
        // Initialiser AOS
        AOS.init({
            duration: 1000, 
        });

        const fetchLastProduct = async () => {
            const response = await axios.get('http://localhost:4000/ecommerce/produits/last'); 
            setProduit(response.data); 
            setLoading(false); 
        };

        fetchLastProduct(); 
    }, []);

    if (loading) return <div>Chargement...</div>;

    return (
        <section className="relative overflow-hidden bg-gray-100" style={{ height: '850px' }}>
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{
                    backgroundImage: `url(${produit.imgUrl[0]})`,
                    backgroundAttachment: 'fixed', // Effet de parallaxe
                    height: '100%',
                    width: '100%',
                }}
            />

            <div className='lg:grid lg:grid-cols-2'>
            <div className='relative text-black text-7xl lg:ml-64 font-semibold flex items-center font-lora italic  justify-start p-8 col-span-1'                     data-aos="fade-right" 
            >
                    découvrez Notre Dernier Produit 
                </div>
            <div className="relative flex items-end justify-end p-8 h-full lg:mr-48 ">

                <div
                    className="bg-gray-200 p-8 rounded-lg  lg:max-w-md text-center w-full flex flex-col  items-center"
                    data-aos="fade-up" 
                >
                    <h2 className="text-4xl font-bold mb-4" data-aos="fade-right">
                        {produit.title}
                    </h2>
                    <h6 className="text-2xl mb-4 font-bold" data-aos="fade-left">
                        Prix : {produit.prix} DT
                    </h6>
                    {/* Afficher la première image du tableau imgUrl */}
                    {produit.imgUrl && produit.imgUrl.length > 0 && (
                        <img
                            src={produit.imgUrl[0]}
                            alt={produit.title}
                            className="rounded-lg mt-4 lg:w-[20vw] lg:h-[30vw] object-cover"
                            data-aos="zoom-in" 
                        />
                    )}
                    <a
    onClick={() => navigate(`/produit/${produit._id}`)} // Use produit._id to navigate correctly
    className="inline-block px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-300 mt-6 cursor-pointer"
                    >
                        VOIR DETAILS
                    </a>
                </div>
            </div>
            </div>
        </section>
    );
};
