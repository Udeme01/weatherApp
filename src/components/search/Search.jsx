import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import PropTypes from "prop-types";
import { GEO_API_URL, geoApiOptions } from "../../Api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  //   The inputValue is what's typed into the input... So we'll use that value and pass it to the fetch method and to the url to get the data needed.
  const loadOptions = async (inputValue) => {
    const url = inputValue
      ? `${GEO_API_URL}/cities?minPopulation=1000&countryIds=NG&namePrefix=${inputValue}`
      : `${GEO_API_URL}/cities?minPopulation=1000&countryIds=NG`;

    const response = await fetch(url, geoApiOptions);
    const resData = await response.json();
    return {
      options: resData.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name} ${city.countryCode}`,
        };
      }),
    };
  };

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <>
      <AsyncPaginate
        placeholder="search for a city in Nigeria"
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
