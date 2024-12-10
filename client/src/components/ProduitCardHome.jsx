import React from 'react';
import { useNavigate } from 'react-router-dom';

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

const ProduitCardHome = ({ service }) => {
  const maxLength = 70;
  const navigate = useNavigate();
  const { title, description, imgUrl, _id } = service;

  return (
    <div className="listing_card h-96 bg-white shadow-lg shadow-black/10 w-full hover:shadow-lg group sm:mr-auto sm:ml-0 mx-auto rounded-xl">
      <div className="card-container h-96">
        <div
          className="image_container relative overflow-hidden cursor-pointer"
          onClick={() => navigate(`/produit/${_id}`)}
        >
          <img
            className='max-h-[250px] min-h-[250px] w-full object-cover rounded-t-lg hover:scale-105 duration-300'
            src={imgUrl[0]} alt="property image"
          />
        </div>
        <div className="card_body duration-500 border-brand-blue/20">
          <div
            className="content-container p-3 pb-0 cursor-pointer"
            onClick={() => navigate(`/produit/${_id}`)}
          >
            <h2 className="text-lg font-heading truncate uppercase duration-300 group-hover:text-red-500">{title}</h2>
            <p>{truncateText(description, maxLength)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProduitCardHome;
