import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { signoutFailed, signoutSuccess } from '../redux/admin/adminSlice';
import {  toast } from 'react-toastify';

export default function Admin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {pathname}=location;

    const handleLogOut = async () => {
        try {
            const res = await fetch('http://localhost:4000/ecommerce/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                useDispatch(signoutFailed(data.message))
                toast.error(data.message, {
                    autoClose: 2000,
                })
            }
            else {
                dispatch(signoutSuccess())
            }
        } catch (error) {
            dispatch(signoutFailed(error.message))
            toast.error(error.message, {
                autoClose: 2000,
            })
        }
    }

  return (
    <div className='h-auto   '>
        <div className='h-32 w-full bg-gray-100'></div>
        <div className=' lg:grid lg:grid-cols-12 h-screen -mt-32 '>
            <div className='col-span-2  pt-32 px-1 hidden lg:block bg-gray-100'>
                <button onClick={()=>navigate('/admin')} 
                    className={`  text-black relative h-14 mb-1 w-full text-center bg-customC rounded-lg text-xl items-center justify-center flex font-bold 
                        ${ pathname==="/admin" && "bg-customC/30 text-black" }
                        `}                     
                    >Home</button>
                <button onClick={()=>navigate('/admin/profile')} 
                    className={` text-black relative h-14 mb-1 w-full text-center bg-customC rounded-lg text-xl items-center justify-center flex font-bold 
                        ${pathname.includes('profile') && "bg-customC/30 text-black" }
                        `}
                      
                    >Profile</button>
                <button onClick={()=>navigate('/admin/produits')}
                    className={` text-black w-full h-14 mb-1 text-center bg-customC rounded-lg text-xl items-center justify-center flex font-bold 
                        ${pathname.includes('produits') && 'bg-customC/30 text-black'}
                        `}
                    >Produits</button>
                <button onClick={()=>navigate('/admin/ticketsP')}
                    className={`text-black w-full h-14 mb-1 text-center bg-customC rounded-lg text-xl items-center justify-center flex font-bold
                        ${pathname.includes('ticketsP') && 'bg-customC/30 text-black'}
                            `}
                    >Commande Produit</button>
                <button onClick={handleLogOut}
                    className={`text-white w-full h-14 mb-1 text-center bg-red-500/50 rounded-lg text-xl items-center justify-center flex font-bold
                            `}
                    ><Link to={"/login"}>Deconnexion</Link></button>
            </div>
            <div className='col-span-10 mt-32  '>
                {<Outlet/>}
            </div>
        </div>
      
      
    </div>
  )
}
