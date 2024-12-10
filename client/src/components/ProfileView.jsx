import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import {FaTicketAlt} from 'react-icons/fa';


export default function ProfileView() {
    const [commandes, setCommandes] = useState([]);
    const [commandesM, setCommandesM] = useState([]);

    const { currentUser } = useSelector((state) => state.user);
    const userId = useSelector(state => state.user.currentUser._id);

    useEffect(() => {
        const loadCommandeP=async()=>{
            try {
                const response = await fetch(`http://localhost:4000/ecommerce/commandes/user/${userId}`);
                if (response.ok) {
                  const data = await response.json();
                  // Trier les commandes par date de création (du plus récent au plus ancien)
                  const sortedCommandes = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                  setCommandes(sortedCommandes);
                } else {
                  console.error('Erreur lors de la récupération des commandes:', response.statusText);
                }
              } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error);
              }
        }
        const loadCommandeM = async()=>{
            try {
                const response = await fetch(`http://localhost:4000/ecommerce/commandesm/user/${userId}`);
                if (response.ok) {
                  const data = await response.json();
                  setCommandesM(data);
                } else {
                  console.error('Erreur lors de la récupération des commandes:', response.statusText);
                }
              } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error);
              }
        }
        loadCommandeP();
        loadCommandeM();
    },[])

  return (
        <div className='rounded-lg bg-white shadow-md shadow-black text-center items-center justify-center mx-10 py-10 px-5 h-[400px]'>
            <img
                src={currentUser.avatar}
                className="h-20 w-20 mb-3 rounded-full border-[1px]  border-red-500 mx-auto"
                 alt="profile image"
            />
            <div className='flex items-center justify-center text-center text-lg my-2 font-bold'> Username : {currentUser.username}</div>
            <div className='flex items-center justify-center text-center text-lg my-2 font-bold'> Email : {currentUser.email}</div>
            {currentUser && currentUser.role==="admin"?
            <></>
            :
            <div>
                <div className='flex items-center justify-center text-center text-lg my-2 font-bold'><FaTicketAlt className='mx-5'/> commandes des produits : {commandes.length}</div>
                <div className='flex items-center justify-center text-center text-lg my-2 font-bold'><FaTicketAlt className='mx-5'/> Demandes de materiels : {commandesM.length}</div>
            </div>
            
        }
        </div>
  )
}
