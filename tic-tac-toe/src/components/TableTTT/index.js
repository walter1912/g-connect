import React from "react";
import PropTypes from "prop-types";
import RowTTT from "./RowTTT";

const TableTTT = ({ ROW, COLUMN, lineVictory }) => {
  // function create button ROW*COLUMN

  let rows = [];
  for (let i = 1; i <= ROW; i++) {
    rows.push(i);
  }
  const defaultProps = {
    ROW: ROW,
    COLUMN: COLUMN,
    lineVictory: lineVictory,
  };
  return (
    <div>
      {rows.map((row, index) => (
        <RowTTT key={index} r={row} col={COLUMN} {...defaultProps} />
      ))}
    </div>
  );
};


export default TableTTT;
