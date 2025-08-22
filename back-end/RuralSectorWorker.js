// RuralSectorWorker.js
import { parentPort, workerData } from "node:worker_threads";
import fs from "fs";
import JSONStream from "JSONStream";

const {
  filePath,
  departmentCode = null,
  municipalityCode = null,
  classCode = null,
  sectorCode = null, // 🔹 allow filtering by sector too
} = workerData;

try {
  const stream = fs
    .createReadStream(filePath, { encoding: "utf8" })
    .pipe(JSONStream.parse("features.*"));

  stream.on("data", (feature) => {
    try {
      if (!feature || typeof feature !== "object") return;
      const props = feature.properties || {};

      const matchesDepartment = !departmentCode || String(props.DPTO_CCDGO) === String(departmentCode);
      const matchesMunicipality = !municipalityCode || String(props.MPIO_CCDGO) === String(municipalityCode);
      const matchesClass = !classCode || String(props.CLAS_CCDGO) === String(classCode);
      const matchesSector = !sectorCode || String(props.SETR_CCDGO) === String(sectorCode);

      if (matchesDepartment && matchesMunicipality && matchesClass && matchesSector) {
        parentPort.postMessage({ type: "feature", feature });
      }
    } catch (err) {
      parentPort.postMessage({ type: "error", error: `Processing error: ${err.message}` });
    }
  });

  stream.on("end", () => {
    parentPort.postMessage({ type: "end" });
  });

  stream.on("error", (err) => {
    parentPort.postMessage({ type: "error", error: `Stream error: ${err.message}` });
  });
} catch (err) {
  parentPort.postMessage({ type: "error", error: `Worker init error: ${err.message}` });
}
