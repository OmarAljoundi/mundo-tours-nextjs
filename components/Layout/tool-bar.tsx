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
              <a
                href="https://api.whatsapp.com/send/?phone=%2B96895929251&text&type=phone_number&app_absent=0"
                target="_blank"
              >
                <AiOutlineWhatsApp className="text-white text-2xl" />
              </a>
              <a
                href="https://www.google.com/maps/place/Mundo+Tours+%D9%85%D9%88%D9%86%D8%AF%D9%88+%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9%E2%80%AD/@23.6012323,58.3711332,16z/data=!4m6!3m5!1s0x3e8e01dc526316a5:0xe8acf9b4eea6c8ce!8m2!3d23.6012665!4d58.3708565!16s%2Fg%2F11fnw0jpzp?entry=ttu"
                target="_blank"
              >
                <HiOutlineMapPin className="text-white text-2xl" />
              </a>
              <a href="https://www.instagram.com/Mundooman/" target="_blank">
                <AiOutlineInstagram className="text-white text-2xl" />
              </a>
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
