import { parentPort, workerData } from "node:worker_threads";
import fs from "fs";
import JSONStream from "JSONStream";

const { filePath, departmentCode, municipalityCode, classCode } = workerData;
const filteredFeatures = [];

const stream = fs
  .createReadStream(filePath, { encoding: "utf8" })
  .pipe(JSONStream.parse("features.*"));

stream.on("data", feature => {
  const props = feature.properties;
  if (
    props.DPTO_CCDGO === departmentCode &&
    props.MPIO_CCDGO === municipalityCode &&
    props.CLAS_CCDGO === classCode
  ) {
    filteredFeatures.push(feature);
  }
});

stream.on("end", () => {
  parentPort.postMessage(filteredFeatures);
});

stream.on("error", err => {
  parentPort.postMessage({ error: err.message });
});
