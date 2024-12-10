import React from 'react'
import umbrella from '../img/umbrella.png'
import recycle from '../img/recycle.png'
import pay from '../img/payment-method.png'

const BlockService = () => {
  return (
    <div className='grid grid-cols-3 h-[300px] items-center justify-center'>
        <div className='items-center justify-center flex flex-col'>
        <img src={umbrella} className='h-[80px] w-[80px]' alt="" />
        <h2 className='pt-6 text-2xl font-roboto font-light'>Service Client</h2>
        </div>
        <div className='items-center justify-center flex flex-col'>
        <img src={recycle}  className='h-[80px] w-[80px]' alt="" />
        <h2 className='pt-6 text-2xl font-roboto font-light'>Livraison & retours Gratuits</h2>
        </div>
        <div className='items-center justify-center flex flex-col'>
        <img src={pay}  className='h-[80px] w-[80px] ' alt="" />
        <h2 className='pt-6 text-2xl font-roboto font-light'>Paiment aprés Livraison</h2>
        </div>

    </div>
  )
}

export default BlockService