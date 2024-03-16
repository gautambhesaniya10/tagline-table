import React, { useState } from "react";
import Table from "../components/Table";
import { Data } from "../data";
import Filters from "../components/Filters";
import SearchFilter from "../components/SearchFilter";

const HomePage = () => {
  const [filteredData, setFilteredData] = useState(Data);
  const [searchText, setSearchText] = useState("");

  const removeFalseValues = (obj) => {
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        (obj[key] === false ||
          (typeof obj[key] === "object" &&
            removeFalseValues(obj[key]) === false))
      ) {
        delete obj[key];
      }
    }
    return Object.keys(obj).length > 0;
  };

  const applyFilters = async (selectedFilters) => {
    await removeFalseValues(selectedFilters);

    const filteredData = Data.filter((item) => {
      return Object.entries(selectedFilters).every(([key, values]) => {
        if (!values) return true;
        return values[item[key]];
      });
    });

    setFilteredData(filteredData);
  };

  const FilteredSearchData = filteredData?.filter(
    (item) =>
      (item?.name &&
        item?.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (item?.mall &&
        item?.mall.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div className="w-full px-10">
      <div className="flex gap-5 items-center justify-center flex-wrap">
        <Filters data={Data} applyFilters={applyFilters} />
        <SearchFilter setSearchText={setSearchText} />
      </div>
      <Table data={FilteredSearchData} />
    </div>
  );
};

export default HomePage;
