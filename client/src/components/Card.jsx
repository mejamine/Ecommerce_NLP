import React from 'react';
import Cover from "../img/c.jpg";
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'importer useNavigate

const Card = () => {
  const navigate = useNavigate(); // Initialiser useNavigate pour la navigation

  return (
    <div className="relative w-full h-[50vw]">
      <img
        src={Cover}
        className="w-full h-full object-cover object-center opacity-60"
        alt="Profile"
      />

      <div className='absolute inset-0 mt-[300px] text-black text-7xl ml-64 font-semibold font-lora italic items-center justify-center'>
        <h2>brand Name</h2>
        <h2>  Your Brand Slogan</h2>
      </div>
      <div className="absolute inset-0 mt-[500px] ml-64 items-center justify-center">
        <button
          onClick={() => navigate('/store')}
          className="py-6 px-8 bg-black text-white font-roboto rounded-md hover:opacity-50 text-sm "
        >
          OUVRIR STORE
        </button>
      </div>
    </div>
  );
};

export default Card;
