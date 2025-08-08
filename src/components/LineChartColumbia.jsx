// src/components/LineChartColumbia.js
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "../style/LineChartColumbia.scss"
const data = [
  { year: '2015', population: 48, crimes: 30, density: 35 },
  { year: '2016', population: 49, crimes: 28, density: 36 },
  { year: '2017', population: 50, crimes: 34, density: 37 },
  { year: '2018', population: 51, crimes: 32, density: 38 },
  { year: '2019', population: 52, crimes: 30, density: 38.5 },
  { year: '2020', population: 53, crimes: 33, density: 39 },
  { year: '2021', population: 54, crimes: 29, density: 40 },
  { year: '2022', population: 55, crimes: 27, density: 41 },
];

const LineChartColumbia = () => {
  return (
    <div className="line-chart-container">
      <h2>Columbia Statistics Over Time</h2>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 30, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="population" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="crimes" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="density" stroke="#ff7300" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartColumbia;
