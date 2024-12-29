import React, { useEffect ,useState} from "react";
const Recommandation = () => {
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [produit1, setProduit1] = useState({});
    const [produit2, setProduit2] = useState({});

   

    const getProductRecommendations = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log(data)
            try {
                const res = await fetch(`http://localhost:4000/ecommerce/produits/${data[1].id}`);
                const json = await res.json();
                if (json.success === false) {
                    toast.error(json.message, {
                        autoClose: 2000,
                    });
                } else {
                    setProduit1(json);
                    console.log(produit1)
                    }
            } catch (error) {
                console.log(error);
            }
            try {
                const res = await fetch(`http://localhost:4000/ecommerce/produits/${data[0].id}`);
                const json = await res.json();
                if (json.success === false) {
                    toast.error(json.message, {
                        autoClose: 2000,
                    });
                } else {
                    setProduit2(json);
                    console.log(json);
                    }
            } catch (error) {
                console.log(error);
            }
            console.log(data)
            setRecommendedProducts(data);

        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    useEffect(() => {
        getProductRecommendations();
    }, []);
    return (
        <div className="pt-24 text-center">
            <h1 className="text-xl text-black font-bold">Recommended Products</h1>
            <div className="flex text-center justify-center items-center space-x-10 pt-20">
            {loading && <p>Loading...</p>}
                <div className="listing_card bg-white shadow-lg shadow-black/10  hover:shadow-brand-blue/20 rounded-lg   sm:w-[250px] hover:shadow-lg   ">
                            <div className="card-container">
                            <div
                                    className="image_container relative overflow-hidden cursor-pointer"
                                    onClick={() => navigate(`/produit/${produit1._id}`)}
                                >
                    <img
                        className='max-h-[200px] min-h-[200px] w-full object-cover rounded-t-sm hover:scale-105 duration-300'
                        src={produit1.imgUrl} alt="property image"
                    />
                    {/* Affichage de l'offre */}
                    {produit1.offer && (
                        <div className="absolute inline-flex top-2 right-0 bg-amber-400 py-1 px-2">
                            <p className='text-xs capitalize text-black font-heading'>Offre!</p>
                        </div>
                    )}
                    {/* Affichage de la disponibilité ou du stock */}
                    {produit1.quantite > 0 ? (
                        <div className="  absolute top-36 right-0 bg-green-500 py-1 px-2">
                            <p className='text-xs capitalize text-black font-heading'>Disponible</p>
                        </div>
                    ) : (
                        <div className="absolute top-36 right-0 bg-red-500 py-1 px-2">
                            <p className='text-xs capitalize text-black font-heading'>Out of stock !</p>
                        </div>
                    )}
                </div>
                
                
                
                
                                <div className="card_body group-hover:bg-brand-blue/5 duration-500  border-x border-b border-brand-blue/20 ">
                
                                    <div
                                        className="content-container p-3 pb-0 cursor-pointer"
                                        onClick={() => navigate(`/produit/${produit1._id}`)}
                                    >
                                        <h2 className="text-lg font-heading truncate uppercase duration-300  ">{produit1.title}</h2>
                                        <p
                                            className='font-content text-xs font-bold truncate flex items-center justify-start mt-1'>
                                            {produit1.description}
                                        </p>
                                        {/* <p>quantité : {quantite}</p> */}
                                    </div>
                
                
                
                                    {/* PRICE CONTAINER SECTION  */}
                                    <div className="listing_footer grid grid-cols-2 align-middle border-t  mt-5 p-3 pb-4">
                
                                        <div className="price_container truncate">
                                            {produit1.offer ?
                                                <p className='text-xl font-content text-black font-bold  flex items-center justify-start truncate'>{produit1.discountPrix} DT <s className='text-gray-400  text-xs mt-1 ml-1'>{produit1.prix} DT</s> </p>
                
                                                : <p className='text-xl font-content text-black font-bold  flex items-center justify-start truncate'>{produit1.prix} DT</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listing_card bg-white shadow-lg shadow-black/10  hover:shadow-brand-blue/20 rounded-lg  w-full sm:w-[250px] hover:shadow-lg   ">
                                    <div className="card-container">
                                    <div
                                            className="image_container relative overflow-hidden cursor-pointer"
                                            onClick={() => navigate(`/produit/${produit2._id}`)}
                                        >
                            <img
                                className='max-h-[200px] min-h-[200px] w-full object-cover rounded-t-sm hover:scale-105 duration-300'
                                src={produit2.imgUrl} alt="property image"
                            />
                            {/* Affichage de l'offre */}
                            {produit2.offer && (
                                <div className="absolute inline-flex top-2 right-0 bg-amber-400 py-1 px-2">
                                    <p className='text-xs capitalize text-black font-heading'>Offre!</p>
                                </div>
                            )}
                            {/* Affichage de la disponibilité ou du stock */}
                            {produit2.quantite > 0 ? (
                                <div className="  absolute top-36 right-0 bg-green-500 py-1 px-2">
                                    <p className='text-xs capitalize text-black font-heading'>Disponible</p>
                                </div>
                            ) : (
                                <div className="absolute top-36 right-0 bg-red-500 py-1 px-2">
                                    <p className='text-xs capitalize text-black font-heading'>Out of stock !</p>
                                </div>
                            )}
                        </div>
                        
                        
                        
                        
                                        <div className="card_body group-hover:bg-brand-blue/5 duration-500  border-x border-b border-brand-blue/20 ">
                        
                                            <div
                                                className="content-container p-3 pb-0 cursor-pointer"
                                                onClick={() => navigate(`/produit/${produit2._id}`)}
                                            >
                                                <h2 className="text-lg font-heading truncate uppercase duration-300  ">{produit2.title}</h2>
                                                <p
                                                    className='font-content text-xs font-bold truncate flex items-center justify-start mt-1'>
                                                    {produit2.description}
                                                </p>
                                                {/* <p>quantité : {quantite}</p> */}
                                            </div>
                        
                        
                        
                                            {/* PRICE CONTAINER SECTION  */}
                                            <div className="listing_footer grid grid-cols-2 align-middle border-t  mt-5 p-3 pb-4">
                        
                                                <div className="price_container truncate">
                                                    {produit2.offer ?
                                                        <p className='text-xl font-content text-black font-bold  flex items-center justify-start truncate'>{produit2.discountPrix} DT <s className='text-gray-400  text-xs mt-1 ml-1'>{produit2.prix} DT</s> </p>
                        
                                                        : <p className='text-xl font-content text-black font-bold  flex items-center justify-start truncate'>{produit2.prix} DT</p>
                                                    }
                                                </div>
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
            </div>
            <div className="pt-20">
                <a className=" bg-slate-500 p-5 rounded-lg text-center items-center" href="/chat2">
                    I'm Not Satisfied!
                </a>
            </div>
        </div>
    );
};

export default Recommandation;
