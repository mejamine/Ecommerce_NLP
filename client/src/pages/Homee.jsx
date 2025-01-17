import Card1 from "../components/Card1";
import Footer from "../components/Footer";
import HomeStore from "../components/HomeStore";
import React,{useEffect} from "react";
import Card from "../components/Card";
import { NewProduct } from "../components/NewProduct";
import BlockService from "../components/BlockService";




function Homee() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="App">
      <a href="/chat" className="fixed z-50 bottom-2 right-2 p-5 rounded-xl bg-black text-white">Chat</a>
      <div>
        <Card/>
        <NewProduct/>
        <Card1/>
         <HomeStore/>
         <BlockService/>
        <Footer/>
       </div>
    </div>
  );
}

export default Homee;
