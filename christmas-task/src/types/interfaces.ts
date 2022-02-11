export interface IRangeFilterData {
  minValue: number;
  maxValue: number;
  step: number;
  title: string;
}

export interface IValueFilterData {
  typeValues: string[];
  buttonStyle: string;
  title: string;
}

export interface IToyData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: string;
}

export interface ISortingTypes {
  [key: string]: string,
}

export interface IChoiceMenuData {
  title: string;
  numItems: number;
  classNameItems: string;
  classNameContainer: string;
  idItems: string[];
}

export interface IMainChristmasTree {
  coordX: number;
  coordY: number;
  width?: number;
}
