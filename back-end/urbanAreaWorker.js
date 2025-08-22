// urbanAreaWorker.js
import { parentPort, workerData } from "node:worker_threads";
import fs from "fs";
import JSONStream from "JSONStream";

const {
  filePath,
  departmentCode,
  municipalityCode,
  classCode,
  sectorCode,    // optional: SETU_CCDGO
  sectionCode,   // optional: SECU_CCDGO
} = workerData || {};

if (!filePath) {
  parentPort.postMessage({ error: "Missing filePath in workerData" });
} else {
  const filtered = [];

  try {
    const stream = fs
      .createReadStream(filePath, { encoding: "utf8" })
      .pipe(JSONStream.parse("features.*"));

    stream.on("data", (feature) => {
      try {
        const p = feature && feature.properties ? feature.properties : {};

        // Basic three-level filter (department -> municipality -> class)
        let ok =
          String(p.DPTO_CCDGO) === String(departmentCode) &&
          String(p.MPIO_CCDGO) === String(municipalityCode) &&
          String(p.CLAS_CCDGO) === String(classCode);

        // Optional deeper filters
        if (ok && sectorCode) {
          ok = String(p.SETU_CCDGO) === String(sectorCode) || String(p.SETU_CCDGO||"") === String(sectorCode);
        }
        if (ok && sectionCode) {
          ok = String(p.SECU_CCDGO) === String(sectionCode) || String(p.SECU_CCDGO||"") === String(sectionCode);
        }

        if (ok) filtered.push(feature);
      } catch (innerErr) {
        // ignore feature-level parse issues, but log if needed
        // console.error("feature parse error:", innerErr);
      }
    });

    stream.on("end", () => {
      parentPort.postMessage(filtered);
    });

    stream.on("error", (err) => {
      parentPort.postMessage({ error: err.message || String(err) });
    });
  } catch (err) {
    parentPort.postMessage({ error: err.message || String(err) });
  }
}
