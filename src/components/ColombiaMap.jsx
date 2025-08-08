import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../style/ColombiaMap.scss';

const ColombiaMap = () => {
  const colombiaCenter = [4.5709, -74.2973]; // Latitude and Longitude of Colombia

  return (
    <div className="colombia-map-container">
      <h2 className="map-title">Colombia Map</h2>
      <MapContainer
        center={colombiaCenter}
        zoom={6}
        scrollWheelZoom={false}
        className="leaflet-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={colombiaCenter}>
          <Popup>
            Colombia: The land of diversity 🌎
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ColombiaMap;
