import React from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { useGeoDataLoader } from "./GeoDataLoader";
import { getColor } from "../../utils/colorUtils"; 
import Loader from "../Loader";

const getCrimeTotal = (departmentName, crimeData) => {
  if (!crimeData?.by_department) return 0;
  for (const entry of crimeData.by_department) {
    const dept = entry.departments.find(
      (d) => d.department.toUpperCase() === departmentName.toUpperCase()
    );
    if (dept) return dept.total;
  }
  return 0;
};

const getCrimeColor = (value, minValue, maxValue) => {
  if (maxValue === minValue) return "#ffeda0";
  const normalized = (value - minValue) / (maxValue - minValue) * 20;
  const intensity = 1 - normalized;
  const r = 250;
  const g = Math.round(150 * intensity);
  const b = Math.round(120 * intensity);
  return `rgb(${r}, ${g}, ${b})`;
};

export default function DepartmentMap({ onSelect, crimeData = null }) {
  const { features, loading, error } = useGeoDataLoader("http://localhost:5000/api/departments");

  if (loading) return <Loader />;
  if (error) return <p>Error loading departments</p>;

  const hasCrimeData = crimeData?.by_department?.length > 0;

  const allTotals = hasCrimeData
    ? crimeData.by_department.flatMap((entry) =>
        entry.departments.map((d) => d.total)
      )
    : [];
  const minCrime = hasCrimeData ? Math.min(...allTotals) : null;
  const maxCrime = hasCrimeData ? Math.max(...allTotals) : null;

  return (
    <MapContainer
      center={[4.5709, -74.2973]}
      zoom={5.5}
      style={{ height: "100vh", width: "100%" }}
      zoomControl={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      dragging={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {features.map((f, idx) => {
        const departmentName = f.properties.DPTO_CNMBR;
        if (hasCrimeData) {
          const totalCrimes = getCrimeTotal(departmentName, crimeData);
          return (
            <GeoJSON
              key={idx}
              data={f}
              style={{
                fillColor: getCrimeColor(totalCrimes, minCrime, maxCrime),
                weight: 1,
                color: "#000",
                fillOpacity: 0.8,
              }}
            >
              <Popup>
                <div>
                  <h4>{departmentName}</h4>
                  <p><strong>Total Crimes:</strong> {totalCrimes}</p>
                  <button onClick={() => onSelect(f.properties.DPTO_CCDGO)}>
                    Select Department
                  </button>
                </div>
              </Popup>
            </GeoJSON>
          );
        } else {
          return (
            <GeoJSON
              key={idx}
              data={f}
              style={{
                fillColor: getColor(idx),
                weight: 1,
                color: "#000",
                fillOpacity: 0.6,
              }}
            >
              <Popup>
                <div>
                  <p>{departmentName}</p>
                  <button onClick={() => onSelect(f.properties.DPTO_CCDGO)}>
                    Select Department
                  </button>
                </div>
              </Popup>
            </GeoJSON>
          );
        }
      })}
    </MapContainer>
  );
}
