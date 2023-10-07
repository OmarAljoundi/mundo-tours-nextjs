import { Order } from "@/interface/Search";
import { ITourType } from "@/interface/Tour";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
    value:"Price",
    order:Order.ASC
  },
   {
    label:"الأعلى سعراً",
    value:"Price",
    order:Order.DESC
  },
   {
    label:"الأطول مدة",
    value:"NumberOfDays",
    order:Order.DESC
  },
    {
    label:"الأقل مدة",
    value:"NumberOfDays",
    order:Order.ASC
  },
]