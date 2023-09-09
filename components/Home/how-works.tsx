import { Search, CalendarCheck, Receipt } from "lucide-react";

const data = [
  {
    title: "أختار الرحلة",
    description:
      "اختار نوع الرحلة التي تناسب هواك , موندو تورز يضم اكثر من 5 انواع للبرامج",
    icon: CalendarCheck,
  },
  {
    title: "احجز الرحلة",
    description:
      "تواصل معنا لتحجز الرحلة الي تناسبك او أترك لنا معلوماتك ليتم التواصل معك ",
    icon: Receipt,
  },
  {
    title: "أبحث عن الرحلة",
    description:
      "موندو تورز تحتوي على اكثر من 100 برنامج حول العالم يمكنك البحث عن طريق الدخول هنا",
    icon: Search,
  },
];

const HowWorks = () => {
  return (
    <div className="container">
      <div className="mt-4 relative grid md:grid-cols-3 gap-20">
        <img
          className="hidden md:block absolute inset-x-0 top-10"
          src="/imgs/vector.svg"
          alt=""
        />
        {data.map((item) => (
          <div
            className="relative flex flex-col items-center max-w-xs mx-auto"
            key={item.title}
          >
            <div className="nc-NcImage dark:hidden block mb-8 max-w-[200px] mx-auto">
              <div className="w-16 h-16 shadow-sm bg-primary/50 rounded-2xl flex items-center justify-center hover:bg-primary transition-all duration-500">
                <item.icon size={35} className="text-white" />
              </div>
            </div>
            <div className="text-center mt-auto">
              <h3 className="text-xl font-primary font-bold">{item.title}</h3>
              <span className="block mt-5 text-neutral-500 dark:text-neutral-400 font-primary">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWorks;
