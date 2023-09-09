import { ITour } from "./Tour";

export interface ILocation {
  id?: number;
  name: string | null;
  active: boolean;
  sortOrder: number | null;
  createdDate: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoTags: string | null;
  totalTours: number;
  seoAlt: string | null;
  tours?: ITour[] | null;
  imageUrl: string | null;
  imageSize: number;
  nameBusiness: string;
  file?: FileType;
  locationTours?: ILocationTours[];
}

export interface ILocationTours {
  id?: number;
  locationId: number;
  tourIds: string;
  title: string;
  tab: number;
}

export interface FileType extends File {
  preview: string;
}
