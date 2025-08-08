import React from 'react';
import ColombiaMap from './ColombiaMap';
import LineChartColumbia from './LineChartColumbia';
import '../style/MapAreaDetails.scss';

function MapAreaDetails() {
  return (
    <div className="map-area-details">
      <div className="sidebar">
        <h2 className="section-title">Area Details</h2>
        <button className="btn">Fundamental</button>
        <button className="btn">Primary</button>
        <button className="btn">Social</button>
      </div>

      <div className="content" >
        <div className="map-container">
          <ColombiaMap />
          <h3 className="chart-title">Colombia Map</h3>
        </div>

        <div className="chart-container">
          <LineChartColumbia />
          <h3 className="chart-title">Population & Crime Trends</h3>
        </div>
      </div>
    </div>
  );
}

export default MapAreaDetails;
