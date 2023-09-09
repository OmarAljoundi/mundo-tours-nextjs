"use client";

import Link from "next/link";
import ImBeard from "../svg/ImBeard";
import ImLine from "../svg/ImLine";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";
import { Phone } from "lucide-react";

const Intro = () => {
  return (
    <div className="container pb-5 position-relative">
      <div className="flex flex-col-reverse mt-10 lg:grid grid-cols-1 lg:grid-cols-2 gap-x-4">
        <div className="relative font-secondary text-4xl px-4">
          <div className="absolute line">
            <ImLine />
          </div>

          <h1 className="text-primary/50" dir="rtl">
            أهلاً وسهلاً
          </h1>
          <h1 dir="rtl">موندو للسياحة والسفر</h1>
          <h1 dir="rtl" className=" pt-2 inline-block">
            تحت شعار <h1 className="inline-block"> إنت إختار </h1>
            نقدم لكم مجموعة واسعة من البرامج السياحية في أكثر من 30 دولة سياحية
            لتكتشفوها بالطريقة المناسبة لكم.
          </h1>
          <Separator className="my-4 " />
          <h1 className="pt-0" dir="rtl">
            سوق بروحك - رحلات جماعية - رحلات بحرية - سائق خاص - بالقطارات
          </h1>
          <h1 className="secondary-font pt-4" dir="rtl">
            <h1 className="secondary-font">إكتشف العالم</h1>
          </h1>
          <ul className="secondary-font" dir="rtl">
            <li dir="rtl" className="h3">
              بتنظيم برامجكم السياحية الخاصة وبمساعدة موظيفنا الخبراء وترتيب
              المناسب لكم من حجوزات متكاملة
            </li>
            <li dir="rtl" className="text-right h3">
              تأشيرات واستشارات سياحية
            </li>
          </ul>

          <div className="ms-auto text-right pt-5">
            <Link href="/tours-listing">
              <Button className="font-primary text-white">إكتشف العالم</Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute beard">
            <ImBeard />
          </div>
          <img
            src={"/imgs/eurpo.jpg"}
            className="w-full"
            alt=""
            loading="eager"
            fetchPriority="high"
          />
          <div className="about-one__call shadow-2xl">
            <div className="about-one__call-number left-20">
              <p className="font-primary mb-0" dir="rtl">
                احجز رحلتك الآن
              </p>
              <h5 className="font-english" dir="ltr">
                <a href="tel:+968 95 9292 51" style={{ color: "black" }}>
                  +968 95 9292 51
                </a>
              </h5>
            </div>
            <div className="about-one__call-icon">
              <Phone className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
