import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function TicketsAdmin() {
  const { currentAdmin } = useSelector(state => state.admin)
  const [commandes, setCommandes] = useState([]);
  const handleMaterialUpdates = async (commande) => {
    try {
      for (const cmd of commande.listeP) {
        try {
          const res = await fetch(`http://localhost:4000/ecommerce/produits/${cmd.id}`);
          const json = await res.json();
  
          if (json.success === false) {
            toast.error(json.message, {
              autoClose: 2000,
            });
            return; // Arrête le traitement si une erreur est rencontrée
          }
  
  
          // Vérifie si la quantité demandée est supérieure à la quantité en stock
          if (cmd.quantity > json.quantite) {
            alert(`La quantité demandée pour un produit de cet commande dépasse le stock disponible.`, {
              autoClose: 2000,
            });
            return; // Arrête le traitement si la quantité dépasse le stock
          }
  
          // Mise à jour du produit
          const updateRes = await fetch(`http://localhost:4000/ecommerce/produits/${cmd.id}`, {
            method: 'PUT',
            headers: {
              "Content-Type": 'application/json',
            },
            body: JSON.stringify({
              ...json,
              ['vendue']: json.vendue + cmd.quantity,
              ['quantite']: json.quantite - cmd.quantity,
              userRef: currentAdmin._id,
            }),
          });
  
          const serverRes = await updateRes.json();
  
          if (serverRes.success === false) {
            toast.error(serverRes.message, {
              autoClose: 2000,
            });
            return; // Arrête le traitement si une erreur est rencontrée lors de la mise à jour
          }
        } catch (error) {
          toast.error(error.message, {
            autoClose: 2000,
          });
          return; // Arrête le traitement en cas d'erreur
        }
      }
  
      // Suppression de la commande seulement si tout s'est bien passé
      handleCommandeDelete(commande._id);
    } catch (error) {
      console.error("Error processing materials:", error);
    }
  };
  
  
  const generatePDF = (commande) => {
    const doc = new jsPDF();

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
        `${produit.name || 'N/A'} - Quantité : ${produit.quantity || 'N/A'} - Prix par Unité : ${produit.price || 'N/A'} €`,
        30,
        yPosition
      );
      yPosition += 10;
    });

    // Add total price
    const totalPrice = commande.listeP.reduce(
      (total, produit) => total + (produit.price * (produit.quantity || 0)), 0
    );
    doc.text(`Prix Total : ${totalPrice} €`, 20, yPosition + 10);

    // Save the PDF
    doc.save("commande.pdf");
  };

  const handleCommandeDelete = async (commandeId) => {
    if (!commandeId) {
      console.error('Commande ID is undefined');
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:4000/ecommerce/commandes/${commandeId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
  
      if (data.success === false) {
        toast.error(data.message, {
          autoClose: 2000,
        });
      } else {
        setCommandes(prevCommandes => prevCommandes.filter(commande => commande._id !== commandeId));
        toast.success('Commande supprimée avec succès', {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await fetch(`http://localhost:4000/ecommerce/commandes`);
        if (response.ok) {
          const data = await response.json();
          // Trier les commandes par date de création (du plus récent au plus ancien)
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
  }, []);

  if (commandes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
      <div className='py-20'>
        <p className='bg-white text-center text-sm sm:text-2xl font-heading font-bold flex flex-col items-center justify-center max-w-3xl mx-auto py-10 text-black px-5 rounded shadow-md'>
            <span>Vous n'avez pas de ticket de Produit </span>
        </p>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {commandes.map((commande, index) => {
          // Calculer le prix total de la commande
          const totalPrice = commande.listeP.reduce((total, produit) => {
            return total + (produit.price * (produit.quantity || 0));
          }, 0);

          return (
            <div key={index} className="max-w-xl mx-auto bg-white p-4 mb-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Détails de la Commande</h2>
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
                      <strong>Prix par Unité :</strong> {produit.price || 'N/A'} €
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <strong>Prix Total :</strong> {totalPrice} €
              </div>
              <div className="text-center ">
                  <button 
                    onClick={() => handleCommandeDelete(commande._id)}
                    className="md:w-full xl:w-auto py-4 mr-6 px-7 bg-red-500 text-white font-heading rounded-md mt-1 hover:opacity-90 text-sm"
                  >
                    Supprimer Commande
                  </button>
                  <button onClick={()=>generatePDF(commande)} 
                   className="md:w-full xl:w-auto py-4 mr-6 px-7 bg-blue-500 text-white font-heading rounded-md mt-1 hover:opacity-90 text-sm"
                    >Generate Ticket</button>
                  <button onClick={()=>handleMaterialUpdates(commande)} 
                   className="md:w-full xl:w-auto py-4 mr-6 px-7 bg-green-500 text-white font-heading rounded-md mt-1 hover:opacity-90 text-sm"
                    >vendue</button>

                </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default TicketsAdmin;
