// src/components/LineChartColumbia.js
import React, { useContext } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import "../style/LineChartColumbia.scss";
import { CrimeContext } from "../contexts/CrimeContex";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const crimeDatapro = {
  crime_type: "HURTO_PERSONAS",
  gender: "MASCULINO",
  by_year: {
    2010: 39757,
    2011: 43701,
    2012: 52271,
    2013: 58432,
    2014: 57340,
    2015: 60899,
    2016: 86982,
    2017: 120491,
    2018: 144509,
    2019: 172126,
    2020: 125387,
    2021: 167258,
    2022: 207567,
    2023: 226624,
    2024: 81624,
  },
  by_month: {
    1: 146853,
    2: 140926,
    3: 144984,
    4: 134170,
    5: 140691,
    6: 121949,
    7: 127263,
    8: 135231,
    9: 134641,
    10: 141356,
    11: 136405,
    12: 140499,
  },
  by_department: [
    { department_code: 5, department: "ANTIOQUIA", total: 187874 },
    { department_code: 11, department: "BOGOTÁ", total: 223451 },
    { department_code: 15, department: "VALLE DEL CAUCA", total: 165321 },
    { department_code: 20, department: "ATLÁNTICO", total: 112567 },
  ],
};

const DummycrimeData = [
  { year: 2012, male: 800, female: 500, notReported: 200 },
  { year: 2013, male: 950, female: 600, notReported: 250 },
  { year: 2014, male: 1100, female: 700, notReported: 300 },
  { year: 2015, male: 1200, female: 750, notReported: 320 },
  { year: 2016, male: 1300, female: 850, notReported: 350 },
  { year: 2017, male: 1450, female: 950, notReported: 370 },
  { year: 2018, male: 1500, female: 1000, notReported: 380 },
  { year: 2019, male: 1600, female: 1100, notReported: 400 },
  { year: 2020, male: 1700, female: 1200, notReported: 420 },
  { year: 2021, male: 1800, female: 1300, notReported: 440 },
  { year: 2022, male: 1900, female: 1400, notReported: 460 },
  { year: 2023, male: 2000, female: 1500, notReported: 500 },
  { year: 2024, male: 2100, female: 1600, notReported: 550 },
  { year: 2025, male: 2200, female: 1700, notReported: 600 },
];

const crimeDatabyWeapon = [
  {
    year: 2010,
    weapons: [
      { weapon: "blunt_object", value: 7200 },
      { weapon: "cutting_weapon", value: 1100 },
      { weapon: "fire_arm", value: 15000 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 5 },
      { weapon: "not_reported", value: 2800 },
      { weapon: "no_weapon", value: 27000 },
      { weapon: "scopolamine", value: 600 },
      { weapon: "sharp_pointed_weapon", value: 10500 },
      { weapon: "stabbing_weapon", value: 3 },
    ],
  },
  {
    year: 2011,
    weapons: [
      { weapon: "blunt_object", value: 7510 },
      { weapon: "cutting_weapon", value: 1184 },
      { weapon: "fire_arm", value: 15917 },
      { weapon: "master_key", value: 1 },
      { weapon: "mixed_means", value: 4 },
      { weapon: "not_reported", value: 2950 },
      { weapon: "no_weapon", value: 28537 },
      { weapon: "scopolamine", value: 623 },
      { weapon: "sharp_pointed_weapon", value: 11138 },
      { weapon: "stabbing_weapon", value: 2 },
    ],
  },
  {
    year: 2012,
    weapons: [
      { weapon: "blunt_object", value: 6800 },
      { weapon: "cutting_weapon", value: 1100 },
      { weapon: "fire_arm", value: 14000 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 2 },
      { weapon: "not_reported", value: 2600 },
      { weapon: "no_weapon", value: 30000 },
      { weapon: "scopolamine", value: 500 },
      { weapon: "sharp_pointed_weapon", value: 10000 },
      { weapon: "stabbing_weapon", value: 1 },
    ],
  },
  {
    year: 2013,
    weapons: [
      { weapon: "blunt_object", value: 7000 },
      { weapon: "cutting_weapon", value: 1200 },
      { weapon: "fire_arm", value: 15500 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 3 },
      { weapon: "not_reported", value: 2700 },
      { weapon: "no_weapon", value: 31000 },
      { weapon: "scopolamine", value: 580 },
      { weapon: "sharp_pointed_weapon", value: 10200 },
      { weapon: "stabbing_weapon", value: 2 },
    ],
  },
  {
    year: 2014,
    weapons: [
      { weapon: "blunt_object", value: 6800 },
      { weapon: "cutting_weapon", value: 1300 },
      { weapon: "fire_arm", value: 16000 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 2 },
      { weapon: "not_reported", value: 2500 },
      { weapon: "no_weapon", value: 32000 },
      { weapon: "scopolamine", value: 560 },
      { weapon: "sharp_pointed_weapon", value: 11000 },
      { weapon: "stabbing_weapon", value: 2 },
    ],
  },
  {
    year: 2015,
    weapons: [
      { weapon: "blunt_object", value: 7100 },
      { weapon: "cutting_weapon", value: 1350 },
      { weapon: "fire_arm", value: 16500 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 4 },
      { weapon: "not_reported", value: 2400 },
      { weapon: "no_weapon", value: 33000 },
      { weapon: "scopolamine", value: 550 },
      { weapon: "sharp_pointed_weapon", value: 10800 },
      { weapon: "stabbing_weapon", value: 1 },
    ],
  },
  {
    year: 2016,
    weapons: [
      { weapon: "blunt_object", value: 7300 },
      { weapon: "cutting_weapon", value: 1400 },
      { weapon: "fire_arm", value: 17000 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 3 },
      { weapon: "not_reported", value: 2300 },
      { weapon: "no_weapon", value: 33500 },
      { weapon: "scopolamine", value: 520 },
      { weapon: "sharp_pointed_weapon", value: 11500 },
      { weapon: "stabbing_weapon", value: 3 },
    ],
  },
  {
    year: 2017,
    weapons: [
      { weapon: "blunt_object", value: 7400 },
      { weapon: "cutting_weapon", value: 1450 },
      { weapon: "fire_arm", value: 18000 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 3 },
      { weapon: "not_reported", value: 2200 },
      { weapon: "no_weapon", value: 34000 },
      { weapon: "scopolamine", value: 510 },
      { weapon: "sharp_pointed_weapon", value: 11200 },
      { weapon: "stabbing_weapon", value: 2 },
    ],
  },
  {
    year: 2018,
    weapons: [
      { weapon: "blunt_object", value: 7600 },
      { weapon: "cutting_weapon", value: 1500 },
      { weapon: "fire_arm", value: 19000 },
      { weapon: "master_key", value: 1 },
      { weapon: "mixed_means", value: 4 },
      { weapon: "not_reported", value: 2100 },
      { weapon: "no_weapon", value: 34500 },
      { weapon: "scopolamine", value: 490 },
      { weapon: "sharp_pointed_weapon", value: 11800 },
      { weapon: "stabbing_weapon", value: 1 },
    ],
  },
  {
    year: 2019,
    weapons: [
      { weapon: "blunt_object", value: 7700 },
      { weapon: "cutting_weapon", value: 1600 },
      { weapon: "fire_arm", value: 20000 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 3 },
      { weapon: "not_reported", value: 2000 },
      { weapon: "no_weapon", value: 35000 },
      { weapon: "scopolamine", value: 470 },
      { weapon: "sharp_pointed_weapon", value: 12000 },
      { weapon: "stabbing_weapon", value: 3 },
    ],
  },
  {
    year: 2020,
    weapons: [
      { weapon: "blunt_object", value: 7500 },
      { weapon: "cutting_weapon", value: 1650 },
      { weapon: "fire_arm", value: 21000 },
      { weapon: "master_key", value: 1 },
      { weapon: "mixed_means", value: 4 },
      { weapon: "not_reported", value: 1900 },
      { weapon: "no_weapon", value: 35500 },
      { weapon: "scopolamine", value: 460 },
      { weapon: "sharp_pointed_weapon", value: 12200 },
      { weapon: "stabbing_weapon", value: 2 },
    ],
  },
  {
    year: 2021,
    weapons: [
      { weapon: "blunt_object", value: 7400 },
      { weapon: "cutting_weapon", value: 1700 },
      { weapon: "fire_arm", value: 22000 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 3 },
      { weapon: "not_reported", value: 1800 },
      { weapon: "no_weapon", value: 36000 },
      { weapon: "scopolamine", value: 450 },
      { weapon: "sharp_pointed_weapon", value: 12500 },
      { weapon: "stabbing_weapon", value: 2 },
    ],
  },
  {
    year: 2022,
    weapons: [
      { weapon: "blunt_object", value: 7600 },
      { weapon: "cutting_weapon", value: 1800 },
      { weapon: "fire_arm", value: 23000 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 2 },
      { weapon: "not_reported", value: 1700 },
      { weapon: "no_weapon", value: 36500 },
      { weapon: "scopolamine", value: 430 },
      { weapon: "sharp_pointed_weapon", value: 12700 },
      { weapon: "stabbing_weapon", value: 1 },
    ],
  },
  {
    year: 2023,
    weapons: [
      { weapon: "blunt_object", value: 7800 },
      { weapon: "cutting_weapon", value: 1900 },
      { weapon: "fire_arm", value: 24000 },
      { weapon: "master_key", value: 1 },
      { weapon: "mixed_means", value: 3 },
      { weapon: "not_reported", value: 1600 },
      { weapon: "no_weapon", value: 37000 },
      { weapon: "scopolamine", value: 420 },
      { weapon: "sharp_pointed_weapon", value: 13000 },
      { weapon: "stabbing_weapon", value: 2 },
    ],
  },
  {
    year: 2024,
    weapons: [
      { weapon: "blunt_object", value: 7900 },
      { weapon: "cutting_weapon", value: 2000 },
      { weapon: "fire_arm", value: 25000 },
      { weapon: "master_key", value: 0 },
      { weapon: "mixed_means", value: 4 },
      { weapon: "not_reported", value: 1500 },
      { weapon: "no_weapon", value: 37500 },
      { weapon: "scopolamine", value: 410 },
      { weapon: "sharp_pointed_weapon", value: 13300 },
      { weapon: "stabbing_weapon", value: 1 },
    ],
  },
  {
    year: 2025,
    weapons: [
      { weapon: "blunt_object", value: 8000 },
      { weapon: "cutting_weapon", value: 2100 },
      { weapon: "fire_arm", value: 26000 },
      { weapon: "master_key", value: 1 },
      { weapon: "mixed_means", value: 5 },
      { weapon: "not_reported", value: 1400 },
      { weapon: "no_weapon", value: 38000 },
      { weapon: "scopolamine", value: 400 },
      { weapon: "sharp_pointed_weapon", value: 13500 },
      { weapon: "stabbing_weapon", value: 2 },
    ],
  },
];


const LineChartColumbia = () => {
  const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#7f7f7f"];
  const topN = 4; // 🔹 FIX: define topN explicitly

  // 1) Compute global totals for each weapon
  const totals = {};
  crimeDatabyWeapon.forEach(({ weapons }) => {
    weapons.forEach(({ weapon, value }) => {
      totals[weapon] = (totals[weapon] || 0) + (value || 0);
    });
  });

  // 2) Find top 4 weapons
  const topWeapons = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([weapon]) => weapon);

  // 3) Build chart data
  const chartData = crimeDatabyWeapon.map(({ year, weapons }) => {
    const row = { year };
    topWeapons.forEach((w) => (row[w] = 0));
    let otherSum = 0;

    weapons.forEach(({ weapon, value = 0 }) => {
      if (topWeapons.includes(weapon)) {
        row[weapon] += value;
      } else {
        otherSum += value;
      }
    });

    row["Other Weapons"] = otherSum;
    return row;
  });

  // 📊 Department/Year/Month Data
  const departmentData = crimeDatapro.by_department.map((d) => ({
    department: d.department,
    crimes: d.total,
  }));

  const yearData = Object.entries(crimeDatapro.by_year).map(
    ([year, value]) => ({ year, crime: value })
  );

  const monthData = Object.entries(crimeDatapro.by_month).map(
    ([month, value]) => ({ month, crime: value })
  );

  const { crimeData, loading, error } = useContext(CrimeContext);
  console.log("Crime Data from Context:", crimeData);

  return (
    <>
      {/* Yearly Crime Stats */}
      <div className="line-chart-container">
        <h2>Columbia Crime Statistics Over Years</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={yearData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="crime" fill="#8884e8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Crime Stats */}
      <div className="line-chart-container">
        <h2>Columbia Crime Statistics Over Months</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={monthData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="crime" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Department Crime Stats */}
      <div className="line-chart-container">
        <h2>Columbia Crime Statistics by Department</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={departmentData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="department" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="crimes" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gender-based Stacked Bar */}
      <div className="line-chart-container">
        <h2>Crime by Gender (Stacked)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={DummycrimeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barGap={0}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="male" stackId="a" fill="#4e79a7" name="Male Crimes" />
            <Bar
              dataKey="female"
              stackId="a"
              fill="#f28e2c"
              name="Female Crimes"
            />
            <Bar
              dataKey="notReported"
              stackId="a"
              fill="#e15759"
              name="Not Reported"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Weapon-based Stacked Bar */}
      <div className="line-chart-container">
        <h2>Top 4 Weapons + Other (Per Year)</h2>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            barSize={40}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {topWeapons.concat("Other Weapons").map((weapon, idx) => (
              <Bar
                key={weapon}
                dataKey={weapon}
                fill={COLORS[idx % COLORS.length]}
                stackId="a"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default LineChartColumbia;
