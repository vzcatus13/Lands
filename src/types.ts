type CountryName = {
  common: string;
  official: string;
};

type ExtendedCountryName = {
  common: string;
  official: string;
  nativeName: {
    [key: string]: CountryName;
  };
};

type Currency = {
  name: string;
  symbol: string;
};

type Idd = {
  root: string;
  suffixes: string[];
};

type LatLng = [number, number];

export type GiniIndex = { [year: number]: number };

export type Country = {
  name: ExtendedCountryName;
  cca2: string;
  tld?: string[];
  cca3?: string;
  ccn3?: string;
  cioc?: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  currencies?: {
    [currencyCode: string]: Currency;
  };
  idd?: Idd;
  capital?: string[];
  altSpellings?: string[];
  region?: string;
  subregion?: string;
  languages?: {
    [languageCode: string]: string;
  };
  translations?: {
    [languageCode: string]: CountryName;
  };
  latlng?: LatLng;
  landlocked?: boolean;
  borders?: string[];
  area?: number;
  demonyms?: {
    [language: string]: {
      f: string;
      m: string;
    };
  };
  flag?: string;
  maps?: {
    [provider: string]: string;
  };
  population?: number;
  gini?: GiniIndex;
  fifa?: string;
  car?: {
    signs: string[];
    side: string;
  };
  timezones?: string[];
  continents?: string[];
  flags?: {
    [imageType: string]: string;
  };
  coatOfArms?: {
    [imageType: string]: string;
  };
  startOfWeek?: string;
  capitalInfo?: {
    latlng: LatLng;
  };
  postalCode?: {
    format: string;
    regex: string;
  };
};

export type ColumnProps = {
  isNumeric?: boolean;
};
