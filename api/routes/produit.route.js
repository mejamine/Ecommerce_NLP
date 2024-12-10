
import express from "express";
import { verifyToken, verifyAdmin } from "../utils/varifyUser.js";
import {
  createProduit,
  deleteProduit,
  updateProduit,
  singleProduit,
  getAllProduits,
  getLastProduit
} from "../controllers/produit.controller.js";

const router = express.Router();


router.post("/",  createProduit); // Seuls les administrateurs peuvent créer des produits
router.get("/last", getLastProduit);
router.delete("/:id",  deleteProduit); // Seuls les administrateurs peuvent supprimer des produits
router.put("/:id",  updateProduit); // Seuls les administrateurs peuvent mettre à jour des produits
router.get("/:id",  singleProduit); // Tout utilisateur connecté peut voir un produit
router.get("/",  getAllProduits); // Tout utilisateur connecté peut voir tous les produits


export default router;

