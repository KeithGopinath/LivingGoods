/*eslint-disable*/
import React from 'react';

const StatsCard = ({ bigIcon, statsText, statsValue }) => (
  <div className="card card-stats">
    <div className="content">
      <div className="row">
        <div className="col-xs-5">
          <div className="icon-big text-center icon-warning">
            {bigIcon}
          </div>
        </div>
        <div className="col-xs-7">
          <div className="numbers">
            <p>{statsText}</p>
            {statsValue}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StatsCard;
