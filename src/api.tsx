import { Country } from './types';

const baseFetchCountries = async (path: string) => {
  const res = await fetch(`https://restcountries.com/v3.1${path}`);

  if (!res.ok) {
    throw new Error(`${res.status}. ${res.statusText}`);
  }

  return res.json();
};

export const getAllCountries = async (): Promise<Country[]> => {
  const data: Country[] = await baseFetchCountries(
    '/all?fields=name,cca2,independent,unMember,flag,gini,landlocked'
  );

  // Rest Countries dataset have countries, which are not literally countries (e.g. Antarctica)
  // So I filter all countries which are independent and landlocked
  data.sort((a: Country, b: Country) =>
    a.name.common.localeCompare(b.name.common)
  );
  return data.filter(d => d.landlocked === true || d.independent === true);
};

export const getCountryByCode = async (code: string): Promise<Country> => {
  const data: Country = await baseFetchCountries(
    `/alpha/${code}?fields=name,cca2,independent,unMember,currencies,capital,area,subregion,languages,borders,population,flags,coatOfArms,capitalInfo,landlocked`
  );

  if (data.independent === true || data.landlocked === true) return data;

  throw new Error();
};

export const getCountriesQuickInfo = async (
  codes: string[]
): Promise<Country[]> => {
  const stringCodes = codes.join(',');

  const data: Country[] = await baseFetchCountries(
    `/alpha?fields=name,cca2,flag,subregion,independent,landlocked&codes=${stringCodes}`
  );

  return data.filter(d => d.landlocked === true || d.independent === true);
};

export const searchForPhotos = async ({
  query,
  orientation,
  perPage,
}: {
  query: string;
  orientation?: 'vertical' | 'landscape' | 'squarish';
  perPage?: number;
}) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}` +
      `${orientation === undefined ? '' : `&orientation=${orientation}`}` +
      `${perPage === undefined ? '' : `&per_page=${perPage}`}`,
    {
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`${res.status}. ${res.statusText}`);
  }

  return res.json();
};
