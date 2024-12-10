import React from 'react'
import logo from "../img/IMG.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer className="bg-customC   pb-3 font-sans tracking-wide">


      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className=" lg:items-center">
          <a href="#" className=" flex justify-center items-center lg:block">
            <img className=' w-[50vw] md:h-[10vw] md:w-[10vw] sm:ml-24 mt-10 rounded-3xl' src={logo} alt="logo" />
          </a>
          <div className="lg:ml-32   text-center lg:text-left">
            <a href="" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" className="text-gray-800 mt-10 hover:text-gray-600" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" className="text-gray-800 ml-6 hover:text-gray-600" />
            </a>
          </div>
        </div>




        <div>
          <ul className="space-y-4 lg:pl-32 pt-24 text-center lg:text-left">
            <li>
              <a href="/" className="text-gray-900 hover:text-black text-base font-bold">ACCUEIL</a>
            </li>
            <li>
              <a href="/store" className="text-gray-900 hover:text-black text-base font-bold">STORE</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-900 hover:text-black text-base font-bold">CONTACT</a>
            </li>
          </ul>
        </div>

        <div className='lg:pl-24 pt-16 text-center lg:text-left'>
          <h4 className="text-lg  mb-6 text-gray-600 font-bold">CONTACT</h4>
          <ul className="space-y-4">
            <li>
              <a href="" className="text-gray-600 hover:text-gray-900 text-sm font-bold">email.amail@email.com</a>
            </li>
            <li>
              <a href="" className="text-gray-600 hover:text-gray-900 text-sm font-bold">+111 11 111 111</a>
            </li>
            <li>
              <a href="" className="text-gray-600 hover:text-gray-900 text-sm font-bold">your location</a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-gray-900 text-center text-sm ">© 2024 Copyright </p>
    </footer>
  );
}

export default Footer
