import React from 'react'
import TopProduitVendu from './stats/TopProduitVendu'
import ProduitVisite from './stats/ProduitVisite'

function StatsAdmin() {
  return (
    <div className='bg-gray-100 pb-32'>    
      <div className='lg:grid lg:grid-cols-2 lg:gap-15  '>
        <div className='col-span-1 px-10 mt-10 lg:mt-0'>
          <ProduitVisite/>
        </div>
      </div>
      <div className='mt-10 px-10'>
        <TopProduitVendu/>
      </div>

  </div>

    
  )
}

export default StatsAdmin