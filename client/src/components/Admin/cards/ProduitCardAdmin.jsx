import React from 'react';
import { FaBath, FaCamera, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ProduitCardAdmin({produitInfo}) {
    if (!produitInfo || !produitInfo.produit) {
        return <div>Project data is missing</div>; 
      }
      const {
        description,
        imgUrl,
        prix,
        title,
        _id,
      } = produitInfo.produit;
      const navigate = useNavigate();

  return (
    <div className="rounded-md bg-white shadow-lg hover:shadow-xl">
      <div
        onClick={() => navigate(`/produit/${_id}`)}
        className="relative flex items-end overflow-hidden rounded-md h-[200px] cursor-pointer"
      >
        <img
          className="hover:scale-105 object-cover h-full w-full duration-300"
          src={imgUrl[0]}
          alt="wallpaper"
        />
        <div className="absolute bottom-3 right-3 inline-flex items-center rounded-sm px-2 py-1">
          <span className="text-xs text-white uppercase font-heading flex items-center">
            <FaCamera className="mr-1" />
            {imgUrl.length}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div onClick={() => navigate(`/produit/${_id}`)} className="cursor-pointer">
          <h2 className="text-gray-900 font-heading text-xl truncate cursor-pointer">{title}</h2>
          <p className="mt-1 text-sm text-gray-900 font-content font-medium truncate">{description}</p>
          <p className="mt-1 text-sm text-gray-900 font-content font-medium truncate">{prix} DT</p>

          <p className="mt-2 text-sm text-gray-900 font-content font-bold truncate">
          </p>
        </div>
        <div className="mt-4 flex items-end justify-between space-x-1">
          <button
            onClick={() => navigate(`/update_produit/${_id}`)}
            className="bg-gray-400 rounded-lg py-2 px-7 font-heading text-white hover:opacity-95 text-sm"
          >
            Modifier
          </button>
          <button
            onClick={() => produitInfo.handleProduitDelete(_id)}
            className="bg-red-700 py-2 px-5 rounded-lg font-heading text-white hover:opacity-95 text-sm z-10"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
