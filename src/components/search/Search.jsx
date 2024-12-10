import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import PropTypes from "prop-types";
import { GEO_API_URL, geoApiOptions } from "../../Api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  //   The inputValue is what's typed into the input... So we'll use that value and pass it to the fetch method and to the url to get the data needed.
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <>
      <AsyncPaginate
        placeholder="search for a city"
        debounceTimeout={600}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
      />
    </>
  );
};

Search.propTypes = {
  onSearchChange: PropTypes.any,
};

export default Search;
