import express from "express";
import { verifyToken, verifyAdmin } from "../utils/varifyUser.js";
import { 
    createCommande,
    deleteCommande,
    updateCommande,
    singleCommande,
    getAllCommandes,
    getCommandesByUserEmail,

 } from "../controllers/commande.controller.js";

const router = express.Router();


router.post("/", createCommande); // Seuls les administrateurs peuvent créer des commandes
router.delete("/:id",  deleteCommande); // Seuls les administrateurs peuvent supprimer des commandes
router.put("/:id",  updateCommande); // Seuls les administrateurs peuvent mettre à jour des commandes
router.get("/:id",  singleCommande); // Tout utilisateur connecté peut voir une commande
router.get("/",  getAllCommandes); // Tout utilisateur connecté peut voir tous les commandes
router.get("/user/:email", getCommandesByUserEmail); // Tout utilisateur connecté peut voir la liste de tous les commandes par utilisateur
export default router;
