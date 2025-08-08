import React, { useState } from 'react';
import '../style/Crimepage.scss';
import ColumbiaMap from '../components/ColombiaMap';
import LineChart from '../components/LineChartColumbia';
import Dropdowns from '../components/Dropdown';

function CrimePage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [active, setActive] = useState('Fundamental');

  // ✅ Import context values

  // Handle dropdown filters
  const handleFilterApply = (filters) => {
    console.log('Applying filters to API:', filters);
    fetchCrimeData(filters); // ✅ call API with filters
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div>
      {/* Toggle Button */}
      <div className="toggle-container">
        <div className="switch">
          <button
            className={active === 'Fundamental' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setActive('Fundamental')}
          >
            Fundamental
          </button>
          <button
            className={active === 'Primary' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setActive('Primary')}
          >
            Primary
          </button>
          <div className={`slider ${active === 'Primary' ? 'right' : 'left'}`}></div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-section">
        <Dropdowns onFilterApply={handleFilterApply} />
      </div>

      {/* Map and Chart */}
      <div className="chart-container">
        <div className="map">
          <ColumbiaMap filter={selectedFilter} />
        </div>
        <div className="chart">
          <LineChart filter={selectedFilter} />
        </div>
      </div>

      {/* Render fetched crime data for now */}
      {/* <div className="results-section">
        {loading && <p>Loading crime data...</p>}
        {error && <p className="error">Error: {error}</p>}
        {crimeData && (
          <div className="crime-data-output">
            <h3>Fetched Crime Data:</h3>
            <pre>{JSON.stringify(crimeData, null, 2)}</pre>
          </div>
        )}
      </div> */}
    </div> 
  );
}

export default CrimePage;
