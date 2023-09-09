export default function VisaLayout() {
  return (
    <div className="container mt-8 lg:mt-4 font-primary">
      <div className="grid grid-cols-4 gap-10">
        <div className="col-span-4 lg:col-span-2">
          <div className="shadow-card">
            <div className="grid p-3 justify-items-start">
              <img src={"/imgs/eng.png"} />
              <h3 className="font-bold mt-3 text-3xl">تاشيرة بريطانيا</h3>
              <p className="font-normal mt-3 text-right">
                يتم التقديم اونلاين و لا يتطلب الحضور
              </p>
              <p className="font-normal mt-6 text-right">
                <span className="text-primary">مدة التاشيرة:{"  "}</span>على مدة
                السفر بالظبط
              </p>
              <h3 className="font-bold mt-3 text-right text-2xl" dir="rtl">
                المتطلبات الرئيسيــــة:
              </h3>
              <ul className="text-right list-disc ps-4" dir="rtl">
                <li className="font-normal">صورة من جواز السفر</li>
                <li className="font-normal">عنوان الإقامة في بريطانيا</li>
                <li className="font-normal">
                  تاريخ الوصول والمغادرة مع ارقام الرحلات{" "}
                </li>
              </ul>

              <h4 className="font-normal mt-3 text-xl">
                <span className="font-bold pe-3">سعر التأشيرة</span>
                <span className="english-font text-primary">25</span>
                <span className="text-primary"> ر.ع </span>
              </h4>

              <div className="rounded-xl w-full bg-secondary/50 py-1 px-3 mt-2">
                <p className="font-bold mt-3 text-right">
                  خصم خاص لعملاء موندو للسياحة عند حجز أي برنامج من موقعنا تكون
                  الرسوم <span className="text-primary"> مجانا </span>
                </p>
              </div>
            </div>
          </div>
          <div className="shadow-card mt-5">
            <div className={"grid p-3 justify-items-start"}>
              <img src={"/imgs/turkey.png"} />
              <h3 className="font-bold mt-3 text-3xl">تأشيرة تركيا </h3>
              <p className="font-normal mt-3 text-right">
                يتم التقديم اونلاين ولا يتطلب الحضور{" "}
              </p>
              <p className="font-normal mt-6 text-right">
                <span className="text-primary">مدة التاشيرة:</span>6 اشهر متعدد
              </p>
              <h3 className="font-bold mt-3 text-right text-2xl" dir="rtl">
                المتطلبات الرئيسيــــة:
              </h3>
              <ul className="text-right list-disc ps-4" dir="rtl">
                <li className="font-normal">صورة من جواز السفر</li>
              </ul>

              <h4 className="font-normal mt-3 text-xl">
                <span className="font-bold pe-3">سعر التأشيرة</span>
                <span className="english-font text-primary">30</span>
                <span className="text-primary"> ر.ع </span>
              </h4>

              <div className="rounded-xl w-full py-1 px-3 mt-2  bg-secondary/50">
                <p className="font-bold mt-3 text-right">
                  خصم خاص لعملاء موندو للسياحة عند حجز أي برنامج من موقعنا تكون
                  الرسوم
                  <span className="font-normal mt-3">
                    <span className="english-font text-primary">
                      {"     "}20 {"     "}
                    </span>
                    <span className="text-primary">ريال فقط</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 lg:col-span-2">
          <div className="shadow-card h-full">
            <div className="grid justify-items-start p-3">
              <img src={"/imgs/eur.png"} />
              <h3 className="font-bold mt-3 text-3xl">
                تأشيرة الشنجن الأوروبيـــة{" "}
              </h3>
              <p className="font-normal  mt-3 text-right">
                يتطلب الحضور في السفارة او مركز التاشيرات للبصمة
              </p>
              <p className="font-normal mt-6 text-right">
                <span className="text-primary">مدة التاشيرة:</span> يعتمد على
                السفارة و تكون متوسط سنه في معظم السفارات تحديد المدة يرجع الى
                السفارة
              </p>

              <h3 className="font-bold mt-3 text-right text-2xl" dir="rtl">
                المتطلبات الرئيسيــــة:
              </h3>
              <ul className="text-right list-disc ps-4" dir="rtl">
                <li className="font-normal"> الجواز الأصل</li>
                <li className="font-normal">صورتين شخصيات </li>
                <li className="font-normal">كشف حساب بنكي انجليزي</li>
                <li className="font-normal">
                  شهادة راتب من العمل (بعض السفارات لا تطلبها ){" "}
                </li>
              </ul>
              <div className="w-full mt-6">
                <h3
                  className="font-bold text-center mb-4 text-primary text-2xl"
                  dir="rtl"
                >
                  رسوم التاشيرة في قسمين
                </h3>
                <div className="grid">
                  <button className="bg-secondary/50 text-white py-2 rounded-lg">
                    القسم الأول
                  </button>
                  <ul className="list-disc ps-4">
                    <li className="font-bold text-right mt-2" dir="rtl">
                      رسوم المكتب: 35 ريال{" "}
                    </li>
                    <li className="font-bold text-right " dir="rtl">
                      رسوم حجز الموعد بالفيزا كارد{" "}
                    </li>
                    <li className="font-bold text-right" dir="rtl">
                      تامين السفر للسفارة{" "}
                    </li>
                    <li className="font-bold text-right " dir="rtl">
                      تعبئة الطلب ( الابلكاشن ){" "}
                    </li>
                    <li className="font-bold text-right " dir="rtl">
                      حجز الفندق و الطيران للسفارة{" "}
                    </li>
                  </ul>

                  <button className="bg-secondary/50 text-white py-2 rounded-lg mt-8">
                    القسم الثاني
                  </button>
                  <ul className=" list-disc ps-4">
                    <li className="font-bold text-right mt-2" dir="rtl">
                      رسوم السفارة: 40 ريال تقريبا
                    </li>
                    <li className="font-bold text-right " dir="rtl">
                      رسوم التأشيرة يتم دفعها عن طريق المسافر مباشرة عند التقديم{" "}
                    </li>
                  </ul>
                </div>
              </div>

              <h4 className="font-normal mt-3 text-xl">
                <span className="font-bold pe-3">سعر التأشيرة</span>
                <span className="english-font text-primary">75</span>
                <span className="text-primary"> ر.ع </span>
              </h4>
              <div className="rounded-xl w-full py-1 px-3 mt-2">
                <p className="font-bold mt-3 text-right bg-secondary/50 p-4 rounded-md">
                  خصم خاص لعملاء موندو للسياحة عند حجز أي برنامج من موقعنا تكون
                  رسوم القسم الأول <span className="text-primary"> مجانا </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="shadow-card">
            <div className="grid p-3 justify-items-start">
              <img src={"/imgs/usa.png"} />
              <h3 className="font-bold mt-3 text-3xl">تأشيرة امريكا</h3>
              <p className="font-normal mt-3 text-right">
                يتم التقديم اونلاين و يتطلب الحضور للمقابلة{" "}
              </p>
              <p className="font-normal mt-6 text-right">
                <span className="text-primary">مدة التاشيرة:{"  "}</span>
                عشر سنوات متعدد
              </p>
              <h3 className="font-bold mt-3 text-right text-2xl" dir="rtl">
                المتطلبات الرئيسيــــة:
              </h3>
              <ul className="text-right list-disc ps-4" dir="rtl">
                <li className="font-normal">الجواز الأصل</li>
                <li className="font-normal">صورتين شخصيات </li>
                <li className="font-normal">كشف حساب بنكي انجليزي</li>
                <li className="font-normal">شهادة راتب من العمل </li>
                <li className="font-normal">شهادة راتب من العمل </li>
              </ul>

              <h4 className="font-normal mt-3 text-xl">
                <span className="font-bold pe-3">سعر التأشيرة</span>
                <span className="english-font text-primary">120</span>
                <span className="text-primary"> ر.ع </span>
              </h4>

              <div className="rounded-xl w-full py-1 px-3 mt-2 bg-secondary/50">
                <p className="font-bold mt-3 text-right">
                  خصم خاص لعملاء موندو للسياحة عند حجز أي برنامج من موقعنا تكون
                  الرسوم <span className="text-primary english-font"> 60 </span>
                  <span className="text-primary"> ر.ع </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
