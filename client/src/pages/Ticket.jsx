import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { jsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';


// Composant Document PDF


function Ticket() {
  const {email} = useParams();
  const generatePDF = (commande) => {
    const doc = new jsPDF();
    console.log(commande);

    // Add title
    doc.setFontSize(24);
    doc.text("Détails de la Commande", 105, 20, null, null, 'center');

    // Add customer details
    doc.setFontSize(16);
    doc.text(`Nom : ${commande.nom || 'N/A'}`, 20, 40);
    doc.text(`Prénom : ${commande.prenom || 'N/A'}`, 20, 50);
    doc.text(`Téléphone : ${commande.phone || 'N/A'}`, 20, 60);
    doc.text(`Email : ${commande.email || 'N/A'}`, 20, 70);
    doc.text(`Localisation : ${commande.location || 'N/A'}`, 20, 80);

    // Add product list title
    doc.text("Liste des Produits :", 20, 90);

    // Add product details
    let yPosition = 100;
    commande.listeP.forEach((produit, index) => {
      doc.text(
        `${produit.name || 'N/A'} - Quantité : ${produit.quantity || 'N/A'} - Prix par Unité : ${produit.price || 'N/A'} DT`,
        30,
        yPosition
      );
      yPosition += 10;
    });

    // Add total price
    const totalPrice = commande.listeP.reduce(
      (total, produit) => total + (produit.price * (produit.quantity || 0)), 0
    );
    doc.text(`Prix Total : ${totalPrice} DT`, 20, yPosition + 10);

    // Save the PDF
    doc.save("commande.pdf");
  };
  const [commandes, setCommandes] = useState([]);
  const userId = useSelector(state => state.user.currentUser._id);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await fetch(`http://localhost:4000/ecommerce/commandes/user/${email}`);
        if (response.ok) {
          const data = await response.json();
          const sortedCommandes = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setCommandes(sortedCommandes);
        } else {
          console.error('Erreur lors de la récupération des commandes:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    };

    fetchCommandes();
  }, [userId]);

  if (commandes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className='py-20'>
          <p className='bg-white text-center text-sm sm:text-2xl font-heading font-bold flex flex-col items-center justify-center max-w-3xl mx-auto py-10 text-black px-5 rounded shadow-md'>
              <span>Vous n'avez pas de ticket de Produit </span>
          </p>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className='w-full h-32 bg-transparent'></div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {commandes.map((commande, index) => {
          const totalPrice = commande.listeP.reduce((total, produit) => total + (produit.price * (produit.quantity || 0)), 0);

          return (
            <div key={index} className="max-w-xl mx-auto bg-white p-4 mb-4 rounded-lg shadow-md ">
              <h2 className="text-2xl font-bold mb-3 text-center">Détails de la Demande</h2>
              <div className="mb-2">
                <strong>Nom :</strong> {commande.nom}
              </div>
              <div className="mb-2">
                <strong>Prénom :</strong> {commande.prenom}
              </div>
              <div className="mb-2">
                <strong>Téléphone :</strong> {commande.phone}
              </div>
              <div className="mb-2">
                <strong>Email :</strong> {commande.email}
              </div>
              <div className="mb-2">
                <strong>Localisation :</strong> {commande.location}
              </div>
              <div className="mb-2">
                <strong>Liste des Produits :</strong>
                <ul className="list-disc list-inside pl-4">
                  {Array.isArray(commande.listeP) && commande.listeP.map((produit, index) => (
                    <li key={index} className="mb-2">
                      <strong>Nom :</strong> {produit.name || 'N/A'} <br />
                      <strong>Quantité :</strong> {produit.quantity || 'N/A'} <br />
                      <strong>Prix par Unité :</strong> {produit.price || 'N/A'} DT
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <strong>Prix Total :</strong> {totalPrice} DT
              </div>
              <div className='mt-2 flex items-center justify-center'>
              <button onClick={()=>generatePDF(commande)} 
                   className="md:w-full xl:w-auto py-4 mr-6 px-7 bg-gray-600 text-white font-heading rounded-md  hover:opacity-90 text-sm"
                    >Generate Ticket</button>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Ticket;
