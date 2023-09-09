import {
  IContentResponse,
  ILocationResponse,
  ILocationToursResponse,
  ITourResponse,
} from "@/interface/Response";
import { Order, SearchQuery, eFilterOperator } from "@/interface/Search";
import { http } from "@/service/httpService";
import { daysFilter } from "./utils";
import { ITourType } from "@/interface/Tour";
import { BaseResponse } from "@/interface/BaseResponse";
import { ILocationTours } from "@/interface/Location";
import { IContent } from "@/interface/Content";

type TourSearch = {
  country?: string;
  tourIds?: string | null;
  days?: string;
  pageSize?: number;
  columns?: string;
  tab?: string | null;
  type?: string | null;
  pageIndex?: number | null;
};

export async function getBestTours(ids: number[]) {
  const searchQuery: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 15,
  };
  searchQuery.FilterByOptions.push({
    FilterFor: `${ids.join(",")}`,
    FilterOperator: eFilterOperator.EqualsToList,
    MemberName: "idsList",
  });
  const result = await http<ITourResponse>("Tour/SearchBusiness").post(
    searchQuery
  );

  return result;
}
export async function getTours(prop: TourSearch) {
  const { columns, country, days, tourIds, pageSize, type, pageIndex } = prop;

  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: pageIndex ?? 0,
    PageSize: pageSize ?? 0,
  };

  if (country) {
    _SQ.FilterByOptions.push({
      FilterFor: `${country}`,
      FilterOperator: eFilterOperator.EqualsToList,
      MemberName: "country",
    });
  }
  if (tourIds) {
    _SQ.FilterByOptions.push({
      FilterFor: `${tourIds}`,
      FilterOperator: eFilterOperator.EqualsToList,
      MemberName: "idsList",
    });
  }
  if (type) {
    _SQ.FilterByOptions.push({
      FilterFor: `${type}`,
      FilterOperator: eFilterOperator.EqualsToList,
      MemberName: "type",
    });
  }
  if (days) {
    const period = daysFilter.filter((x) => days.includes(x.value));
    var totalDays: number[] = [];
    period?.map((item) => {
      totalDays = totalDays.concat(item.period);
    });

    _SQ.FilterByOptions.push({
      FilterFor: `${totalDays.join(",")}`,
      FilterOperator: eFilterOperator.EqualsToList,
      MemberName: "numberOfDays",
    });
  }

  const result = await http<ITourResponse>("Tour/SearchBusiness").post(_SQ);

  return result;
}
export async function getTourBySlug(slug: string) {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1,
  };

  _SQ.FilterByOptions.push({
    FilterFor: slug?.replaceAll("-", " "),
    FilterOperator: eFilterOperator.EqualsTo,
    MemberName: "Name",
  });
  const result = await http<ITourResponse>("Tour/SearchGeneral").post(_SQ);

  return result;
}
export async function getDestination() {
  var _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 100,
  };

  _SQ.FilterByOptions.push({
    FilterFor: true,
    FilterOperator: eFilterOperator.EqualsTo,
    MemberName: "Active",
  });

  _SQ.OrderByOptions.push({
    MemberName: "SortOrder",
    SortOrder: Order.ASC,
  });

  const result = await http<ILocationResponse>("Location/Search").post(_SQ);
  return result;
}
export async function getTourTypes() {
  const result = await http<ITourType[]>("Content/TourTypes").get();

  return result;
}
export async function getLocationTours(locationId: number) {
  const searchQuery: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 8,
  };
  if (locationId && locationId > 0)
    searchQuery.FilterByOptions.push({
      FilterFor: locationId,
      FilterOperator: eFilterOperator.EqualsTo,
      MemberName: "Id",
    });

  const result = await http<ILocationToursResponse>(
    "Location/SearchTitles"
  ).post(searchQuery);

  return result;
}
export async function getContentData() {
  const result = await http<IContentResponse>("Content/Read").get();
  return result;
}
