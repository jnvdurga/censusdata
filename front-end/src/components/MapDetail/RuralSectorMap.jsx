import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useGeoDataLoader } from "../MapDetail/GeoDataLoader";
import { getColor } from "../../utils/colorUtils";
import L from "leaflet";

export default function RuralSectorMap({
  departmentCode,
  municipalityCode,
  classCode,
  onSelect,
}) {
  const { features, loading, error } = useGeoDataLoader(
    departmentCode && municipalityCode && classCode
      ? `http://localhost:5000/api/rural-sector/${departmentCode}/${municipalityCode}/${classCode}`
      : null
  );

  const geoJsonRef = useRef();

  function MapRecenter({ features }) {
    const map = useMap();
    useEffect(() => {
      if (features.length > 0) {
        const bounds = L.geoJSON({ type: "FeatureCollection", features }).getBounds();
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }, [features, map]);
    return null;
  }

  if (!departmentCode || !municipalityCode || !classCode)
    return <p>Please select all levels first.</p>;
  if (loading) return <p>Loading rural sectors...</p>;
  if (error) return <p>Error loading rural sectors</p>;
  if (features.length === 0) return <p>No rural sectors found.</p>;

  const geoJsonStyle = (feature) => {
    const idx = features.indexOf(feature);
    return {
      fillColor: getColor(idx),
      weight: 1,
      color: "#000",
      fillOpacity: 0.6,
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.bindPopup(`Sector: ${feature.properties.SETR_CCDGO || "Unknown"}`);

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 3,
          color: "#666",
          fillOpacity: 0.9,
        });
        e.target.bringToFront();
      },
      mouseout: (e) => {
        geoJsonRef.current.resetStyle(e.target);
      },
      click: (e) => {
        if (onSelect) onSelect(feature.properties.SETR_CCDGO || null);
        e.target.bringToFront();
      },
    });
  };

  return (
    <MapContainer
      center={[4.5709, -74.2973]}
      zoom={12}
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
      <MapRecenter features={features} />
      <GeoJSON
        ref={geoJsonRef}
        data={{ type: "FeatureCollection", features }}
        style={geoJsonStyle}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
}
