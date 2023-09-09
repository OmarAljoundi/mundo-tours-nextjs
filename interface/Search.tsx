export type SearchQuery = {
  FilterByOptions: FilterByOptions[];
  OrderByOptions: OrderByOptions[];
  PageSize: number;
  PageIndex: number;
};

export type FilterByOptions = {
  MemberName: string;
  FilterOperator: eFilterOperator;
  FilterFor: any;
};

export type OrderByOptions = {
  MemberName: string;
  SortOrder: Order;
};

export enum Order {
  ASC = 1,
  DESC = 2,
}

export enum eFilterOperator {
  EqualsTo = 1,
  NotEqualsTo = 2,
  BeginsWith = 3,
  Contains = 4,
  GreaterThan = 5,
  GreaterThanOrEquals = 6,
  LessThan = 7,
  LessThanOrEquals = 8,
  EqualsToList = 9,
  NotEqualsToList = 10,
  NotBeginsWith = 11,
  NotContains = 12,
}
