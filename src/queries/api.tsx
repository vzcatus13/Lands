import { useQuery } from 'react-query';
import {
  getAllCountries,
  getCountriesQuickInfo,
  getCountryByCode,
  searchForPhotos,
} from '../api';

export const useGetCountries = options => {
  return useQuery(['countries'], getAllCountries, { ...options });
};

export const useGetCountry = (code, options) => {
  return useQuery(['country', code], () => getCountryByCode(code), {
    ...options,
  });
};

export const useGetCountriesQuickInfo = (codes, options) => {
  return useQuery(
    ['countriesQuickInfo', codes],
    () => getCountriesQuickInfo(codes),
    {
      ...options,
    }
  );
};

export const useSearchForPhotos = (
  { query, orientation, perPage },
  options
) => {
  return useQuery(
    ['searchForPhotos', { query, orientation }],
    () => searchForPhotos({ query, orientation, perPage }),
    {
      ...options,
    }
  );
};
