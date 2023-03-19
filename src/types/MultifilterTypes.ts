export interface MultiFilterType {
  filters: Array<FilterType>;
  current?: Array<CurrentType>;
}
  
export interface FilterType {
  name: string;
  type: string;
  options?: Array<string>;
}

export interface CurrentType {
  type?: string;
  value?: string;
  name?: string;
}