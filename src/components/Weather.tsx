import { useState } from 'react';
import { ICity } from '@/utils/types';

import WeatherSearch from './WeatherSearch';
import WeatherTable from './WeatherTable';

const Weather = () => {
  const [showTable, setShowTable] = useState(false);
  const [selectedCity, setSelectedCity] = useState({} as ICity);

  return showTable ? (
    <WeatherTable
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      setShowTable={setShowTable}
    />
  ) : (
    <WeatherSearch
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      setShowTable={setShowTable}
    />
  );
};

export default Weather;
