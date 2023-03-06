import {
  Dispatch, FC, useEffect, useState,
} from 'react';
import { ICity, IWeatherApiResponse } from '@/utils/types';
import { getCurrentWeatherApi } from '@/api';

interface IWeatherTableProps {
  selectedCity: ICity;
  setSelectedCity: Dispatch<ICity>;
  setShowTable: Dispatch<boolean>;
}

const WeatherTable:FC<IWeatherTableProps> = ({ selectedCity, setShowTable, setSelectedCity }) => {
  const [weatherDetails, setWeatherDetails] = useState({} as IWeatherApiResponse);
  const date = new Date(weatherDetails.dt * 1000);

  const mainWeather = weatherDetails.weather?.find((el) => el);

  /* eslint-disable no-console */
  useEffect(() => {
    const { lat, lon } = selectedCity;
    getCurrentWeatherApi(lat, lon).then((res) => {
      setWeatherDetails(res);
    }).catch((err) => console.error(err));
  }, []);

  const handleOnBackClick = () => {
    setWeatherDetails({} as IWeatherApiResponse);
    setSelectedCity({} as ICity);
    setShowTable(false);
  };

  return (
    <div className="flex-col">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date(mm/dd/yyy)
            </th>
            <th scope="col" className="px-6 py-3">
              Temp(F)
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">
              Description
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">
              Main
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">
              Pressure
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">
              Humidity
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <td className="px-6 py-4">
              {date.toLocaleDateString('en-US') || '-'}
            </td>
            <td className="px-6 py-4">
              {weatherDetails.main?.temp || '-'}
            </td>
            <td className="px-6 py-4 hidden md:table-cell">
              {mainWeather?.description || '-'}
            </td>
            <td className="px-6 py-4 hidden md:table-cell">
              {mainWeather?.main || '-'}
            </td>
            <td className="px-6 py-4 hidden md:table-cell">
              {weatherDetails.main?.pressure || '-'}
            </td>
            <td className="px-6 py-4 hidden md:table-cell">
              {weatherDetails.main?.humidity || '-'}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
          onClick={() => handleOnBackClick()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default WeatherTable;
