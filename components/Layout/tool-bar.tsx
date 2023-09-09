"use client";

import { Phone, AtSign } from "lucide-react";
import { AiOutlineWhatsApp, AiOutlineInstagram } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
const ToolBar = () => {
  return (
    <header className="bg-secondary py-3 px-4 lg:block hidden">
      <div className="container">
        <div className="flex justify-between">
          <div className="flex justify-between">
            <div className="contact-info flex gap-4 ">
              <AiOutlineWhatsApp className="text-white text-2xl" />
              <AiOutlineInstagram className="text-white text-2xl" />
              <HiOutlineMapPin className="text-white text-2xl" />
            </div>
          </div>
          <div className="contact-info flex gap-8 ">
            <div className="flex gap-3 items-center">
              <span className="text-white font-bold " dir="ltr">
                +968 95 9292 10
              </span>
              <Phone className="text-primary" />
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-white font-bold font-english">
                sales@mundo-tours.com
              </span>
              <AtSign className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ToolBar;
