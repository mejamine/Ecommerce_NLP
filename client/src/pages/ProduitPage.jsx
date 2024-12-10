import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Footer from "../components/Footer";
import { handleSave } from '../redux/saveProduit/saveProduitSlice'
import CarrouselP from "../components/CarrouselP";


const ProduitPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { saveProduits } = useSelector(state => state.savedProduit)
    
    const { currentAdmin } = useSelector(state => state.admin)

    const dispatch = useDispatch()

    const handleProduitsSave = (id) => {
        if (currentUser) {
            const isSaved = saveProduits.some(saveProduit => saveProduit._id === id);
            if (isSaved) {
                toast.info("Ce produit est déjà dans votre panier", {
                    autoClose: 2000,
                });
            } else {
                // Add product to the cart if it's not already saved
                const produitToAdd = produit;
                dispatch(handleSave(produitToAdd));
                toast.success("Produit ajouté au panier avec succès", {
                    autoClose: 2000,
                });
            }
        } else {
            // Redirect to login if the user is not logged in
            navigate('/login');
        }
    };
    

    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const id = useParams();
    const [produit, setProduit] = useState({});
    const { title, description, quantite, prix, offer, discountPrix, type, imgUrl = [] } = produit; // Default imgUrl as empty array

    const [mainImage, setMainImage] = useState(""); // State to store the main image

    
    useEffect(() => {
        const loadProduit = async () => {
            try {
                const res = await fetch(`http://localhost:4000/ecommerce/produits/${id.id}`);
                const json = await res.json();
                if (json.success === false) {
                    toast.error(json.message, {
                        autoClose: 2000,
                    });
                } else {
                    setProduit(json);
                    setMainImage(json.imgUrl[0]);
                    console.log('Current User:', currentUser);
                    console.log('User Role:', currentUser?.role);
                    console.log(currentAdmin);

                     // Set the main image to the first image
                     if (currentAdmin === null) { 
                        try {
                            const res = await fetch(`http://localhost:4000/ecommerce/produits/${id.id}`, {
                                method: 'PUT',
                                headers: {
                                    "Content-Type": 'application/json'
                                },

                                body: JSON.stringify({
                                    ...json,
                                    ['visite']: json.visite+1,
                                    userRef: currentUser._id
                                })
                            });
                            const serverRes = await res.json();
                            if (serverRes.success === false) {
                                toast.error(serverRes.message, { autoClose: 2000 });
                            }   
                        } catch (error){
                            toast.error(error.message, { autoClose: 2000 });
    
                        }
                    }
                    
                    }
            } catch (error) {
                console.log(error);
            }
        };
        loadProduit();
    }, [id.id , currentUser,currentAdmin]);

    return (
        <div>
            <div className='h-[84px] w-full bg-white'></div>
            <div className="md:grid md:grid-cols-2 px-5 pt-10 mb-24">
                <div className="px-2 pr-10">
                    {/* Main Image */}
                    <img src={mainImage} className="h-[33vw] w-[29vw] ml-72 object-cover" alt="Main Product" />
                    {/* Thumbnails */}
                    <div className="flex mt-4 ml-72">
                        {imgUrl.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                className={`h-[70px] w-[70px] object-cover cursor-pointer mx-2 ${mainImage === img ? 'border-2 border-black' : ''}`}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setMainImage(img)} // Update the main image on click
                            />
                        ))}
                    </div>
                </div>

                <div className="px-2 text-black">
                    <div className=" mb-20 pt-0 h-[17vh]">
                        <h1 className="text-5xl mt-10">{title}</h1>
                        <p className="text-lg font-normal my-1 mt-16">{description}</p>
                        <p className="text-lg font-bold my-1 ">Prix : {prix} DT</p>
                        {offer && <p className="text-lg font-bold my-1 ">Offre : {discountPrix}<br /></p>}
                    </div>
                    
                        
                    
                    <div>
                    <button
    onClick={() => handleProduitsSave(produit._id)} 
    className=" w-auto py-4 px-7 bg-gray-500 text-white font-heading hover:opacity-90 text-sm my-24"
                            >
                                AJOUTER AU PANIER
                            </button>           
                    </div>
                </div>
            </div>
            <CarrouselP/>
            <Footer />
        </div>
    );
};

export default ProduitPage;
