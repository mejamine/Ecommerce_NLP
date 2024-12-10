import { NavLink, Link } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { useState, useEffect } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import logo from "../img/IMG.jpg";
import Hamburger from '../img/hamburgerMenu.svg';
import Close from '../img/close.svg';
// Importer useSelector pour accéder à l'état du panier
import { useSelector } from "react-redux";

export default function NavbarComp() {
  const [toggle, setToggle] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // Récupérer les articles sauvegardés dans le panier
  const { saveProduits } = useSelector(state => state.savedProduit);

  // Calculer le nombre total d'articles dans le panier
  const cartItemCount = saveProduits.reduce((total, produit) => total + 1, 0);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > lastScrollPosition) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      setLastScrollPosition(currentScrollPosition);
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  const navlinkStyles = "text-black font-roboto font-bold sm:text-lg md:text-sm lg:text-lg md:mx-1 lg:mx-20 hover:text-gray-900 transform ";

  return (
    <Navbar fluid rounded className={`fixed top-0 left-0 right-0 rounded-lg justify-between bg-transparent w-full z-50 transition-transform duration-300 ${
      scrollPosition > 0 ? (isNavbarVisible ? 'translate-y-0' : '-translate-y-full') : 'mt-0'
    }`}>
      <div className={`flex flex-wrap md:flex-nowrap pt-4 pb-3 w-full items-center justify-between 
       ${scrollPosition > 0 ? "bg-gray-800/10" : "bg-transparent"}`}>
        <Navbar.Brand href="/">
          <img src={logo} className="mr-3 h-14 sm:h-18 ml-3 rounded-full" alt="nom" />
        </Navbar.Brand>
        <div className="flex sm:mr-6 items-center md:order-2">
          {/* Affichage du nombre d'articles au-dessus de l'icône panier */}
          <NavLink className={`relative ml-0 text-black font-bold text-sm sm:text-lg md:text-md lg:text-xl mx-2 sm:mx-3 md:mx-3 ${toggle ? 'hidden' : 'block'}`}>
            <Link to="/panier">
              <FaShoppingCart />
              {cartItemCount > 0 && (
                <span className="absolute -top-5 -left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </NavLink>

          <button
            className="block md:hidden mr-4"
            onClick={handleToggle}
          >
            <img src={toggle ? Close : Hamburger} alt="menu" className="h-6 w-6" />
          </button>
        </div>
        <Navbar.Collapse className={`w-full flex-col md:flex-row md:w-auto md:items-center ${toggle ? "block bg-gray-600/50 text-black" : "hidden md:block"}`}>
          <NavLink
            className={navlinkStyles} 
            to="/"
            end
          >
            ACCUEIL
          </NavLink>
          <NavLink
            className={navlinkStyles}
            to="/store"
          >
            STORE
          </NavLink>
          <NavLink
            className={navlinkStyles}
            to="/contact"
          >
            CONTACT
          </NavLink>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
