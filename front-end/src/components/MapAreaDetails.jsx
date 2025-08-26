import React ,{useState} from 'react';
import ColombiaMap from './ColombiaMap';
import LineChartColumbia from './LineChartColumbia';
import { Drawer, List, ListItem, ListItemText, Divider, Button, Typography } from "@mui/material";
import '../style/MapAreaDetails.scss';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


const fundamentalIndicators = [
  "Area in km²",
  "Total population",
  "Number of Males",
  "Number of Females",
  "Population 0-14",
  "Population 15-64",
  "Population 65+",
  "Urban Population",
  "Literate Population Aged 15+",
  "School Attendance",
  "Enrollment in Education Level",
  "Population of Official Age Group for education",
  "Unemployed Population",
  "Labor Force",
  "Employed Population",
  "Working-Age Population",
  "Total number of dwellings",
  "Number of dwellings by Tenure Status",
  "Households with Improved Water Source",
  "Households with Improved Sanitation",
  "Households with Electricity",
  "Households with Internet",
  "Total number of households",
  "Population of Specific Ethnic Group",
  "Number of Live Births",
  "Number of Women of Reproductive Age",
  "Number of Infant Deaths",
  "Number of Immigrants",
  "Number of Emigrants",
];

const primaryIndicators = [
  "Population Density",
  "Average Household Size",
  "Sex Ratio",
  "Age Dependency Ratio",
  "Urbanization Rate",
  "Ethnic Composition",
  "Fertility Rate",
  "Infant Mortality Rate",
  "Life Expectancy at Birth",
  "Migration Rate",
  "Literacy Rate",
  "Gross Enrollment Ratio",
  "Unemployment Rate",
  "Employment-to-Population Ratio",
  "Housing Tenure Status",
  "Females as Head of Household",
  "Access to Improved Water Source",
  "Access to Improved Sanitation Facilities",
  "Electricity Access Rate",
  "Internet Access Rate",
];


function MapAreaDetails() {
  const [openFundamental, setOpenFundamental] = useState(false);
  const [openPrimary, setOpenPrimary] = useState(false);

  const toggleFundamental = () => setOpenFundamental((prev) => !prev);
  const togglePrimary = () => setOpenPrimary((prev) => !prev);

    const renderIndicatorList = (items) => (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} divider>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
  return (
    <div className="map-area-details">
      <div className="sidebar">
       <Button variant="contained" onClick={toggleFundamental}>Fundamental Indicators</Button>
      <Drawer anchor="left" open={openFundamental} onClose={toggleFundamental}>
        <div style={{ width: 300, padding: 16, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={toggleFundamental} aria-label="close drawer">
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="h6" gutterBottom>Fundamental Indicators</Typography>
          {renderIndicatorList(fundamentalIndicators)}
        </div>
      </Drawer>

      <Button variant="contained" onClick={togglePrimary}>Primary Indicators</Button>
      <Drawer anchor="left" open={openPrimary} onClose={togglePrimary}>
        <div style={{ width: 300, padding: 16, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={togglePrimary} aria-label="close drawer">
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="h6" gutterBottom>Primary Indicators</Typography>
          {renderIndicatorList(primaryIndicators)}
        </div>
      </Drawer>

    
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
