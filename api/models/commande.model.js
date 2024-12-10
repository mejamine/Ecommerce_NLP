import mongoose from "mongoose";

const commandeSchema = new mongoose.Schema(
  {
    listeP: {
      required: true,
      type: Array,
    },
    nom: {
      required: true,
      type: String,
    },
    prenom: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: Number,
    },
    location: {
        required: true,
        type: String,
      },    
    email: {
        required: true,
        type: String,
      },
  },
  { timestamps: true }
);

const Commande = mongoose.model("Commande", commandeSchema);

export default Commande;
