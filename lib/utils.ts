import { ITourType } from "@/interface/Tour";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const europeanCountries = [
  { label: "النمسا", countryCode: "AT" },
  { label: "بلجيكا", countryCode: "BE" },
  { label: "بلغاريا", countryCode: "BG" },
  { label: "كرواتيا", countryCode: "HR" },
  { label: "قبرص", countryCode: "CY" },
  { label: "التشيك", countryCode: "CZ" },
  { label: "الدنمارك", countryCode: "DK" },
  { label: "استونيا", countryCode: "EE" },
  { label: "فنلندا", countryCode: "FI" },
  { label: "فرنسا", countryCode: "FR" },
  { label: "ألمانيا", countryCode: "DE" },
  { label: "اليونان", countryCode: "GR" },
  { label: "هنغاريا", countryCode: "HU" },
  { label: "آيسلندا", countryCode: "IS" },
  { label: "إيرلندا", countryCode: "IE" },
  { label: "إيطاليا", countryCode: "IT" },
  { label: "لاتفيا", countryCode: "LV" },
  { label: "ليتوانيا", countryCode: "LT" },
  { label: "لوكسمبورج", countryCode: "LU" },
  { label: "مالطا", countryCode: "MT" },
  { label: "هولندا", countryCode: "NL" },
  { label: "النرويج", countryCode: "NO" },
  { label: "بولندا", countryCode: "PL" },
  { label: "البرتغال", countryCode: "PT" },
  { label: "رومانيا", countryCode: "RO" },
  { label: "سلوفاكيا", countryCode: "SK" },
  { label: "سلوفينيا", countryCode: "SI" },
  { label: "إسبانيا", countryCode: "ES" },
  { label: "السويد", countryCode: "SE" },
  { label: "سويسرا", countryCode: "CH" },
  { label: "المملكة المتحدة", countryCode: "GB" },
];
export type QueryString = {
  country:any[]
  days:any[]
  maxprice:any
  location:number | null 
  tab:string | null
  type:string[]
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
  { label: "من 5 إلى 7 أيام", value: "t1",period:[5,6,7] },
   { label: "من 8 إلى 10 أيام", value: "t2",period:[8,9,10]  },
    { label: "من 11 إلى 20 يوم", value: "t3",period:[11,12,13,14,15,16,17,18,19,20]  },
 
]