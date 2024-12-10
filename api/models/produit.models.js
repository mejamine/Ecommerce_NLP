import mongoose from "mongoose";

const produitSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    quantite: {
      required: true,
      type: Number,
    },
    prix: {
      required: true,
      type: Number,
    },
    discountPrix: {
      type: Number,
    },
    type: {
      type: String,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    vendue:{
      type:Number,
      required:true,
      default:0
    },
    imgUrl: {
      type: Array,
      required: true,
    },
    visite:{
      required:true,
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

const Produit = mongoose.model("Produit", produitSchema);

export default Produit;
