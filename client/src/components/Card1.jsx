import React from "react";
import logo from "../img/IMG.jpg"

export default function Card1() {
  return (
    <div className=" grid items-center justify-center" >
      <div className="  grid place-items-center  max-h-full  max-w-[100vw]  sm:pt-20 mx-auto sm:p-32 p-6 font-[sans-serif]">
        <div className="grid md:grid-cols-2 items-center gap-4  ">
          <div className="md:col-span-1">
            <div className="mb-12 sm:max-w-[50vw]">
              <h2 className="text-3xl font-extrabold sm:text-5xl font-lora italic  text-black">
              A PROPOS DE NOUS
              </h2>
              <p className=" pt-10 text-lg text-justify">the history of your brand ; name , date of start and values you added to your previous clients and partners so the new client knows for real that your brand is suitable for him. it's like a teaser to your brand and store so the new client explore your products and join your community!</p>
            </div>
          </div>
          <div className="text-center justify-center items-center">
            <img
              src={logo}
              className="grid place-items-center w-[20vw]  sm:ml-64 rounded-3xl mx-auto "
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
