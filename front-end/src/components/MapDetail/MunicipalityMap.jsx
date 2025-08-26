import React , {useEffect, useState} from "react";
import { MapContainer, TileLayer, GeoJSON, Popup , useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeoDataLoader } from "../MapDetail/GeoDataLoader";
import {CodeDetailedData} from "../../data/data"


function MunicipalityMap({ departmentCode, onSelect, onBack }) { // <-- use onSelect
       const [municipalityName , setMunicipalityName] = useState([])
       console.log(municipalityName)
   
  const { features, loading, error } = useGeoDataLoader(
    departmentCode
      ? `http://localhost:5000/api/municipalities/${departmentCode}`
      : null
  );
 function FindMunicipalityes(){
  const Municipality = CodeDetailedData.map(item=>{
    if(item.code == departmentCode){
      return item.municipalities
    }
   })
   console.log(Municipality)
   setMunicipalityName([...Municipality])
 }


  const handleSelect = (feature) => {
    if (onSelect) {
      onSelect(feature.properties.MPIO_CCDGO);
    }
  };

  const style = () => ({
    fillColor: "#4CAF50",
    weight: 1,
    opacity: 1,
    color: "white",
    fillOpacity: 0.7,
  });
  
  function MapRecenter({ features }) {
  const map = useMap();

  useEffect(() => {
    if (features && features.length > 0) {
      const bounds = L.geoJSON(features).getBounds();
      map.fitBounds(bounds, { padding: [20, 20] });
    }
    
  }, [features, map]);

  return null;
}


  if (!departmentCode) return <p>Please select a department first.</p>;
  if (loading) return <p>Loading municipalities...</p>;
  if (error) return <p>Error loading municipalities.</p>;

  return (
    <div>
      <button onClick={onBack}>Back to Departments</button>
      <MapContainer
        style={{ height: "500px", width: "100%" }}
        zoom={7}
        center={[4.5, -74]}
        zoomControl={false}       // removes + / - zoom controls
        doubleClickZoom={false}   // disables double-click zoom
        scrollWheelZoom={false}   // disables scroll wheel zoom
        dragging={false}          // disables dragging/pan
        touchZoom={false}          // disables pinch/zoom
        boxZoom={false}           // disables box zoom
        keyboard={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapRecenter features={features} />
        {features.map((feature, idx) => (
          <GeoJSON
            key={`${feature.properties.DPTO_CCDGO}-${feature.properties.MPIO_CCDGO}-${idx}`}
            data={feature}
            style={style}
          >
            <Popup>
              <div>
                <strong>{feature.properties.MPIO_CDPMP}</strong>
                <br />
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // stops Leaflet from capturing event
                    handleSelect(feature);
                  }}
                  style={{ marginTop: "5px" }}
                >
                  Select Municipality
                </button>
              </div>
            </Popup>
          </GeoJSON>
        ))}
      </MapContainer>
    </div>
  );
}

export default MunicipalityMap;
