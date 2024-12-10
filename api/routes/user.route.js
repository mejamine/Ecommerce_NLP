
import express from "express";
import {
  deleteUser,
  updateUser,
  getUser,
  getAllUsers
} from "../controllers/user.controller.js";

const router = express.Router();

// Ces routes nécessitent seulement une vérification de token
router.get("/:id",  getUser);

// Ces routes nécessitent une vérification de token et d'administrateur
router.post("/update/:id",  updateUser);
router.delete("/delete/:id",  deleteUser);
router.get("/",  getAllUsers);

export default router;

