import { useQuery, UseQueryOptions } from 'react-query';
import {
  getAllCountries,
  getCountriesQuickInfo,
  getCountryByCode,
  searchForPhotos,
} from '../api';
import { Country } from '../types';

export const useGetCountries = (
  options?: UseQueryOptions<Country[], unknown, Country[], string[]>
) => {
  return useQuery(['countries'], getAllCountries, { ...options });
};

export const useGetCountry = (
  code: string,
  options?: UseQueryOptions<Country, unknown, Country, string[]>
) => {
  return useQuery(['country', code], () => getCountryByCode(code), {
    ...options,
  });
};

export const useGetCountriesQuickInfo = (
  codes: string[],
  options?: UseQueryOptions<
    Country[],
    unknown,
    Country[],
    (string | string[])[]
  >
) => {
  return useQuery(
    ['countriesQuickInfo', codes],
    () => getCountriesQuickInfo(codes),
    {
      ...options,
    }
  );
};

export const useSearchForPhotos = (
  {
    query,
    orientation,
    perPage,
  }: {
    query: string;
    orientation?: 'vertical' | 'landscape' | 'squarish';
    perPage?: number;
  },
  options?: UseQueryOptions<
    any,
    unknown,
    any,
    (
      | string
      | {
          query: string;
          orientation: 'vertical' | 'landscape' | 'squarish' | undefined;
        }
    )[]
  >
) => {
  return useQuery(
    ['searchForPhotos', { query, orientation }],
    () => searchForPhotos({ query, orientation, perPage }),
    {
      ...options,
    }
  );
};
