import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import JSONStream from "JSONStream";
import Database from 'better-sqlite3';
import gdal from "gdal-async";

// ------------------ Fix __dirname in ES module ------------------ //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());




// ------------------ Preload GeoJSON Files ------------------ //
const departmentFile = path.join(__dirname, "Department.geojson");
const municipalityFile = path.join(__dirname, "Municipality.geojson");
const classFile = path.join(__dirname, "Class.geojson");

let departmentData, municipalityData, classData, ruralSectorDb;

const preloadGeoJSON = async () => {
  try {
    // Load GeoJSON files
    departmentData = JSON.parse(await fs.promises.readFile(departmentFile, "utf8"));
    municipalityData = JSON.parse(await fs.promises.readFile(municipalityFile, "utf8"));
    classData = JSON.parse(await fs.promises.readFile(classFile, "utf8"));
    
    // Open GeoPackage as DGAL dataset
     ruralSectorDb = gdal.open(path.join(__dirname, "./my_data.gpkg"));

  
  } catch (err) {
    console.error("❌ Failed to preload files:", err);
  }
};


preloadGeoJSON();

// ------------------ Endpoints ------------------ //

// 1. Departments
app.get("/api/departments", (req, res) => {
  res.json(departmentData);
});

// 2. Municipalities by department
app.get("/api/municipalities/:departmentCode", (req, res) => {
  const { departmentCode } = req.params;
  const filtered = municipalityData.features.filter(
    (f) => f.properties.DPTO_CCDGO === departmentCode
  );
  res.json({ type: "FeatureCollection", features: filtered });
});

// 3. Classes by department + municipality
app.get("/api/classes/:departmentCode/:municipalityCode", (req, res) => {
  const { departmentCode, municipalityCode } = req.params;
  const filtered = classData.features.filter(
    (f) =>
      f.properties.DPTO_CCDGO === departmentCode &&
      f.properties.MPIO_CCDGO === municipalityCode
  );
  res.json({ type: "FeatureCollection", features: filtered });
});

// 4. Sectors by department + municipality + class
    app.get("/api/rural-sector/:departmentCode/:municipalityCode/:classCode", (req, res) => {
  const { departmentCode, municipalityCode, classCode } = req.params;

  try {
    const ruralLayer = ruralSectorDb.layers.get("RuralSector");
    const featureCollection = [];

    ruralLayer.features.forEach((feature) => {
      const properties = feature.fields.toObject();
      const geometry = feature.getGeometry();

      // Optional: Filter features based on your params (if needed)
      if (
        properties.DPTO_CCDGO === departmentCode &&
        properties.MPIO_CCDGO === municipalityCode &&
        properties.CLAS_CCDGO === classCode
      ) {
        featureCollection.push({
          type: "Feature",
          properties,
          geometry: JSON.parse(geometry.toJSON()),
        });
      }
    });

    // Construct GeoJSON FeatureCollection object
    const geoJson = {
      type: "FeatureCollection",
      features: featureCollection,
    };

    // Send GeoJSON response
    res.json(geoJson);

  } catch (error) {
    console.error("Error retrieving features:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

      // Other endpoints remain the same
app.get(
  "/api/rural-area/:departmentCode/:municipalityCode/:classCode/:sectorCode",
  (req, res) => {
    const { departmentCode, municipalityCode, classCode, sectorCode } =
      req.params;
    const filePath = path.join(__dirname, "RuralArea.geojson");

    res.setHeader("Content-Type", "application/json; charset=utf-8");

    res.write(
      '{"type":"FeatureCollection","name":"RuralArea","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":['
    );

    let isFirst = true;
    const stream = fs
      .createReadStream(filePath)
      .pipe(JSONStream.parse("features.*"));

    stream.on("data", (feature) => {
      const p = feature.properties;
      if (
        p.DPTO_CCDGO === departmentCode &&
        p.MPIO_CCDGO === municipalityCode &&
        p.CLAS_CCDGO === classCode &&
        p.SETR_CCDGO === sectorCode
      ) {
        if (!isFirst) res.write(",");
        isFirst = false;
        res.write(JSON.stringify(feature));
      }
    });

    stream.on("end", () => {
      res.write("]}");
      res.end();
    });

    stream.on("error", (err) => {
      if (!res.headersSent) res.status(500).json({ error: err.message });
    });
  }
);

app.get(
  "/api/zone/:departmentCode/:municipalityCode/:classCode/:sectorCode/:sectionCode",
  (req, res) => {
    const {
      departmentCode,
      municipalityCode,
      classCode,
      sectorCode,
      sectionCode,
    } = req.params;
    const filePath = path.join(__dirname, "Zone.geojson");

    res.setHeader("Content-Type", "application/json; charset=utf-8");

    res.write(
      '{"type":"FeatureCollection","name":"Zone","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":['
    );

    let first = true;
    const stream = fs
      .createReadStream(filePath)
      .pipe(JSONStream.parse("features.*"));

    stream.on("data", (feature) => {
      const p = feature.properties;
      if (
        p.DPTO_CCDGO === departmentCode &&
        p.MPIO_CCDGO === municipalityCode &&
        p.CLAS_CCDGO === classCode &&
        p.SETR_CCDGO === sectorCode &&
        p.SECR_CCDGO === sectionCode
      ) {
        if (!first) res.write(",");
        first = false;
        res.write(JSON.stringify(feature));
      }
    });

    stream.on("end", () => {
      res.write("]}");
      res.end();
    });

    stream.on("error", (err) => {
      if (!res.headersSent) res.status(500).json({ error: err.message });
    });
  }
);

app.get(
  "/api/urban-sector/:departmentCode/:municipalityCode/:classCode/:sectorCode/:sectionCode",
  (req, res) => {
    const {
      departmentCode,
      municipalityCode,
      classCode,
      sectorCode,
      sectionCode,
    } = req.params;
    const filePath = path.join(__dirname, "UrbanSector.geojson");

    res.setHeader("Content-Type", "application/json; charset=utf-8");

    res.write(
      JSON.stringify({
        type: "FeatureCollection",
        name: "UrbanSector",
        crs: {
          type: "name",
          properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
        },
        features: [],
      }).replace("[]", "[")
    );

    let firstFeature = true;

    const stream = fs
      .createReadStream(filePath)
      .pipe(JSONStream.parse("features.*"));

    stream.on("data", (feature) => {
      const props = feature.properties;
      if (
        props.DPTO_CCDGO === departmentCode &&
        props.MPIO_CCDGO === municipalityCode &&
        props.CLAS_CCDGO === classCode &&
        props.SETR_CCDGO === sectorCode &&
        props.SECR_CCDGO === sectionCode
      ) {
        if (!firstFeature) res.write(",");
        firstFeature = false;
        res.write(JSON.stringify(feature));
      }
    });

    stream.on("end", () => {
      res.write("]}");
      res.end();
      console.log("Finished sending filtered urban sectors.");
    });

    stream.on("error", (err) => {
      console.error("Stream error:", err);
      if (!res.headersSent) res.status(500).json({ error: err.message });
    });
  }
);

// ------------------ Start server ------------------ //
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📍 Rural sector endpoint: http://localhost:5000/api/rural-sector/99/773/3`);
  console.log(`🔍 Geometry test: http://localhost:5000/api/debug/geometry-test`);
  console.log(`📊 Table structure: http://localhost:5000/api/debug/table-structure`);
});

process.on('SIGINT', () => {
  if (ruralSectorDb) {
    ruralSectorDb.close();
    console.log('✅ RuralSector database connection closed');
  }
  process.exit(0);
});