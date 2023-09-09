import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InstagramIcon } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mt-8 lg:mt-4">
      <div className="grid justify-items-center">
        <h1 className="text-xl lg:text-3xl mb-4 font-bold  font-primary">
          من هي موندو تورز؟
        </h1>

        <p className="font-primary text-xl text-center">
          موندو للسياحة هي واحدة من أكبر الشركات المتخصصة بالسفر و السياحية فى
          سلطنة عمان التي تعمل تحت شعار (
          <span className="text-primary font-bold">انت اختار</span>) : نقدم مئات
          البرامج أسبوعيا و يوميا لاكثر من 50 دولة حول العالم مع تقديم خيار
          الاختيار للمسافر لمدة و تاريخ و طريقة الرحلة.
        </p>
      </div>

      <Separator className="my-16" />

      <h1 className="text-xl lg:text-3xl font-bold text-center mb-8 font-primary">
        من ميزات موندو تقديم أكثر من خيار لطريقة السفر برحلات يومية وأسبوعية على
        مدرا السنة كالتالي
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {_contents.map((item) => (
          <div className="grid justify-items-center shadow-2xl p-3 rounded-2xl">
            <img src={item.img} className="w-11 lg:w-20" />
            <h2 className="font-primary font-bold text-primary text-center pt-3">
              {item.title}
            </h2>
            <p className="font-primary text-center text-sm pt-4" dir={"rtl"}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <Separator className="my-16" />

      <h1 className="text-xl lg:text-3xl font-bold text-center mb-8 font-primary">
        رؤيتنا ومهمتنا
      </h1>
      <p className="font-primary text-base lg:text-xl text-center">
        تقديم خيارات أكثر للمسافر العماني من ناحية عدد الرحلات ومدتها وتواريخها
        تقديم الاستشارات الكاملة للمسافر قبل السفر حتى يتسنى له اختيار البرنامج
        المناسب لشخصيته واهتماماته وميزانيته تقديم الدعم للمكاتب الصغيرة وتدريب
        الشباب العماني في مهنة السياحة عن طريق دورات واستشارات تقديم خدمة عالية
        للمسافر خلال رحلته عن طريق موظفينا ذو الخبرة العالية لتسهيل الرحلة بأقل
        تكلفة ممكنة تقديم كل التسهيلات الممكنة حتى يعود المسافر الى ارض الوطن
        مستمتع برحلته وحقق كل أهدافه في سفرته
      </p>
      <Separator className="my-16" />
      <div className="d-grid justify-items-end">
        <a href="https://www.instagram.com/p/B2Gr4omDs0y/" target={"_blank"}>
          <Button>
            <InstagramIcon className="ml-2" />
            تعرف على آراء عملائنا على الانستغرام
          </Button>
        </a>
        <h1
          className="font-primary font-bold mt-5 text-xl lg:text-3xl"
          dir="rtl"
        >
          فروعنا
        </h1>

        <ul className="font-primary list-disc mr-7 mt-4" dir="rtl">
          <li dir="rtl">سلطنة عمان / شركة سفر وسياحة</li>
          <li dir="rtl">تركيـــا: شركة تأجير سيارات</li>
          <li dir="rtl">الأردن: شركة تسويق + شركة سياحة وسفر</li>
          <li dir="rtl">مصر: شركة تسويق </li>
        </ul>
      </div>
    </div>
  );
};

const _contents = [
  {
    title: "سوق بروحك",
    desc: `قيادة سيارة في ارياف أوروبا من خلال رحلات يومية الى جميع الدول و توفير كل ما يلزم المسافر من تذاكر و تاشيرات و فنادق مناسبة و رخصة و حجوزات سيارة و الأهم تقديم النصائح و أسماء الأماكن السياحية و موقعها و متابعة المسافر خلال الرحلة`,
    img: "/imgs/alone.png",
  },
  {
    title: "رحلات حرة",
    desc: `لمحبين الخصوصية نقدم مجموعة من الرحلات الأساسية القابلة للتعديل حسب طلب المسافر الى كل دول العالم مع توفير كل الخدمات مثل القطارات وجولات جماعية و الباص السياحية و سائق خاص و استقبالات و توديع المطارات و غيرها من الخدمات حسب رغبة و ميزانية المسافر`,
    img: "",
  },
  {
    title: "رحلات جماعية",
    desc: `أكثر من 200 رحلة أسبوعيا الى جميع دول أوروبا مع مرشد سياحي عربي و انجليزي تشمل التنقلات و جولات يوميـــة و دخوليات المزارات السياحية `,
    img: "/imgs/group.png",
  },
  {
    title: "رحلات بحرية",
    desc: `رحلات أسبوعية في كل بحار العالم ( البحر المتوسط + بحر الشمال النرويج + بحر البلطيق + البحر الادرياتيكي + أمريكا + اسيا ) مع توفير الخدمات حسب الطلب مثل إضافة انترنت و الجولات و إقامة قبل و بعد الرحلة  `,
    img: "/imgs/sea.png",
  },
];
export default AboutPage;
