import React from 'react';

const StatsCard = ({ title, value, bgColor }) => {
  return (
    <div className="stats-card">
      <div className="left" style={{ backgroundColor: bgColor }}>
        <h3>{title}</h3>
        <p>0.002%</p>
      </div>
      <div className="right">
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;
