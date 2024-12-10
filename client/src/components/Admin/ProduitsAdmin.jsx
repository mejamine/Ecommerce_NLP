import React,{useEffect,useState} from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProduitCardAdmin from './cards/ProduitCardAdmin';
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Assurez-vous d'importer le style CSS




export default function ProduitsAdmin() {
  const navigate=useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProduits = async () => {
    try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/ecommerce/produits/`);
        const json = await res.json();
        if (json.success === false) {
            setLoading(false);
        } else {
            setProduits(json);
            setLoading(false);
        }
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
};
useEffect(() => {
  fetchProduits();
}, [produits]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handleProduitDelete = async(produitId)=>{
    try {
        const res = await fetch(`http://localhost:4000/ecommerce/produits/${produitId}`, {
            method: 'DELETE',
        })
        const data = await res.json();

        //===checking reqest success or not ===//
        if (data.success === false) {
            //===showing error in tostify====//
            toast.error(data.message, {
                autoClose: 2000,
            })
        }
        else {
            navigate('/admin/produits')
        }
    } catch (error) {
        toast.error(error.message, {
            autoClose: 2000,
        })
    }
}
  return (
    <div className='bg-[#f1f5f1] pb-16'>
      <div className="grid post_card grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6 md:h-full overflow-scroll pb-10  px-4 scrollbar-hide md:pt-5 ">
                    {/* ADD NEW Project BUTTON  */}
                    <div className="cursor-pointer rounded-md  bg-white  shadow-lg hover:shadow-xl">
                      <button
                        onClick={() => navigate("/create_produit")}
                        type="submit"
                        className=" px-5 bg-slate-300 font-heading rounded-xl shadow-lg text-black text-lg   hover:opacity-95 w-full h-full flex justify-center items-center flex-col py-10 sm:py-10"
                      >
                        <BsFillPlusSquareFill className="text-center md:mb-3 md:text-5xl text-black text-sm sm:text-xl rounded-xl" />
                        Créer Produit
                      </button>
                    </div>

                    {produits &&
                      paginate(
                        produits.map((produit) => (
                          <ProduitCardAdmin
                            key={produit._id}
                            produitInfo={{ produit, handleProduitDelete }}
                          />
                        ))
                      )}
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      className="join-item btn bg-black text-white  
                                                    disabled:bg-[#d5d5d5] disabled:text-[#a0a0a0]
                                                    "
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <FaAngleDoubleLeft />
                    </button>
                    <button className="join-item btn bg-black  cursor-default text-white">
                      Page {currentPage} /{" "}
                      {produits.length % 7 == 0
                        ? Math.floor(produits.length / 7)
                        : Math.floor(produits.length / 7) + 1}
                    </button>
                    <button
                      className="join-item btn bg-black text-white 
                                                    disabled:bg-[#d5d5d5] disabled:text-[#a0a0a0]
                                                    "
                      onClick={handleNextPage}
                      disabled={
                        currentPage ===
                        Math.ceil(produits.length / itemsPerPage)
                      }
                    >
                      <FaAngleDoubleRight />
                    </button>
                  </div>
    </div>
  )
}
