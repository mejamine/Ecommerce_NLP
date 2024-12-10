import React, { useState } from 'react';
import Footer from '../components/Footer';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteArray } from '../redux/user/userSlice';
import { clearSavedProduit } from '../redux/saveProduit/saveProduitSlice';



function FormulaireCommande() {
  const dispatch = useDispatch();
  const myArray = useSelector(state => state.user.myArray);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email:'',
    nom: '',
    prenom: '',
    phone: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length < 8) {
      alert("Le numéro de téléphone doit contenir au moins 8 caractères.");
      return;
    }

    const data = {

      listeP: myArray,
      ...formData,
    };

    try {
      const response = await fetch('http://localhost:4000/ecommerce/commandes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(deleteArray());
        dispatch(clearSavedProduit());

        

        navigate(`/Ticket/${formData.email}`);
      } else {
        console.error('Erreur lors de la création de la commande:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
    }
  };

  return (
    <div>
       <div className='w-full h-32 bg-transparent'></div>
      <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Formulaire de Commande</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black  font-medium mb-2" htmlFor="nom">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              required
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black bg-customC"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium mb-2" htmlFor="prenom">
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              required
              value={formData.prenom}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black bg-customC"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium mb-2" htmlFor="nom">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black bg-customC"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium mb-2" htmlFor="phone">
              Téléphone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black bg-customC"
              minLength={8}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium mb-2" htmlFor="location">
              Localisation
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black bg-customC"
            />
          </div>


          <button
            type="submit"
            className="w-full text-black bg-customC py-2 px-4 rounded-lg hover:customC/30 transition duration-200"
          >
            Valider Commande
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default FormulaireCommande;
