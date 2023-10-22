import { Order } from "@/interface/Search";
import { ITourType } from "@/interface/Tour";
import { Tour } from "@/types/custom";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export const europeanCountries = [
  { label: "النمسا", countryCode: "AT" },
  { label: "ايطاليا", countryCode: "IT" },
  { label: "سويسرا", countryCode: "CH" },
  { label: "المانيا", countryCode: "DE" },
  { label: "فرنسا", countryCode: "FR" },
  { label: "اسبانيا", countryCode: "ES" },
  { label: "التشيك", countryCode: "CZ" },
  { label: "النرويج", countryCode: "NO" },
  { label: "تركيا", countryCode: "TR" },
  { label: "هولندا", countryCode: "NL" },
  { label: "المجر", countryCode: "HU" },
  { label: "ماليزيا", countryCode: "MY" },
  { label: "اندونيسيا", countryCode: "ID" },
  { label: "تايلند", countryCode: "TH" },
  { label: "السويد", countryCode: "SE" },
  { label: "فنلندا", countryCode: "FI" },
  { label: "الدنمارك", countryCode: "DK" },
  { label: "امريكا", countryCode: "US" },
  { label: "المكسيك", countryCode: "MX" },
  { label: "البرتغال", countryCode: "PT" },
  { label: "اليونان", countryCode: "GR" },
  { label: "المغرب", countryCode: "MA" },
  { label: "سيرلنكا", countryCode: "LK" },
  { label: "المالديف", countryCode: "MV" },
  { label: "روسيا", countryCode: "RU" },
  { label: "بولندا", countryCode: "PL" },
  { label: "استونيا", countryCode: "EE" },
  { label: "لاتفيا", countryCode: "LV" },
  { label: "البوسنة", countryCode: "BA" },
  { label: "اذربيجان", countryCode: "AZ" },
  { label: "جورجيا", countryCode: "GE" },
  { label: "سلوفينيا", countryCode: "SI" },
  { label: "كرواتيا", countryCode: "HR" },
  { label: "بلغاريا", countryCode: "BG" },
  { label: "رومانيا", countryCode: "RO" },
  { label: "صربيا", countryCode: "RS" },
  { label: "الجبل الاسود", countryCode: "ME" },
  { label: "بلجيكا", countryCode: "BE" },
  { label: "البانيا", countryCode: "AL" },
  { label: "مولدافا", countryCode: "MD" },
  { label: "اليابان", countryCode: "JP" },
  { label: "كوريا الجنوبية", countryCode: "KR" },
  { label: "الصين", countryCode: "CN" },
  { label: "تونس", countryCode: "TN" },
  { label: "مصر", countryCode: "EG" },
  { label: "الاردن", countryCode: "JO" },
  { label: "الامارات", countryCode: "AE" },
  { label: "السعودية", countryCode: "SA" },
];
export type QueryString = {
  country:any[]
  days:any[]
  maxprice:any
  location:number | null 
  tab:string | null
  type:string[]
  sortMemebr?:string
  sortOrder?:number
}
export const queryString:QueryString = {
  country:[],
  days:[],
  maxprice:null,
  location:null,
  type:[],
  
  tab:null

}
export const daysFilter = [
  { label: "من 5 إلى 9 أيام", value: "t1",period:[5,6,7,8,9] },
   { label: "من 10 إلى 12 أيام", value: "t2",period:[10,11,12]  },
    { label: "من 13 إلى 24 يوم", value: "t3",period:[13,14,15,16,17,18,19,20,21,22,23,24]  },
 
]

export const orderFilter =[
  {
    label:"الأقل سعراَ",
    value:"price_double",
    order:Order.ASC
  },
   {
    label:"الأعلى سعراً",
    value:"price_double",
    order:Order.DESC
  },
   {
    label:"الأطول مدة",
    value:"number_of_days",
    order:Order.DESC
  },
    {
    label:"الأقل مدة",
    value:"number_of_days",
    order:Order.ASC
  },
]

export const getGridClass = (size:number) => {
  console.log("size",size)
  switch(size){
    case 1:return "sm:col-span-1"
    case 2:return "sm:col-span-2"
    case 3:return "sm:col-span-3"
    case 4:return "sm:col-span-4"
    case 5:return "sm:col-span-5"
    case 6:return "sm:col-span-6"
    case 7:return "sm:col-span-7"
    case 8:return "sm:col-span-8"
    case 9:return "sm:col-span-9"
    case 10:return "sm:col-span-10"
    case 11:return "sm:col-span-11"
    case 12:return "sm:col-span-12"
    default: return "sm:col-span-12"
  }
  
}

type TourSearch = {
  country?: string;
  days?: string;
  type?: string | null;
  maxprice?: number | null;
  sortMemebr?: string | null;
  sortOrder?: Order | null;
};

export function filterTours(prop:TourSearch, tours:Tour[]) {
  const {
    country,
    days,
    type,
    maxprice,
    sortMemebr,
    sortOrder,
  } = prop;

  let filteredTours = [...tours];

  if (country) {
    const countriesToCheck = country.split(',');
     filteredTours = tours.filter((tour) => {
      return countriesToCheck.some((country) => tour.tour_countries?.includes(country.trim()));
    });
  }

  if (type) {
    const typesToCheck = type.split(',');
     filteredTours = tours.filter((tour) => {
      return typesToCheck.some((t) => t.trim() === tour.tour_type?.name);
    });
  }

  if (days) {
    const period = daysFilter.filter((x) => days.includes(x.value));
    var totalDays: any[] = [];
    period.forEach((item) => {
      totalDays = totalDays.concat(item.period);
    });
    filteredTours = filteredTours.filter(tour => totalDays.includes(tour.number_of_days));
  }

  if (sortMemebr && sortOrder) {
    filteredTours.sort((a, b) => {
      if (sortOrder == Order.ASC) {
        //@ts-ignore
        return a[sortMemebr]! - b[sortMemebr]!;
      } else {
        //@ts-ignore
        return b[sortMemebr]! - a[sortMemebr]!;
      }
    });
  } else {
    filteredTours.sort((a, b) => a.price_double! - b.price_double!);
  }

  if (maxprice) {
    filteredTours = filteredTours.filter(tour => tour.price_double! < maxprice);
  }


  return filteredTours;
}


