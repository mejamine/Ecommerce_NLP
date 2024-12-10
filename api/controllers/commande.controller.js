import Commande from "../models/commande.model.js";
import { throwError } from "../utils/error.js";


//===== Create Commande =====//
export const createCommande = async (req, res, next) => {
  try {
    const commande = await Commande.create(req.body);
    res.status(201).json(commande);
  } catch (error) {
    next(error);
  }
};



//======handle commande Delete========//
export const deleteCommande = async (req, res, next) => {
  const isCommandeExist = await Commande.findById(req.params.id);
  if (!isCommandeExist) return next(throwError(404, "Material not found"));
  try {
    await Commande.findByIdAndDelete(req.params.id);

    res.status(200).json("Commande delete successfully");
  } catch (error) {
    next(error);
  }
};



//===== Handle Commande Update ======//
export const updateCommande = async (req, res, next) => {
  const isCommandeExist = await Commande.findById(req.params.id);
  if (!isCommandeExist) return next(throwError(404, "Produit not found"));
  try {
    const updateCommande = await Commande.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateCommande);
  } catch (error) {
    next(error);
  }
};

//===== Get A Single Commande ====//
export const singleCommande = async (req, res, next) => {
  try {
    const commande = await Commande.findById(req.params.id);
    res.status(200).json(commande);
  } catch (error) {
    next(error);
  }
};




//==== Get All commandes ====//
export const getAllCommandes= async (req, res, next) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (error) {
    next(error);
  }
};

//===== Get Commandes by User ID =====//
export const getCommandesByUserEmail = async (req, res, next) => {
  try {
    const commandes = await Commande.find({ email: req.params.email });
    if (!commandes || commandes.length === 0) {
      return next(throwError(404, "No commandes found for this user"));
    }
    res.status(200).json(commandes);
  } catch (error) {
    next(error);
  }
};
