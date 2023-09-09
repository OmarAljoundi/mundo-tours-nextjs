"use client";

import Image from "next/image";
import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <Image
            src={"/imgs/mundo-logo.png"}
            width={200}
            height={0}
            alt="موندو تورز"
          />
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 font-primary">
          موندو للسياحة هي واحدة من أكبر الشركات المتخصصة بالسفر و السياحية فى
          سلطنة عمان التي تعمل تحت شعار (
          <span className="font-bold text-primary">انت اختار</span> ) نقدم مئات
          البرامج أسبوعيا و يوميا لاكثر من 50 دولة حول العالم مع تقديم خيار
          الاختيار للمسافر لمدة و تاريخ و طريقة الرحلة.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/"
            >
              About
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/"
            >
              Careers
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/"
            >
              History
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/"
            >
              Services
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/"
            >
              Projects
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/"
            >
              Blog
            </a>
          </li>
        </ul>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <div className="contact-info flex gap-4 ">
            <AiOutlineWhatsApp className="text-white text-2xl" />
            <AiOutlineInstagram className="text-white text-2xl" />
            <HiOutlineMapPin className="text-white text-2xl" />
          </div>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
