import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomLineChart = ({ data }) => {
  return (
    <div className="line-chart-wrapper">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis width={100} />
          <Tooltip />
          <Line type="monotone" dataKey="Cases" stroke="#4B7BE5" strokeWidth={3} />
          <Line type="monotone" dataKey="Recovered" stroke="#4CAF50" strokeWidth={3} />
          <Line type="monotone" dataKey="Deaths" stroke="#f44336" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
