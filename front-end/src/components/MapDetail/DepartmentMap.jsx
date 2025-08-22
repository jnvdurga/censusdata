import React from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { useGeoDataLoader } from "./GeoDataLoader";
import { getColor } from "../../utils/colorUtils";

export default function DepartmentMap({ onSelect }) {
  const { features, loading, error } = useGeoDataLoader("http://localhost:5000/api/departments");
  

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p>Error loading departments</p>;

  return (
    <MapContainer 
    center={[4.5709, -74.2973]} 
    zoom={6}
    style={{ height: "100vh", width: "100%" }}
    zoomControl={false}       // removes + / - zoom controls
    doubleClickZoom={false}   // disables double-click zoom
    scrollWheelZoom={false}   // disables scroll wheel zoom
    dragging={false}          // disables dragging/pan
    touchZoom={false}          // disables pinch/zoom
    boxZoom={false}           // disables box zoom
    keyboard={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {features.map((f, idx) => (
        <GeoJSON key={idx} data={f} style={{ fillColor: getColor(idx), weight: 1, color: "#000", fillOpacity: 0.6 }}>
          <Popup>
            <div>
              <p>{f.properties.DPTO_CNMBR}</p>
              <button onClick={() => onSelect(f.properties.DPTO_CCDGO)}>Select Department</button>
            </div>
          </Popup>
        </GeoJSON>
      ))}
    </MapContainer>
  );
}
