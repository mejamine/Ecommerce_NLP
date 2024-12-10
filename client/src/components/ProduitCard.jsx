import React, { useEffect, useState } from 'react'
import { FaHeart   } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { handleSave, handleProduitRemove, clearSavedProduit } from '../redux/saveProduit/saveProduitSlice'

const ProduitCard = ({ produit }) => {
    const [heart, setHeart] = useState(false);
    const { saveProduits } = useSelector(state => state.savedProduit)
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { title, description,quantite,discountPrix, imgUrl, offer, prix, type, _id } = produit;

    const handleProduitsSave = (id) => {
        if (currentUser ) {
            const isSaved = saveProduits.some(saveProduit => saveProduit._id === id);
            if (isSaved) {
                const restProduits = saveProduits.filter(savedProduit => savedProduit._id !== id);
                dispatch(handleProduitRemove(restProduits));
                setHeart(false);
            } else {
                const produitToAdd = produit
                dispatch(handleSave(produitToAdd));
                setHeart(true);
            }
        }
        else {
            navigate('/login')
        }
    };



    useEffect(() => {
        if (currentUser) {
            const isSaved = saveProduits.some(saveProduit => saveProduit._id === _id);
            if (isSaved) {
                setHeart(true);
            } else {
                setHeart(false);
            }
        }
        else {
            dispatch(clearSavedProduit())
        }
    }, [])



    return (
        <div className="listing_card bg-white shadow-lg shadow-black/10  hover:shadow-brand-blue/20 rounded-lg  w-full sm:w-[250px] hover:shadow-lg   ">
            <div className="card-container">
            <div
                    className="image_container relative overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/produit/${_id}`)}
                >
    <img
        className='max-h-[200px] min-h-[200px] w-full object-cover rounded-t-sm hover:scale-105 duration-300'
        src={imgUrl[0]} alt="property image"
    />
    {/* Affichage de l'offre */}
    {offer && (
        <div className="absolute inline-flex top-2 right-0 bg-amber-400 py-1 px-2">
            <p className='text-xs capitalize text-black font-heading'>Offre!</p>
        </div>
    )}
    {/* Affichage de la disponibilité ou du stock */}
    {quantite > 0 ? (
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
                        onClick={() => navigate(`/produit/${_id}`)}
                    >
                        <h2 className="text-lg font-heading truncate uppercase duration-300  ">{title}</h2>
                        <p
                            className='font-content text-xs font-bold truncate flex items-center justify-start mt-1'>
                            {description}
                        </p>
                        {/* <p>quantité : {quantite}</p> */}
                    </div>



                    {/* PRICE CONTAINER SECTION  */}
                    <div className="listing_footer grid grid-cols-2 align-middle border-t  mt-5 p-3 pb-4">

                        <div className="price_container truncate">
                            {offer ?
                                <p className='text-xl font-content text-black font-bold  flex items-center justify-start truncate'>{discountPrix} DT <s className='text-gray-400  text-xs mt-1 ml-1'>{prix} DT</s> </p>

                                : <p className='text-xl font-content text-black font-bold  flex items-center justify-start truncate'>{prix} DT</p>
                            }
                        </div>
                        <div className="footer_btn flex items-center justify-end mr-1">
                            <button
                                onClick={() => handleProduitsSave(_id)}
                                className={`text-lg drop-shadow-sm duration-300  ${heart ? 'text-red-500' : "text-gray-300"} `}>
                                <FaHeart className='' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProduitCard