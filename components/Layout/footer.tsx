'use client'

import Image from 'next/image'
import { AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai'
import { HiOutlineMapPin } from 'react-icons/hi2'

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <Image src={'/imgs/mundo-logo.png'} width={200} height={0} alt="موندو تورز" priority />
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 font-primary">
          موندو للسياحة هي واحدة من أكبر الشركات المتخصصة بالسفر و السياحية فى سلطنة عمان التي تعمل تحت شعار (
          <span className="font-bold text-primary">انت اختار</span> ) نقدم مئات البرامج أسبوعيا و يوميا لاكثر من 50 دولة حول العالم مع تقديم خيار
          الاختيار للمسافر لمدة و تاريخ و طريقة الرحلة.
        </p>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <div className="contact-info flex gap-4 ">
            <a href="https://api.whatsapp.com/send/?phone=%2B96895929251&text&type=phone_number&app_absent=0" target="_blank">
              <AiOutlineWhatsApp className="text-primary text-3xl" />
            </a>
            <a
              href="https://www.google.com/maps/place/Mundo+Tours+%D9%85%D9%88%D9%86%D8%AF%D9%88+%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9%E2%80%AD/@23.6012323,58.3711332,16z/data=!4m6!3m5!1s0x3e8e01dc526316a5:0xe8acf9b4eea6c8ce!8m2!3d23.6012665!4d58.3708565!16s%2Fg%2F11fnw0jpzp?entry=ttu"
              target="_blank"
            >
              <HiOutlineMapPin className="text-primary text-3xl" />
            </a>
            <a href="https://www.instagram.com/Mundooman/" target="_blank">
              <AiOutlineInstagram className="text-primary text-3xl" />
            </a>
          </div>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
