import React, { useEffect, useRef, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch } from 'react-icons/fa';
import ProduitCard from '../components/ProduitCard';
import Footer from '../components/Footer';
import { LuSearchX } from "react-icons/lu";



const Store = () =>{
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [searchQuery, setSearchQuery] = useState("");




    

      const filteredProduits = produits.filter(produit =>
        produit.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
      
    

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
    }, []);

    

    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }, [produits]);

    return (
        <>
        <div className='h-24 w-full bg-gray-200'></div>
            <section className='pt-32' >                
                <div ref={scrollRef}>
                <div className='grid  md:grid-cols-2 lg:grid-cols-3 '>
                        <div className=' text-xl col-span-1 flex items-center text-center justify-center pb-4 md:text-5xl font-bold '>
                             NOTRE STORE
                        </div>
                        <div className="flex items-center gap-2 col-span-1 justify-center pr-3">
                                {/* Search bar */}
                                <input
                                type="text"
                                placeholder="Search by title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="mb-4 p-2 w-[30vw] md:w-[50vw] border rounded pt-2 bg-customC text-black"
                                />
                        </div>
                    </div>
                

                    <div className="">
                        <div id="Produit" className="produit_container  pb-10 pt-2">
                            {
                                loading
                                    ?
                                    <div className="loading_container mt-40 flex items-center justify-center flex-col">
                                        <FaSearch className='font-xl text-customC font-bold text-xl text-center' />
                                        <p className='font-heading text-lg text-center text-customC '>Searching...</p>
                                    </div>
                                    :

                                    <div>
                                        <div className='text-center text-2xl pb-5'>NOS PRODUITS</div>
                                        {
                                            filteredProduits.length !== 0 ?
                                                <>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-5 gap-y-8">
                                                        {
                                                           paginate(filteredProduits && filteredProduits.map(produit => <ProduitCard key={produit._id} produit={produit} />)) 
                                                        }
                                                    </div>
                                                    <div className="pageination_part mt-8 md:mt-14 w-full flex items-center justify-center">
                                                        <div className="join">


                                                            {/* prev Btn  */}
                                                            <button
                      className="join-item btn bg-customC text-black hover:bg-customC/30
                                                    disabled:bg-[#d5d5d5] disabled:text-[#a0a0a0]
                                                    "
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <FaAngleDoubleLeft />
                    </button>


                    <button className="join-item btn bg-customC  cursor-default text-black hover:bg-gray-200">
                      Page {currentPage} /{" "}
                      {produits.length % 8 == 0
                        ? Math.floor(produits.length / 8)
                        : Math.floor(produits.length / 8) + 1}
                    </button>
                    <button
                      className="join-item btn bg-customC text-black hover:bg-customC/30 
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
        </>
     :
        <div className=" mt-40 flex items-center justify-center flex-col">
            <LuSearchX className='font-3xl text-black font-bold text-xl text-center' />
            <p className='font-heading text-lg text-center text-black '>Sorry, Poduct not found</p>
         </div>

    }
    </div>
    }
    </div>




                    </div>
                </div>
            </section>
            <>
                <Footer />
            </>
        </>
    )
};
export default Store