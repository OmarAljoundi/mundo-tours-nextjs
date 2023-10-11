import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";

const Share = () => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-8 pl-9 pr-3 py-3 ">
      <h1 className="text-xl font-bold font-primary mt-8">
        شارك البرنامج مع أصدقائك
      </h1>
      <ul className="flex gap-3 items-center ">
        <li>
          <Link
            href="#"
            className="link w-8 h-8 grid place-content-center bg-white  rounded-full hover:bg-secondary shadow-card group"
          >
            <AiOutlineWhatsApp className="lab text-2xl  group-hover:text-white" />
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="link w-8 h-8 grid place-content-center bg-white  rounded-full hover:bg-secondary shadow-card group"
          >
            <Facebook className="lab text-xl la-facebook-f group-hover:text-white" />
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="link w-8 h-8 grid place-content-center bg-white  rounded-full hover:bg-secondary  shadow-card group"
          >
            <Twitter className="lab text-xl la-twitter group-hover:text-white" />
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="link w-8 h-8 grid place-content-center bg-white  rounded-full hover:bg-secondary shadow-card group "
          >
            <Instagram className="lab text-xl la-instagram group-hover:text-white" />
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="link w-8 h-8 grid place-content-center bg-white group rounded-full hover:bg-secondary shadow-card "
          >
            <Linkedin className="lab text-base la-linkedin-in group-hover:text-white" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Share;
