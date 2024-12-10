import React,{useEffect,useState} from "react";
import ContactHeader from '../components/ContactHeader'
import Footer from '../components/Footer'

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ContactHeader/>
      <Footer/> 
    </div>
  )
}
