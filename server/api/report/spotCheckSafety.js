const moment = require('moment')
const { Pool } = require('pg')

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
}

const PdfPrinter = require('pdfmake')
const printer = new PdfPrinter(fonts)
const fs = require('fs')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.TENANT,
  password: process.env.PASSWORD,
  port: process.env.PORT
})

async function spotCheckSafetyPDF(formID, pdfPath, docID, pics, signDate, comments) {

  let dateSigned = 'To be determined'
  if (signDate !== null) dateSigned = signDate

  let messages = []
  if (comments !== null) {
    for (let j = 0; j < comments.length; j++) {
      let str = JSON.stringify(comments[j])
      str = str.replace(/{/g, '')
      str = str.replace(/}/g, '')
      str = str.replace(/"/g, '')
      str = str.replace(/:/g, ': ')
      str = str.split(",").join("\n")
      messages.push(str)
    }
  }

  let images = []
  for (let j = 0; j < pics.length; j++) {
    images.push({ image: pics[j], width: 500 })
  }

  let client = await pool.connect()

  let formData = await client.query(`SELECT * FROM "` + formID + `" WHERE id = $1`, [docID])

  let header = formData.rows[0]["data"]["header"]
  let hazard = formData.rows[0]["data"]["hazard"]
  let rules = formData.rows[0]["data"]["rules"]
  let incident = formData.rows[0]["data"]["incident"]
  let communication = formData.rows[0]["data"]["communication"]
  let personalEquipment = formData.rows[0]["data"]["personalEquipment"]
  let safetyEquipment = formData.rows[0]["data"]["safetyEquipment"]
  let correctiveAction = formData.rows[0]["data"]["correctiveAction"]
  console.log(correctiveAction)
  const data = []
  const formObj = Object.assign(hazard, rules, incident, communication, personalEquipment, safetyEquipment, correctiveAction);

  const allFormData = Object.keys(formObj).map((key) => [key, formObj[key]]);
  
  allFormData.forEach(haz => {
    if (haz[1]) {
      data.push(haz[0]+'U', '√')
      data.push(haz[0]+'NA', '')
      data.push(haz[0]+'S', '')
    }
    else if (haz[1] === false) {
      data.push(haz[0]+'S', '√')
      data.push(haz[0]+'NA', '')
      data.push(haz[0]+'U', '')
    }
    else if (!haz[1] === 'na') {
      data.push(haz[0]+'S', '')
      data.push(haz[0]+'NA', '√')
      data.push(haz[0]+'U', '')
    }
    else {
      data.push(haz[0]+'S', '')
      data.push(haz[0]+'NA', '')
      data.push(haz[0]+'U', '')
    }
  })
// console.log(data)

  const docDefinition = {
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            image: 'images/logo.png'
          },
          {
            text: 'Spot Check Safety', style: 'header'
          }
        ]
      },
      '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Company name: ' + header.CompanyName
          },
          {
            text: 'Date: ' + header.Date.slice(0, 10)
          }
        ]
      },
      '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Employee/Consultant name: ' + header.Worker
          },
          {
            text: 'Location: ' + header.Location
          }
        ]
      },
      '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Evaluator: ' + header.Supervisor
          }
        ]
      },
      '\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 'auto'],
          body: [
            ['WORKSITE SAFETY MANAGEMENT REVIEW', 'Not Applicable (/N/A) Unsatisfactory (U) Satisfactory (S)']
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text: 'Hazard Identification and Control', style: 'tableHeader'}, {text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['Are equipment and vehicles inspected, and at what frequency? (Examples and documentation)', {text: data.InspectionFrequencyNA, alignment: 'center'}, {text: data.InspectionFrequencyU, alignment: 'center'}, {text: data.InspectionFrequencyS, alignment: 'center'}],
            ['Are there written emergency plans available and communicated to personnel on the work site?', {text: data.HazardAssessmentSystemNA, alignment: 'center'}, {text: data.HazardAssessmentSystemU, alignment: 'center'}, {text: data.HazardAssessmentSystemS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ data.HazardComments}]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text:'Rules and Work Procedure', style: 'tableHeader'}, {text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['Are there procedures for high risk or critical work? Are they available and used?', {text: data.ProceduresNA, alignment: 'center'}, {text: data.ProceduresU, alignment: 'center'}, {text: data.ProceduresS, alignment: 'center'}],
            ['Are there written emergency plans available and communicated to personnel on the work site?', {text: data.EmergencyPlanNA, alignment: 'center'}, {text: data.EmergencyPlanU, alignment: 'center'}, {text: data.EmergencyPlanS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ data.RulesComments}]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text:'Incident Reporting', style: 'tableHeader'}, {text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['Is there an Incident reporting process in place? (Briefly explain)', {text: data.IncidentReportingNA, alignment: 'center'}, {text: data.IncidentReportingU, alignment: 'center'}, {text: data.IncidentReportingS, alignment: 'center'}],
            ['Is there a near miss/incident reporting form which includes follow-up?', {text: data.NearMissReportingNA, alignment: 'center'}, {text: data.NearMissReportingU, alignment: 'center'}, {text: data.NearMissReportingS, alignment: 'center'}],
            ['Are incidents reported and was the problem fixed the last time there was a near miss or incident?', {text: data.ProblemFixedNA, alignment: 'center'},{text: data.ProblemFixedU, alignment: 'center'},{text: data.ProblemFixedS, alignment: 'center'}],
            ['Are management and workers involved in solving the issues?', {text: data.SolvingIssuesNA, alignment: 'center'}, {text: data.SolvingIssuesU, alignment: 'center'}, {text: data.SolvingIssuesS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ data.IncidentComments}]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text:'Communication/Training', style: 'tableHeader'}, {text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['Have you received a safety orientation (When and what)', {text: data.SafetyOrientationNA, alignment: 'center'}, {text: data.SafetyOrientationU, alignment: 'center'}, {text: data.SafetyOrientationS, alignment: 'center'}],
            ['How often are safety meetings held (Show examples and documentation)', {text: data.SafetyMeetingFrequencyNA, alignment: 'center'}, {text: data.SafetyMeetingFrequencyU, alignment: 'center'}, {text: data.SafetyMeetingFrequencyS, alignment: 'center'}],
            ['Is the appropriate training in place', {text: data.AppropriateTrainingNA, alignment: 'center'}, {text: data.AppropriateTrainingU, alignment: 'center'}, {text: data.AppropriateTrainingS, alignment: 'center'}],
            ['First aid training', {text: data.FirstAidTrainingNA, alignment: 'center'}, {text: data.FirstAidTrainingU, alignment: 'center'}, {text: data.FirstAidTrainingS, alignment: 'center'}],
            ['H2S training', {text: data.H2STrainingNA, alignment: 'center'}, {text: data.H2STrainingU, alignment: 'center'}, {text: data.H2STrainingS, alignment: 'center'}],
            ['WHMIS training', {text: data.WHMISTrainingNA, alignment: 'center'}, {text: data.WHMISTrainingU, alignment: 'center'}, {text: data.WHMISTrainingS, alignment: 'center'}],
            ['TDG training', {text: data.TDGTrainingNA, alignment: 'center'}, {text: data.TDGTrainingU, alignment: 'center'}, {text: data.TDGTrainingS, alignment: 'center'}],
            ['Ground disturbance training ', {text: data.GroundDisturbanceTrainingNA, alignment: 'center'}, {text: data.GroundDisturbanceTrainingU, alignment: 'center'}, {text: data.GroundDisturbanceTrainingS, alignment: 'center'}],
            ['eGSO/ CSO training', {text: data.EGSOCSOTrainingNA, alignment: 'center'}, {text: data.EGSOCSOTrainingU, alignment: 'center'}, {text: data.EGSOCSOTrainingS, alignment: 'center'},],
            ['Job Specific training (List any that apply)', {text: data.JobSpecificTrainingNA, alignment: 'center'}, {text: data.JobSpecificTrainingU, alignment: 'center'}, {text: data.JobSpecificTrainingS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ data.CommunicationComments}]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text:'Is the appropriate PPE available and being used', style: 'tableHeader'}, {text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['appropriate PPE available', {text: data.PPEAvailableNA, alignment: 'center'}, {text: data.PPEAvailableU, alignment: 'center'}, {text: data.PPEAvailableS, alignment: 'center'}],
            ['Hard Hat', {text: data.HardHatNA, alignment: 'center'}, {text: data.HardHatU, alignment: 'center'}, {text: data.HardHatS, alignment: 'center'}],
            ['Safety Glasses', {text: data.SafetyGlassesNA, alignment: 'center'}, {text: data.SafetyGlassesU, alignment: 'center'}, {text: data.SafetyGlassesS, alignment: 'center'}],
            ['Footwear', {text: data.FootwearNA, alignment: 'center'}, {text: data.FootwearU, alignment: 'center'}, {text: data.FootwearS, alignment: 'center'}],
            ['Protective clothing (FR coveralls, gloves, etc)', {text: data.ProtectiveClothingNA, alignment: 'center'}, {text: data.ProtectiveClothingU, alignment: 'center'}, {text: data.ProtectiveClothingS, alignment: 'center'}],
            ['Hearing protection', {text: data.HearingProtectionNA, alignment: 'center'}, {text: data.HearingProtectionU, alignment: 'center'}, {text: data.HearingProtectionS, alignment: 'center'}],
            ['Respiratory protection (Appropriate for the hazard)', {text: data.RespiratoryProtectionNA, alignment: 'center'}, {text: data.RespiratoryProtectionU, alignment: 'center'}, {text: data.RespiratoryProtectionS, alignment: 'center'}],
            ['Personal gas monitor', {text: data.PersonalGasMonitorNA, alignment: 'center'}, {text: data.PersonalGasMonitorU, alignment: 'center'}, {text: data.PersonalGasMonitorS, alignment: 'center'}],
            ['Communication equipment', {text: data.CommunicationEquipmentNA, alignment: 'center'}, {text: data.CommunicationEquipmentU, alignment: 'center'}, {text: data.CommunicationEquipmentS, alignment: 'center'}],
            ['Job Specific training (Other equipment (please specify)', {text: data.OtherEquipmentNA, alignment: 'center'}, {text: data.OtherEquipmentU, alignment: 'center'}, {text: data.OtherEquipmentS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ data.PersonalEquipmentComments}]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text:'Safety Equipment ', style: 'tableHeader'},{text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['Is the appropriate safety equipment available and being used', {text: data.SafetyEquipmentAvailableNA, alignment: 'center'}, {text: data.SafetyEquipmentAvailableU, alignment: 'center'}, {text: data.SafetyEquipmentAvailableS, alignment: 'center'}],
            ['Fire Fighting equipment (inspected, tagged, accessible, good condition)', {text: data.FireFightingEquipmentNA, alignment: 'center'}, {text: data.FireFightingEquipmentU, alignment: 'center'}, {text: data.FireFightingEquipmentS, alignment: 'center'}],
            ['Rotating equipment guards', {text: data.RotatingEquimentGuardsNA, alignment: 'center'}, {text: data.RotatingEquimentGuardsU, alignment: 'center'}, {text: data.RotatingEquimentGuardsS, alignment: 'center'}],
            ['First aid kit', {text: data.FirstAidKitNA, alignment: 'center'}, {text: data.FirstAidKitU, alignment: 'center'}, {text: data.FirstAidKitS, alignment: 'center'}],
            ['Fall Arrest equipment (Ladders, steps, harness, lanyards, etc.)', {text: data.FallArrestEquipmentNA, alignment: 'center'}, {text: data.FallArrestEquipmentU, alignment: 'center'}, {text: data.FallArrestEquipmentS, alignment: 'center'}],
            ['Emergency Shut down and Alarm Systems (positive air shutoffs, backup alarms, etc.)', {text: data.EmergencySystemsNA, alignment: 'center'}, {text: data.EmergencySystemsU, alignment: 'center'}, {text: data.EmergencySystemsS, alignment: 'center'}],
            ['Other (Specify) ', {text: data.OtherNA, alignment: 'center'}, {text: data.OtherU, alignment: 'center'}, {text: data.OtherS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ data.SafetyEquipmentComments}]
          ]
        }
      },
      // '\n\n',
      // {
      //   style: 'tableExample',
      //   table: {
      //     widths: ['*', '*', '*', 25, 25],
      //     body: data.correctiveAction
      //   }
      // },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Conducted by Signature: ' + header.Supervisor
          },
          {
            text: 'Date: ' + dateSigned
          }
        ],
      },
      '\n\n',
      {
        alignment: 'justify',
        text: 'Messages', style: 'subheader'
      },
      '\n',
      messages,
      '\n',
      images
    ],
    styles: {
      header: {
        fontSize: 28,
        bold: true
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    }
  }

  // create pdf
  // console.log(docDefinition)
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  pdfDoc.pipe(fs.createWriteStream(pdfPath))
  pdfDoc.end()

  // update form data with path to pdf
  client.release()

}

module.exports = spotCheckSafetyPDF
