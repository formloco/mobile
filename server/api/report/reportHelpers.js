const fs = require('fs').promises
const path = require('path')

const vehicleInspectionPDF = require('./vehicleInspection')
const meaningfulSiteTourPDF = require('./meaningfulSiteTour')
const spotCheckSafetyPDF = require('./spotCheckSafety')
const worksiteSafetyInspectionPDF = require('./worksiteSafetyInspection')

const buildPDFReport = function buildPDFReport(docID, path, reportData, comments, pics, signDate) {

  if (docID == 'vehicle-inspection') {
    vehicleInspectionPDF(path, reportData, comments, pics, signDate), (err) => {
      if (err) return err
    }
  }

  if (docID == 'worksite-safety-inspection') {
    worksiteSafetyInspectionPDF(path, reportData, comments, pics, signDate), (err) => {
      if (err) return err
    }
  }

  if (docID == 'spot-check-safety') {
    spotCheckSafetyPDF(path, reportData, comments, pics, signDate), (err) => {
      if (err) return err
    }
  }

  if (docID == 'meaningful-site-tour') {
    meaningfulSiteTourPDF(path, reportData, comments, pics, signDate), (err) => {
      if (err) return err
    }
  }

}

const escapeSingleQuote = async function escapeSingleQuote(dataObj) {
  let messages = []
  for (let j = 0; j < dataObj["notification"]["comment"].length; j++) {
    let str = JSON.stringify(dataObj["notification"]["comment"][j])
    str = str.replace(/{/g, '')
    str = str.replace(/}/g, '')
    str = str.replace(/"/g, '')
    str = str.replace(/:/g, ': ')
    str = str.split(",").join("\n")
    messages.push(str)
  }
  return messages
}

const deletePdf = async function deletePdf(file) {
  await fs.unlink(file)
}

const readDir = async function readDir(dir) {
  let pics = []
  let allFiles = []
  const files = (await fs.readdir(dir)).map(f => path.join(dir, f))
  allFiles.push(...files)
  await Promise.all(files.map(async f => (
    (await stat(f)).isDirectory() && rreaddir(f, allFiles)
  )))
  for (const file of allFiles) {
    const contents = await fs.readFile(path + file, { encoding: 'base64' })
    pics.push({ image: 'data:image/jpeg;base64,' + contents, width: 500 })
  }
  return pics
}

module.exports = { buildPDFReport, escapeSingleQuote, deletePdf, readDir }