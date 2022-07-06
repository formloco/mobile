const PdfPrinter = require('pdfmake')
const fs = require('fs')

async function spotCheckSafetyPDF(path, reportData, messages, pics, signDate) {

  let currentPath = process.cwd()

  const fonts = {
    Roboto: {
      normal: currentPath + '/api/fonts/Roboto-Regular.ttf',
      bold: currentPath + '/api/fonts/Roboto-Medium.ttf',
      italics: currentPath + '/api/fonts/Roboto-Italic.ttf',
      bolditalics: currentPath + '/api/fonts/Roboto-MediumItalic.ttf'
    }
  }

  const printer = new PdfPrinter(fonts)

  let dateSigned = 'To be determined'
  if (signDate) dateSigned = signDate

  let header = reportData.header
  let hazard = reportData.hazard
  let rules = reportData.rules
  let incident = reportData.incident
  let communication = reportData.communication
  let personalEquipment = reportData.personalEquipment
  let safetyEquipment = reportData.safetyEquipment
  let comments = reportData.comments
  let correctiveAction = reportData.correctiveAction

  let data = {}
  // const commentObj = Object.assign(comments)
  // const commentData = Object.keys(commentObj).map((key) => [key, commentObj[key]])

  const formObj = Object.assign(hazard, rules, incident, communication, personalEquipment, safetyEquipment, correctiveAction)
  const allFormData = Object.keys(formObj).map((key) => [key, formObj[key]])

  allFormData.forEach(rec => {
    comment = ''
    let foundComment = comments.find(c => c.field == rec[0])

    if (foundComment) comment = foundComment.text

    if (rec[1] === 'unsatisfactory') {
      data[rec[0] + 'U'] = '√'
      data[rec[0] + 'NA'] = ''
      data[rec[0] + 'S'] = ''
      data[rec[0] + 'Comment'] = comment
    }
    else if (rec[1] === 'satisfactory') {
      data[rec[0] + 'U'] = ''
      data[rec[0] + 'NA'] = ''
      data[rec[0] + 'S'] = '√'
      data[rec[0] + 'Comment'] = comment
    }
    else if (rec[1] === 'na') {
      data[rec[0] + 'U'] = ''
      data[rec[0] + 'NA'] = '√'
      data[rec[0] + 'S'] = ''
      data[rec[0] + 'Comment'] = comment
    }
    else {
      data[rec[0]] = ''
      data[rec[0] + 'Comment'] = comment
    }
  })

  console.log('------------**********REPORTDATA*********------------:', reportData)
  console.log('------------**********DATA*********------------:', data)

  const docDefinition = {
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            image: currentPath + '/api/images/logo.png'
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
            text: 'Evaluator: ' + header.Worker
          }
        ]
      },
      '\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 'auto'],
          body: [
            ['WORKSITE SAFETY MANAGEMENT REVIEW', 'Not Applicable (N/A) Unsatisfactory (U) Satisfactory (S)']
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [
              { text: 'Hazard Identification and Control', style: 'tableHeader' }, 
              { text: 'N/A', style: 'tableHeader', alignment: 'center' }, 
              { text: 'U', style: 'tableHeader', alignment: 'center' }, 
              { text: 'S', style: 'tableHeader', alignment: 'center' }
            ],
            [
              { text: 'Are equipment and vehicles inspected, and at what frequency? (Examples and documentation) ' + data.InspectionFrequencyComment }, 
              { text: data.InspectionFrequencyNA, alignment: 'center' }, 
              { text: data.InspectionFrequencyU, alignment: 'center' }, 
              { text: data.InspectionFrequencyS, alignment: 'center' }
            ],
            [
              { text: 'Is there a system for hazard assessment, reporting and follow-up? (Written or verbal) ' + data.HazardAssessmentSystemComment }, 
              { text: data.HazardAssessmentSystemNA, alignment: 'center' }, 
              { text: data.HazardAssessmentSystemU, alignment: 'center' }, 
              { text: data.HazardAssessmentSystemS, alignment: 'center' }
            ],
            [
              { colSpan: 4, text: 'Comments:\n' +  + data.HazardComments }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [
              { text: 'Rules and Work Procedure', style: 'tableHeader' }, 
              { text: 'N/A', style: 'tableHeader', alignment: 'center' }, 
              { text: 'U', style: 'tableHeader', alignment: 'center' }, 
              { text: 'S', style: 'tableHeader', alignment: 'center' }
            ],
            [
              { text: 'Are there procedures for high risk or critical work? Are they available and used? ' + data.ProceduresComment }, 
              { text: data.ProceduresNA, alignment: 'center' }, 
              { text: data.ProceduresU, alignment: 'center' }, 
              { text: data.ProceduresS, alignment: 'center' }
            ],
            [
              { text: 'Are there written emergency plans available and communicated to personnel on the work site? ' + data.EmergencyPlanComment }, 
              { text: data.EmergencyPlanNA, alignment: 'center' }, 
              { text: data.EmergencyPlanU, alignment: 'center' }, 
              { text: data.EmergencyPlanS, alignment: 'center' }
            ],
            [
              { colSpan: 4, text: 'Comments\n' + data.RulesComments }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [
              { text: 'Incident Reporting', style: 'tableHeader' }, 
              { text: 'N/A', style: 'tableHeader', alignment: 'center' }, 
              { text: 'U', style: 'tableHeader', alignment: 'center' }, 
              { text: 'S', style: 'tableHeader', alignment: 'center' }
            ],
            [
              { text: 'Is there an Incident reporting process in place? ' + data.IncidentReportingComment }, 
              { text: data.IncidentReportingNA, alignment: 'center' }, 
              { text: data.IncidentReportingU, alignment: 'center' }, 
              { text: data.IncidentReportingS, alignment: 'center' }
            ],
            [
              { text: 'Is there a near miss/incident reporting form which includes follow-up? ' + data.NearMissReportingComment }, 
              { text: data.NearMissReportingNA, alignment: 'center' }, 
              { text: data.NearMissReportingU, alignment: 'center' }, 
              { text: data.NearMissReportingS, alignment: 'center' }
            ],
            [
              { text: 'Are incidents reported and was the problem fixed the last time there was a near miss or incident? ' + data.ProblemFixedComment }, 
              { text: data.ProblemFixedNA, alignment: 'center' }, 
              { text: data.ProblemFixedU, alignment: 'center' }, 
              { text: data.ProblemFixedS, alignment: 'center' }
            ],
            [
              { text: 'Are management and workers involved in solving the issues? ' + data.SolvingIssuesComment }, 
              { text: data.SolvingIssuesNA, alignment: 'center' }, 
              { text: data.SolvingIssuesU, alignment: 'center' }, 
              { text: data.SolvingIssuesS, alignment: 'center' }
            ],
            [
              { colSpan: 4, text: 'Comments\n' + data.IncidentComments }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [
              { text: 'Communication/Training', style: 'tableHeader' }, 
              { text: 'N/A', style: 'tableHeader', alignment: 'center' }, 
              { text: 'U', style: 'tableHeader', alignment: 'center' }, 
              { text: 'S', style: 'tableHeader', alignment: 'center' }
            ],
            [
              { text: 'Have you received a safety orientation (When and what) ' + data.SafetyOrientationComment }, 
              { text: data.SafetyOrientationNA, alignment: 'center' }, 
              { text: data.SafetyOrientationU, alignment: 'center' }, 
              { text: data.SafetyOrientationS, alignment: 'center' }
            ],
            [
              { text: 'Are safety meetings held within the (prescribed) frequency ' + data.SafetyMeetingFrequencyComment }, 
              { text: data.SafetyMeetingFrequencyNA, alignment: 'center' }, 
              { text: data.SafetyMeetingFrequencyU, alignment: 'center' }, 
              { text: data.SafetyMeetingFrequencyS, alignment: 'center' }
            ],
            [
              { text: 'Is the appropriate training in place ' + data.AppropriateTrainingComment }, 
              { text: data.AppropriateTrainingNA, alignment: 'center' }, 
              { text: data.AppropriateTrainingU, alignment: 'center' }, 
              { text: data.AppropriateTrainingS, alignment: 'center' }
            ],
            [
              { text: 'First aid training ' + data.FirstAidTrainingComment }, 
              { text: data.FirstAidTrainingNA, alignment: 'center' }, 
              { text: data.FirstAidTrainingU, alignment: 'center' }, 
              { text: data.FirstAidTrainingS, alignment: 'center' }
            ],
            [
              { text: 'H2S training ' + data.H2STrainingComment }, 
              { text: data.H2STrainingNA, alignment: 'center' }, 
              { text: data.H2STrainingU, alignment: 'center' }, 
              { text: data.H2STrainingS, alignment: 'center' }
            ],
            [
              { text: 'WHMIS training ' + data.WHMISTrainingComment }, 
              { text: data.WHMISTrainingNA, alignment: 'center' }, 
              { text: data.WHMISTrainingU, alignment: 'center' }, 
              { text: data.WHMISTrainingS, alignment: 'center' }
            ],
            [
              { text: 'TDG training ' + data.TDGTrainingComment }, 
              { text: data.TDGTrainingNA, alignment: 'center' }, 
              { text: data.TDGTrainingU, alignment: 'center' }, 
              { text: data.TDGTrainingS, alignment: 'center' }
            ],
            [
              { text: 'Ground disturbance training ' + data.GroundDisturbanceTrainingComment }, 
              { text: data.GroundDisturbanceTrainingNA, alignment: 'center' }, 
              { text: data.GroundDisturbanceTrainingU, alignment: 'center' }, 
              { text: data.GroundDisturbanceTrainingS, alignment: 'center' }
            ],
            [
              { text: 'eGSO/ CSO training ' + data.EGSOCSOTrainingComment }, 
              { text: data.EGSOCSOTrainingNA, alignment: 'center' }, 
              { text: data.EGSOCSOTrainingU, alignment: 'center' }, 
              { text: data.EGSOCSOTrainingS, alignment: 'center' },],
            [
              { text: 'Job Specific training (List any that apply) ' + data.JobSpecificTrainingComment }, 
              { text: data.JobSpecificTrainingNA, alignment: 'center' }, 
              { text: data.JobSpecificTrainingU, alignment: 'center' }, 
              { text: data.JobSpecificTrainingS, alignment: 'center' }
            ],
            [
              { colSpan: 4, text: 'Comments\n' + data.CommunicationComments }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [
              { text: 'Is the appropriate PPE available and being used ', style: 'tableHeader' }, 
              { text: 'N/A', style: 'tableHeader', alignment: 'center' }, 
              { text: 'U', style: 'tableHeader', alignment: 'center' }, 
              { text: 'S', style: 'tableHeader', alignment: 'center' }
            ],
            [
              { text: 'Hard Hat ' + data.HardHatComment }, 
              { text: data.HardHatNA, alignment: 'center' }, 
              { text: data.HardHatU, alignment: 'center' }, 
              { text: data.HardHatS, alignment: 'center' }
            ],
            [
              { text: 'Safety Glasses ' + data.SafetyGlassesComment }, 
              { text: data.SafetyGlassesNA, alignment: 'center' }, 
              { text: data.SafetyGlassesU, alignment: 'center' }, 
              { text: data.SafetyGlassesS, alignment: 'center' }
            ],
            [
              { text: 'Footwear ' + data.FootwearComment }, 
              { text: data.FootwearNA, alignment: 'center' }, 
              { text: data.FootwearU, alignment: 'center' }, 
              { text: data.FootwearS, alignment: 'center' }
            ],
            [
              { text: 'Protective clothing (FR coveralls, gloves, etc) ' + data.ProtectiveClothingComment }, 
              { text: data.ProtectiveClothingNA, alignment: 'center' }, 
              { text: data.ProtectiveClothingU, alignment: 'center' }, 
              { text: data.ProtectiveClothingS, alignment: 'center' }
            ],
            [
              { text: 'Hearing protection ' + data.HearingProtectionComment }, 
              { text: data.HearingProtectionNA, alignment: 'center' }, 
              { text: data.HearingProtectionU, alignment: 'center' }, 
              { text: data.HearingProtectionS, alignment: 'center' }
            ],
            [
              { text: 'Respiratory protection (Appropriate for the hazard) ' + data.RespiratoryProtectionComment }, 
              { text: data.RespiratoryProtectionNA, alignment: 'center' }, 
              { text: data.RespiratoryProtectionU, alignment: 'center' }, 
              { text: data.RespiratoryProtectionS, alignment: 'center' }
            ],
            [
              { text: 'Personal gas monitor ' + data.PersonalGasMonitorComment }, 
              { text: data.PersonalGasMonitorNA, alignment: 'center' }, 
              { text: data.PersonalGasMonitorU, alignment: 'center' }, 
              { text: data.PersonalGasMonitorS, alignment: 'center' }
            ],
            [
              { text: 'Communication equipment ' + data.CommunicationEquipmentComment }, 
              { text: data.CommunicationEquipmentNA, alignment: 'center' }, 
              { text: data.CommunicationEquipmentU, alignment: 'center' }, 
              { text: data.CommunicationEquipmentS, alignment: 'center' }
            ],
            [
              { text: 'Other equipment (please specify) ' + data.OtherEquipmentComment }, 
              { text: data.OtherEquipmentNA, alignment: 'center' }, 
              { text: data.OtherEquipmentU, alignment: 'center' }, 
              { text: data.OtherEquipmentS, alignment: 'center' }
            ],
            [
              { colSpan: 4, text: 'Comments\n' + data.PersonalEquipmentComments }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [
              { text: 'Safety Equipment ', style: 'tableHeader' }, 
              { text: 'N/A', style: 'tableHeader', alignment: 'center' }, 
              { text: 'U', style: 'tableHeader', alignment: 'center' }, 
              { text: 'S', style: 'tableHeader', alignment: 'center' }
            ],
            [
              { text: 'Is the appropriate safety equipment available and being used ' + data.SafetyEquipmentAvailableComment }, 
              { text: data.SafetyEquipmentAvailableNA, alignment: 'center' }, 
              { text: data.SafetyEquipmentAvailableU, alignment: 'center' }, 
              { text: data.SafetyEquipmentAvailableS, alignment: 'center' }
            ],
            [
              { text: 'Fire Fighting equipment (inspected, tagged, accessible, good condition) ' + data.FireFightingEquipmentComment }, 
              { text: data.FireFightingEquipmentNA, alignment: 'center' }, 
              { text: data.FireFightingEquipmentU, alignment: 'center' }, 
              { text: data.FireFightingEquipmentS, alignment: 'center' }
            ],
            [
              { text: 'Rotating equipment guards ' + data.RotatingEquimentGuardsComment }, 
              { text: data.RotatingEquimentGuardsNA, alignment: 'center' }, 
              { text: data.RotatingEquimentGuardsU, alignment: 'center' }, 
              { text: data.RotatingEquimentGuardsS, alignment: 'center' }
            ],
            [
              { text: 'First aid kit ' + data.FirstAidKitCommen }, 
              { text: data.FirstAidKitNA, alignment: 'center' }, 
              { text: data.FirstAidKitU, alignment: 'center' }, 
              { text: data.FirstAidKitS, alignment: 'center' }
            ],
            [
              { text: 'Fall Arrest equipment (Ladders, steps, harness, lanyards, etc.) ' + data.FallArrestEquipmentComment }, 
              { text: data.FallArrestEquipmentNA, alignment: 'center' }, 
              { text: data.FallArrestEquipmentU, alignment: 'center' }, 
              { text: data.FallArrestEquipmentS, alignment: 'center' }
            ],
            [
              { text: 'Emergency Shut down and Alarm Systems (positive air shutoffs, backup alarms, etc.) ' + data.EmergencySystemComment }, 
              { text: data.EmergencySystemsNA, alignment: 'center' }, 
              { text: data.EmergencySystemsU, alignment: 'center' }, 
              { text: data.EmergencySystemsS, alignment: 'center' }
            ],
            [
              { text: 'Other (Specify) ' + data.OtherComment }, 
              { text: data.OtherNA, alignment: 'center' }, 
              { text: data.OtherU, alignment: 'center' }, 
              { text: data.OtherS, alignment: 'center' }
            ],
            [
              { colSpan: 4, text: 'Comments\n' + data.SafetyEquipmentComments }
            ]
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
      pics
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
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  pdfDoc.pipe(fs.createWriteStream(path + '.pdf'))
  pdfDoc.end()

}

module.exports = spotCheckSafetyPDF
