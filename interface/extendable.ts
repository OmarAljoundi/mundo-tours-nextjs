import {
  Location,
  LocationTours,
  Tour,
  TourCountries,
  TourExcludes,
  TourIncludes,
  TourPricing,
  TourSections,
  TourType,
} from "@prisma/client";

export interface LocationProps extends Location {
  File?: FileType;
  SignedUrl: string;
  LocationTours: LocationTours[];
}

export interface TourProps extends Tour {
  File?: FileType;
  SignedUrl: string;
  TourCountries: TourCountries[];
  TourSections: TourSections[];
  TourExcludes: TourExcludes[];
  TourPricing: TourPricing[];
  TourIncludes: TourIncludes[];
  TourType: TourType;
}
export interface FileType extends File {
  preview: string;
}
