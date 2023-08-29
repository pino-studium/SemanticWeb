import DataUploader from "./DataUploader";
async function upload() {
    const dataUploader = new DataUploader();
    dataUploader.runAll();
}
upload();