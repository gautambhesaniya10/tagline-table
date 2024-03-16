import React from "react";

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const allKeys = data?.reduce((keys, obj) => {
    return keys.concat(Object.keys(obj));
  }, []);

  const columns = [...new Set(allKeys)];

  return (
    <div className="sm:w-[80%] w-full sm:mx-auto my-10 overflow-x-auto">
      <table className="">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns?.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
