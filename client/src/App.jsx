import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
//import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import Homee from './pages/Homee'
import Contact from './pages/Contact'
import NavbarComp from './components/NavbarComp'
import ProduitPage from './pages/ProduitPage'
import UpdateProduit from './pages/UpdateProduit'
import CreateProduit from './pages/CreateProduit'
import Store from './pages/Store'
import Panier from './pages/Panier'
import FormulaireCommande from './pages/FormulaireCommande'
import Ticket from './pages/Ticket'
import Admin from './pages/Admin'
import ProduitsAdmin from './components/Admin/ProduitsAdmin'
import ProfilInfoAdmin from './components/Admin/ProfilInfoAdmin'
import TicketsAdmin from './components/Admin/TicketsAdmin'
import StatsAdmin from './components/Admin/StatsAdmin'
function App() {
  return (
    <>

      <BrowserRouter>
        <NavbarComp />
        {/* <Theme/> */}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Homee />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/store" element={<Store />} />
          <Route path='/produit/:id' element={<ProduitPage />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/Formulaire" element={<FormulaireCommande />} />
          <Route path="/Ticket/:email" element={<Ticket />} />





          {/* /---------Private Routes-----------/ */}
          <Route element={<PrivateRoute />}>

            <Route path="/create_produit" element={<CreateProduit />} />
            <Route path="/update_produit/:id" element={<UpdateProduit />} />

            <Route path="/admin" element={<Admin/>}>
                <Route path="profile" element={<ProfilInfoAdmin/>}/>
                <Route path="produits"element={<ProduitsAdmin/>}/>
                <Route path="ticketsP" element={<TicketsAdmin/>}/>
                <Route index element={<StatsAdmin/>}/>
            </Route>






          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
