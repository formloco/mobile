const vehicleInspectionPDF = require('./vehicleInspection')
const meaningfulSiteTourPDF = require('./meaningfulSiteTour')
const spotCheckSafetyPDF = require('./spotCheckSafety')
const worksiteSafetyInspectionPDF = require('./worksiteSafetyInspection')

module.exports = function buildPDFReport(docID, path, reportData, comments, pics, signDate) {

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
    console.log('got here')
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

