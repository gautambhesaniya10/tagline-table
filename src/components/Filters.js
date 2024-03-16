import { Divider, FormControlLabel, FormGroup, Switch } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

const Filters = ({ data, applyFilters }) => {
  const [filters, setFilters] = useState({});

  const extractKeys = useMemo(() => {
    const keys = new Set();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => keys.add(key));
    });
    return Array.from(keys);
  }, [data]);

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: {
        ...filters[key],
        [value]: !filters[key]?.[value],
      },
    });
  };

  useEffect(() => {
    if (Object.keys(filters)?.length !== 0) {
        applyFilters(filters);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className="my-12 flex gap-4 sm:justify-center flex-wrap">
      {extractKeys?.slice(2)?.map((key, index) => (
        <div className="flex gap-5 justify-between w-full sm:w-auto" key={index}>
          <p className="text-black font-semibold text-xl pt-1">{key}</p>
          <FormGroup>
            {[...new Set(data?.map((item) => item[key]))].map((value, i) => {
              if (value !== undefined) {
                return (
                  <FormControlLabel
                    key={i}
                    control={
                      <Switch
                        checked={filters[key]?.[value] || false}
                        onChange={() => handleFilterChange(key, value)}
                      />
                    }
                    label={value}
                  />
                );
              }
            })}
          </FormGroup>
          <Divider className="sm:block hidden" orientation="vertical" flexItem />
        </div>
      ))}
    </div>
  );
};

export default Filters;
