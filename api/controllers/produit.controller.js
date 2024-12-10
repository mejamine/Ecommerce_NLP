import Produit from "../models/produit.models.js";
import { throwError } from "../utils/error.js";


//===== Create Produit =====//
export const createProduit = async (req, res, next) => {
  try {
    const produit = await Produit.create(req.body);
    res.status(201).json(produit);
  } catch (error) {
    next(error);
  }
};



//======handle post Delete========//
export const deleteProduit = async (req, res, next) => {
  const isProduitExist = await Produit.findById(req.params.id);
  if (!isProduitExist) return next(throwError(404, "Produit not found"));
  try {
    await Produit.findByIdAndDelete(req.params.id);

    res.status(200).json("Produit delete successfully");
  } catch (error) {
    next(error);
  }
};



//===== Handle Produit Update ======//
export const updateProduit = async (req, res, next) => {
  const isProduitExist = await Produit.findById(req.params.id);
  if (!isProduitExist) return next(throwError(404, "Produit not found"));
  try {
    const updateProduit = await Produit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateProduit);
  } catch (error) {
    next(error);
  }
};

//===== Get A Single Produit ====//
export const singleProduit = async (req, res, next) => {
  try {
    const produit = await Produit.findById(req.params.id);
    res.status(200).json(produit);
  } catch (error) {
    next(error);
  }
};




//==== Get All Produits ====//
export const getAllProduits = async (req, res, next) => {
  try {
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    next(error);
  }
};

//===== Get Last Produit Added ====//
export const getLastProduit = async (req, res, next) => {
  try {
    const lastProduit = await Produit.findOne().sort({ createdAt: -1 });
    res.status(200).json(lastProduit);
  } catch (error) {
    next(error);
  }
};



// //get posts number
// export const getNumberPosts = async (req, res) => {
//   try {
//     const count = await Listing.countDocuments();
//     res.json({ count });
//   } catch (error) {
//     console.error('Erreur lors de la récupération du nombre de posts:', error);
//     res.status(500).json({ error: 'Erreur serveur' });
//   }
// }; 


//get posts parking 

// export const getNumberParkingPosts = async (req, res) => {
//   try {
//     const count = await Listing.countDocuments({ parking: true });
//     res.json({ count });
//   } catch (error) {
//     console.error('Erreur lors de la récupération du nombre de projets avec parking:', error);
//     res.status(500).json({ error: 'Erreur serveur' });
//   }
// };