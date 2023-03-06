import {
  useState, useEffect, FC, Dispatch,
} from 'react';
import { geoCodeApi } from '@/api';
import { SearchIcon } from './Icons';
import { ICity } from '@/utils/types';

interface IWeatherSearchProps {
  selectedCity: ICity;
  setSelectedCity: Dispatch<ICity>;
  setShowTable: Dispatch<boolean>;
}

const WeatherSearch: FC<IWeatherSearchProps> = ({
  selectedCity, setSelectedCity, setShowTable,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCity, setSearchCity] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([] as ICity[]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Object.keys(selectedCity).length !== 0) {
      setSelectedCity({} as ICity);
      setSearchTerm('');
      setCitySuggestions([]);
      setSearchCity(false);
    }
    setSearchTerm(e.target.value);
  };

  /* eslint-disable no-console */
  useEffect(() => {
    setSearchCity(false);
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== '' && Object.keys(selectedCity).length === 0) {
        geoCodeApi(searchTerm).then((res) => {
          setCitySuggestions(res);
          setSearchCity(true);
        }).catch((err) => console.error(err));
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleCityClick = (city: ICity) => {
    setSelectedCity(city);
    setSearchTerm(`${city.name}, ${city.country}`);
  };

  const noSelectedCity = Object.keys(selectedCity).length === 0;
  return (
    <div className="flex-col">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="search"
          value={searchTerm}
          onChange={handleInputChange}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="City"
        />
      </div>
      {noSelectedCity && searchCity === true && (
        <div className="z-10 top-50 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-auto">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            {citySuggestions.length > 0 ? (
              citySuggestions.map((city) => (
                <li>
                  <div role="button" onClick={() => handleCityClick(city)}>
                    <p className="block px-4 py-2 hover:bg-gray-100">
                      {city.name}
                      ,
                      {' '}
                      {city.country}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li>
                <p className="block px-4 py-2">City not found</p>
              </li>
            )}
          </ul>
        </div>
      )}
      <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
        <button
          className={`rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${noSelectedCity && 'opacity-50 cursor-not-allowed'}`}
          type="submit"
          onClick={() => setShowTable(true)}
          disabled={noSelectedCity}
        >
          Display Weather
        </button>
      </div>
    </div>
  );
};

export default WeatherSearch;
