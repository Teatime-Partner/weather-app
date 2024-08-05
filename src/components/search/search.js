// import react components and API values
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApi } from "../../api";

//create a function that triggers while searching for city and get the values for weatherAPI (city, and position details)
const Search = ({ onSearchChange }) => {
  //set an empty useState
  const [search, setSearch] = useState(null);

  // fetch API on input change
  const loadOptions = (inputValue) => {
    // fetch geoAPI value, set minPopulation to limit the number of results while searching for location
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApi)
      .then((response) => response.json())
      .then((response) => {
        return {
          // on response get value for options for AsyncPaginate; map through response.json() to pick the required items
          options: response.data.map((city) => {
            return {
              // grab required items for AsyncPaginate
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((error) => {
        console.error("Error fetching city details", error);
        return {
          options: [],
        };
      });
  };

  //handleEvent for user input in the search field and update useState with results, don't clear useState until new search
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  //return AsyncPaginate element with values passed from useState and loadOptions API
  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
