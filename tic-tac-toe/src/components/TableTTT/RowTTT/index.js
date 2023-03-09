import React from 'react';
import PropTypes from 'prop-types';
import ColTTT from './ColTTT';


function RowTTT({ key, r, col, ...defaultProps }) {
    let cols = [];
    for (let j = 1; j <= col; j++) {
      let c1 = r - j;
      let c2 = r + j;
      cols.push({ r, j, c1, c2 });
    }
    return (
      <div key={key} className={`row row${r}`}>
        {cols.map((data, index) => (
          <ColTTT key={index} data={data} {...defaultProps} />
        ))}
      </div>
    );
  }
  
  RowTTT.propTypes = {
    
};

export default RowTTT;