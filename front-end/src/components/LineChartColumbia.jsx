// src/components/LineChartColumbia.js
import React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
import { StyledEngineProvider } from '@mui/material/styles';
import "../style/LineChartColumbia.scss"
import { useContext } from 'react';
import { CrimeContext } from '../contexts/CrimeContex';
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


const LineChartColumbia = () => {
    

   const departmentData = crimeDatapro.by_department.map((d) => ({
    department: d.department,
    crimes: d.total,
  }));
  const yearData = Object.entries(crimeDatapro.by_year).map(([year,value])=>({
      year,
      crime: value
  }))
  const monethData = Object.entries(crimeDatapro.by_month).map(([month,value])=>({
      month,
      crime: value
  }))

  const {crimeData, loading, error} = useContext(CrimeContext);
  console.log("Crime Data from Context:", crimeData);

  return (
    
    <div className="line-chart-container">
      <h2>Columbia Statistics Over Time</h2>
      <ResponsiveContainer width={"100%"} height={400}>
         <BarChart data={yearData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="crime" fill="#8884e8" />
         </BarChart>  
         
      </ResponsiveContainer>
      
      <ResponsiveContainer width={"100%"} height={400}>
         <BarChart data={monethData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="crime" fill="#82ca9d" />
         </BarChart>  
         
      </ResponsiveContainer>
      
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
  );
};

export default LineChartColumbia;
