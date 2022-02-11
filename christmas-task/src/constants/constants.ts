import { IRangeFilterData, ISortingTypes, IValueFilterData } from 'types/interfaces';

export const PAGE_HASHES = {
  home: '#home',
  toys: '#toys',
  christmasTree: '#christmas-tree'
};

export const PAGE_IDS = {
  home: 'home-page',
  toys: 'toys-page',
  christmasTree: 'christmas-tree-page'
};

export const FAVORITES_COUNTER_ERROR_TEXT = 'Sorry, all slots are occupied';

export const NAV_BUTTONS_NAMES = {
  toys: 'toys',
  christmasTree: 'christmas tree'
};

export const LOGO_RSSCHOOL_HREF = 'https://rs.school/js/';

export const DEV_INFO = {
  href: 'https://github.com/ckachok',
  developer: 'App developer: Sergei Hul',
  year: '2021'
};

export const SEARCH_PLACEHOLDER = 'Search for toys';

export const SETTINGS_TITLE = {
  sorting: 'Sorting',
  filtersByRange: 'Filters by range',
  filtersByValue: 'Filters by value'
};

export const SETTINGS_BUTTON_NAMES = {
  resetFilters: 'Reset filters',
  resetSettings: 'Reset settings'
};

export const SORTING_TITLE = 'Select sorting:';

export const SORTING_TYPES: ISortingTypes = {
  byNameAsc: 'By name A → Z',
  byNameDesc: 'By name Z → A',
  byYearAsc: 'By year ↑',
  byYearDesc: 'By year ↓',
};

export const DATA_FILTER_BY_COPIES: IRangeFilterData = {
  minValue: 1,
  maxValue: 12,
  step: 1,
  title: 'Number of copies:'
};

export const DATA_FILTER_BY_YEARS: IRangeFilterData = {
  minValue: 1940,
  maxValue: 2020,
  step: 10,
  title: 'Year of purchase:'
};

export const SHAPE_FILTER_DATA: IValueFilterData = {
  typeValues: ['ball', 'bell', 'cone', 'snowflake', 'figurine'],
  buttonStyle: 'shape-button',
  title: 'Shape:'
};

export const COLOR_FILTER_DATA: IValueFilterData = {
  typeValues: ['white', 'yellow', 'red', 'blue', 'green'],
  buttonStyle: 'color-button',
  title: 'Color:'
};

export const SIZE_FILTER_DATA: IValueFilterData = {
  typeValues: ['big', 'average', 'small'],
  buttonStyle: 'size-button',
  title: 'Size:'
};

export const FAVORITES_FILTER_DATA = {
  id: 'favorite',
  title: 'Only favorites:'
};

export const FILTER_TITLES = {
  range: 'Filters by range',
  value: 'Filters by value'
};

export const TOYS_DATA_URL = 'assets/data/data.json';

export const SRC_IMAGES_TOYS = 'https://raw.githubusercontent.com/ckachok/stage1-tasks/christmas-task/assets/toys/';

export const TOY_CARD_PROPERTY_NAMES = [
  'Number of copies: ',
  'Year of purchase: ',
  'Toy shape: ',
  'Toy color: ',
  'Toy size: ',
  'Favorite: '
];

export const NO_MATCH_MESSAGE = 'Sorry, no matches found';

export const MAX_NUM_FAVORITE_TOYS = 20;

export const HOME_PAGE = {
  mainTitle: 'Christmas tree',
  nameButton: 'Start the game'
};

export const CHRISTMAS_TREE_DATA = {
  num: '1',
  src: 'assets/image/christmas-tree/',
  alt: 'Main christmas tree',
  useMap: '#main-christmas-tree'
};

export const MAP_IMAGE_DATA = {
  name: CHRISTMAS_TREE_DATA.useMap.slice(1),
  areaCoords: `170,655,251,651,302,649,342,644,357,616,390,624,418,611,427,588,439,547,459,523,456,487,408,479,398,447,426,435,421,
               404,386,391,379,365,340,369,345,355,388,351,401,325,390,308,361,312,345,287,368,273,370,256,348,242,376,221,370,192,
               335,194,324,164,340,140,322,118,295,130,290,99,264,100,288,78,282,52,255,29,245,2,213,0,208,32,183,44,171,80,182,98,
               176,119,150,108,135,129,154,155,147,187,115,186,97,188,85,213,104,229,103,251,132,268,98,284,98,314,69,310,60,333,67,
               348,92,356,86,382,67,392,33,386,13,400,9,419,29,439,42,461,67,463,65,482,8,485,1,503,3,523,20,541,16,554,30,566,47,572,
               52,591,68,602,90,597,83,620,97,633,113,639,148,615,156,643`,
  areaShape: 'poly',
  areaId: 'aria'
};

export const GARLAND_DATA = {
  translate: 115,
  translateIncrease: 45,
  rotate: 90.5,
  rotateStep: 5.5,
  rotateStepIncrease: 0.5,
  margin: -345,
  marginIncrease: 55,
  numLedsInSet: [7, 9, 13, 17, 19, 25],
};

export const MUSIC_SRC = '../../assets/audio/audio.mp3';

export const TITLE_TOYS = 'Toys';

export const DEFAULT_NUMBER_TOYS = 20;

export const RESET_BUTTON_TEXT = 'Reset setting';

export const CHRISTMAS_TREE_CHOICE_DATA = {
  title: 'Choose a tree',
  numItems: 6,
  classNameItems: 'christmas-trees__item',
  classNameContainer: 'christmas-trees__container',
  idItems: ['tree-1', 'tree-2', 'tree-3', 'tree-4', 'tree-5', 'tree-6']
};

export const BACKGROUND_CHOICE_DATA = {
  title: 'Choose a background',
  numItems: 10,
  classNameItems: 'bgs__item',
  classNameContainer: 'bgs__container',
  idItems: ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5', 'bg-6', 'bg-7', 'bg-8', 'bg-9', 'bg-10']
};

export const GARLAND_CHOICE_DATA = {
  title: 'Choose a garland',
  numItems: 5,
  classNameItems: 'garlands__item',
  classNameContainer: 'garlands__container',
  idItems: ['multicolor', 'red', 'blue', 'yellow', 'green']
};
