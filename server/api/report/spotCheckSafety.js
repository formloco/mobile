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
  

  if (hazard.InspectionFrequency == 'na' || hazard.InspectionFrequency == null) {
    InspectionFrequencyNA = '√',
      InspectionFrequencyU = '',
      InspectionFrequencyS = ''
  }
  if (hazard.InspectionFrequency == true) {
    InspectionFrequencyNA = '',
      InspectionFrequencyU = '√',
      InspectionFrequencyS = ''
  }
  if (hazard.InspectionFrequency == false) {
    InspectionFrequencyNA = '',
      InspectionFrequencyU = '',
      InspectionFrequencyS = '√'
  }

  if (hazard.HazardAssessmentSystem == 'na' || hazard.HazardAssessmentSystem == null) {
    HazardAssessmentSystemNA = '√',
      HazardAssessmentSystemU = '',
      HazardAssessmentSystemS = ''
  }
  if (hazard.HazardAssessmentSystem == true) {
    HazardAssessmentSystemNA = '',
      HazardAssessmentSystemU = '√',
      HazardAssessmentSystemS = ''
  }
  if (hazard.HazardAssessmentSystem == false) {
    HazardAssessmentSystemNA = '',
      HazardAssessmentSystemU = '',
      HazardAssessmentSystemS = '√'
  }

  if (hazard.HazardComments == null) HazardComments = ''

  if (rules.Procedures == 'na' || rules.Procedures == null) {
    ProceduresNA = '√',
      ProceduresU = '',
      ProceduresS = ''
  }
  if (rules.Procedures == true) {
    ProceduresNA = '',
      ProceduresU = '√',
      ProceduresS = ''
  }
  if (rules.Procedures == false) {
    ProceduresNA = '',
      ProceduresU = '',
      ProceduresS = '√'
  }

  if (rules.EmergencyPlan == 'na' || rules.EmergencyPlan == null) {
    EmergencyPlanNA = '√',
      EmergencyPlanU = '',
      EmergencyPlanS = ''
  }
  if (rules.EmergencyPlan == true) {
    EmergencyPlanNA = '',
      EmergencyPlanU = '√',
      EmergencyPlanS = ''
  }
  if (rules.EmergencyPlan == false) {
    EmergencyPlanNA = '',
      EmergencyPlanU = '',
      EmergencyPlanS = '√'
  }

  if (rules.Procedures == 'na' || rules.Procedures == null) {
    ProceduresNA = '√',
      ProceduresU = '',
      ProceduresS = ''
  }
  if (rules.Procedures == true) {
    ProceduresNA = '',
      ProceduresU = '√',
      ProceduresFrequencyS = ''
  }
  if (rules.Procedures == false) {
    ProceduresNA = '',
      ProceduresU = '',
      ProceduresS = '√'
  }
  if (rules.EmergencyPlan == 'na' || rules.EmergencyPlan == null) {
    EmergencyPlanNA = '√',
      EmergencyPlanU = '',
      EmergencyPlanS = ''
  }
  if (rules.EmergencyPlan == true) {
    EmergencyPlanNA = '',
      EmergencyPlanU = '√',
      EmergencyPlanS = ''
  }
  if (rules.EmergencyPlan == false) {
    EmergencyPlanNA = '',
      EmergencyPlanU = '',
      EmergencyPlanS = '√'
  }
  if (rules.RulesComments == null) RulesComments = ''

  if (incident.IncidentReporting == 'na' || incident.IncidentReporting == null) {
    IncidentReportingNA = '√',
      IncidentReportingU = '',
      IncidentReportingS = ''
  }
  if (incident.IncidentReporting == true) {
    IncidentReportingNA = '',
      IncidentReportingU = '√',
      IncidentReportingS = ''
  }
  if (incident.IncidentReporting == false) {
    IncidentReportingNA = '',
      IncidentReportingU = '',
      IncidentReportingS = '√'
  }
  if (incident.NearMissReporting == 'na' || incident.NearMissReporting == null) {
    NearMissReportingNA = '√',
      NearMissReportingU = '',
      NearMissReportingS = ''
  }
  if (incident.NearMissReporting == true) {
    NearMissReportingNA = '',
      NearMissReportingU = '√',
      NearMissReportingS = ''
  }
  if (incident.NearMissReporting == false) {
    NearMissReportingNA = '',
      NearMissReportingU = '',
      NearMissReportingS = '√'
  }
  if (incident.ProblemFixed == 'na' || incident.ProblemFixed == null) {
    ProblemFixedNA = '√',
      ProblemFixedU = '',
      ProblemFixedS = ''
  }
  if (incident.ProblemFixed == true) {
    ProblemFixedNA = '',
      ProblemFixedU = '√',
      ProblemFixedS = ''
  }
  if (incident.ProblemFixed == false) {
    ProblemFixedNA = '',
      ProblemFixedU = '',
      ProblemFixedS = '√'
  }
  if (incident.SolvingIssues == 'na' || incident.SolvingIssues == null) {
    SolvingIssuesNA = '√',
      SolvingIssuesU = '',
      SolvingIssuesS = ''
  }
  if (incident.SolvingIssues == true) {
    SolvingIssuesNA = '',
      SolvingIssuesU = '√',
      SolvingIssuesS = ''
  }
  if (incident.SolvingIssues == false) {
    SolvingIssuesNA = '',
      SolvingIssuesU = '',
      SolvingIssuesS = '√'
  }

  if (incident.IncidentComments == null) IncidentComments = ''

  if (communication.SafetyOrientation == 'na' || communication.SafetyOrientation == null) {
    SafetyOrientationNA = '√',
      SafetyOrientationU = '',
      SafetyOrientationS = ''
  }
  if (communication.SafetyOrientation == true) {
    SafetyOrientationNA = '',
      SafetyOrientationU = '√',
      SafetyOrientationS = ''
  }
  if (communication.SafetyOrientation == false) {
    SafetyOrientationNA = '',
      SafetyOrientationU = '',
      SafetyOrientationS = '√'
  }

  if (communication.SafetyMeetingFrequency == 'na' || communication.SafetyMeetingFrequency == null) {
    SafetyMeetingFrequencyNA = '√',
      SafetyMeetingFrequencyU = '',
      SafetyMeetingFrequencyS = ''
  }
  if (communication.SafetyMeetingFrequency == true) {
    SafetyMeetingFrequencyNA = '',
      SafetyMeetingFrequencyU = '√',
      SafetyMeetingFrequencyS = ''
  }
  if (communication.SafetyMeetingFrequency == false) {
    SafetyMeetingFrequencyNA = '',
      SafetyMeetingFrequencyU = '',
      SafetyMeetingFrequencyS = '√'
  }

  if (communication.AppropriateTraining == 'na' || communication.AppropriateTraining == null) {
    AppropriateTrainingNA = '√',
      AppropriateTrainingU = '',
      AppropriateTrainingS = ''
  }
  if (communication.AppropriateTraining == true) {
    AppropriateTrainingNA = '',
      AppropriateTrainingU = '√',
      AppropriateTrainingS = ''
  }
  if (communication.AppropriateTraining == false) {
    AppropriateTrainingNA = '',
      AppropriateTrainingU = '',
      AppropriateTrainingS = '√'
  }

  if (communication.FirstAidTraining == 'na' || communication.FirstAidTraining == null) {
    FirstAidTrainingNA = '√',
      FirstAidTrainingU = '',
      FirstAidTrainingS = ''
  }
  if (communication.FirstAidTraining == true) {
    FirstAidTrainingNA = '',
      FirstAidTrainingU = '√',
      FirstAidTrainingS = ''
  }
  if (communication.FirstAidTraining == false) {
    FirstAidTrainingNA = '',
      FirstAidTrainingU = '',
      FirstAidTrainingS = '√'
  }

  if (communication.H2STraining == 'na' || communication.FirstAidTraining == null) {
    H2STrainingNA = '√',
      H2STrainingU = '',
      H2STrainingS = ''
  }
  if (communication.H2STraining == true) {
    H2STrainingNA = '',
      H2STrainingU = '√',
      H2STrainingS = ''
  }
  if (communication.H2STraining == false) {
    H2STrainingNA = '',
      H2STrainingU = '',
      H2STrainingS = '√'
  }

  if (communication.WHMISTraining == 'na' || communication.WHMISTraining == null) {
    WHMISTrainingNA = '√',
      WHMISTrainingU = '',
      WHMISTrainingS = ''
  }
  if (communication.WHMISTraining == true) {
    WHMISTrainingNA = '',
      WHMISTrainingU = '√',
      WHMISTrainingS = ''
  }
  if (communication.WHMISTraining == false) {
    WHMISTrainingNA = '',
      WHMISTrainingU = '',
      WHMISTrainingS = '√'
  }

  if (communication.TDGTraining == 'na' || communication.TDGTraining == null) {
    TDGTrainingNA = '√',
      TDGTrainingU = '',
      TDGTrainingS = ''
  }
  if (communication.TDGTraining == true) {
    TDGTrainingNA = '',
      TDGTrainingU = '√',
      TDGTrainingS = ''
  }
  if (communication.TDGTraining == false) {
    TDGTrainingNA = '',
      TDGTrainingU = '',
      TDGTrainingS = '√'
  }

  if (communication.GroundDisturbanceTraining == 'na' || communication.GroundDisturbanceTraining == null) {
    GroundDisturbanceTrainingNA = '√',
      GroundDisturbanceTrainingU = '',
      GroundDisturbanceTrainingS = ''
  }
  if (communication.GroundDisturbanceTraining == true) {
    GroundDisturbanceTrainingNA = '',
      GroundDisturbanceTrainingU = '√',
      GroundDisturbanceTrainingS = ''
  }
  if (communication.GroundDisturbanceTraining == false) {
    GroundDisturbanceTrainingNA = '',
      GroundDisturbanceTrainingU = '',
      GroundDisturbanceTrainingS = '√'
  }

  if (communication.EGSOCSOTraining == 'na' || communication.EGSOCSOTraining == null) {
    EGSOCSOTrainingNA = '√',
      EGSOCSOTrainingU = '',
      EGSOCSOTrainingS = ''
  }
  if (communication.EGSOCSOTraining == true) {
    EGSOCSOTrainingNA = '',
      EGSOCSOTrainingU = '√',
      EGSOCSOTrainingS = ''
  }
  if (communication.EGSOCSOTraining == false) {
    EGSOCSOTrainingNA = '',
      EGSOCSOTrainingU = '',
      EGSOCSOTrainingS = '√'
  }

  if (communication.JobSpecificTraining == 'na' || communication.JobSpecificTraining == null) {
    JobSpecificTrainingNA = '√',
      JobSpecificTrainingU = '',
      JobSpecificTrainingS = ''
  }
  if (communication.JobSpecificTraining == true) {
    JobSpecificTrainingNA = '',
      JobSpecificTrainingU = '√',
      JobSpecificTrainingS = ''
  }
  if (communication.JobSpecificTraining == false) {
    JobSpecificTrainingNA = '',
      JobSpecificTrainingU = '',
      JobSpecificTrainingS = '√'
  }

  if (communication.CommunicationComments == null) CommunicationComments = ''

  if (personalEquipment.PPEAvailable == 'na' || personalEquipment.PPEAvailable == null) {
    PPEAvailableNA = '√',
      PPEAvailableU = '',
      PPEAvailableS = ''
  }
  if (personalEquipment.PPEAvailable == true) {
    PPEAvailableNA = '',
      PPEAvailableU = '√',
      PPEAvailableS = ''
  }
  if (personalEquipment.PPEAvailable == false) {
    PPEAvailableNA = '',
      PPEAvailableU = '',
      PPEAvailableS = '√'
  }

  if (personalEquipment.HardHat == 'na' || personalEquipment.HardHat == null) {
    HardHatNA = '√',
      HardHatU = '',
      HardHatS = ''
  }
  if (personalEquipment.HardHat == true) {
    HardHatNA = '',
      HardHatU = '√',
      HardHatS = ''
  }
  if (personalEquipment.HardHat == false) {
    HardHatNA = '',
      HardHatU = '',
      HardHatS = '√'
  }

  if (personalEquipment.SafetyGlasses == 'na' || personalEquipment.SafetyGlasses == null) {
    SafetyGlassesNA = '√',
      SafetyGlassesU = '',
      SafetyGlassesS = ''
  }
  if (personalEquipment.SafetyGlasses == true) {
    SafetyGlassesNA = '',
      SafetyGlassesU = '√',
      SafetyGlassesS = ''
  }
  if (personalEquipment.SafetyGlasses == false) {
    SafetyGlassesNA = '',
      SafetyGlassesU = '',
      SafetyGlassesS = '√'
  }

  if (personalEquipment.Footwear == 'na' || personalEquipment.Footwear == null) {
    FootwearNA = '√',
      FootwearU = '',
      FootwearS = ''
  }
  if (personalEquipment.Footwear == true) {
    FootwearNA = '',
      FootwearU = '√',
      FootwearS = ''
  }
  if (personalEquipment.Footwear == false) {
    FootwearNA = '',
      FootwearU = '',
      FootwearS = '√'
  }

  if (personalEquipment.ProtectiveClothing == 'na' || personalEquipment.ProtectiveClothing == null) {
    ProtectiveClothingNA = '√',
      ProtectiveClothingU = '',
      ProtectiveClothingS = ''
  }
  if (personalEquipment.ProtectiveClothing == true) {
    ProtectiveClothingNA = '',
      ProtectiveClothingU = '√',
      ProtectiveClothingS = ''
  }
  if (personalEquipment.ProtectiveClothing == false) {
    ProtectiveClothingNA = '',
      ProtectiveClothingU = '',
      ProtectiveClothingS = '√'
  }

  if (personalEquipment.HearingProtection == 'na' || personalEquipment.HearingProtection == null) {
    HearingProtectionNA = '√',
      HearingProtectionU = '',
      HearingProtectionS = ''
  }
  if (personalEquipment.HearingProtection == true) {
    HearingProtectionNA = '',
      HearingProtectionU = '√',
      HearingProtectionS = ''
  }
  if (personalEquipment.HearingProtection == false) {
    HearingProtectionNA = '',
      HearingProtectionU = '',
      HearingProtectionS = '√'
  }

  if (personalEquipment.RespiratoryProtection == 'na' || personalEquipment.RespiratoryProtection == null) {
    RespiratoryProtectionNA = '√',
      RespiratoryProtectionU = '',
      RespiratoryProtectionS = ''
  }
  if (personalEquipment.RespiratoryProtection == true) {
    RespiratoryProtectionNA = '',
      RespiratoryProtectionU = '√',
      RespiratoryProtectionS = ''
  }
  if (personalEquipment.RespiratoryProtection == false) {
    RespiratoryProtectionNA = '',
      RespiratoryProtectionU = '',
      RespiratoryProtectionS = '√'
  }

  if (personalEquipment.PersonalGasMonitor == 'na' || personalEquipment.PersonalGasMonitor == null) {
    PersonalGasMonitorNA = '√',
      PersonalGasMonitorU = '',
      PersonalGasMonitorS = ''
  }
  if (personalEquipment.PersonalGasMonitor == true) {
    PersonalGasMonitorNA = '',
      PersonalGasMonitorU = '√',
      PersonalGasMonitorS = ''
  }
  if (personalEquipment.PersonalGasMonitor == false) {
    PersonalGasMonitorNA = '',
      PersonalGasMonitorU = '',
      PersonalGasMonitorS = '√'
  }

  if (personalEquipment.CommunicationEquipment == 'na' || personalEquipment.CommunicationEquipment == null) {
    CommunicationEquipmentNA = '√',
      CommunicationEquipmentU = '',
      CommunicationEquipmentS = ''
  }
  if (personalEquipment.CommunicationEquipment == true) {
    CommunicationEquipmentNA = '',
      CommunicationEquipmentU = '√',
      CommunicationEquipmentS = ''
  }
  if (personalEquipment.CommunicationEquipment == false) {
    CommunicationEquipmentNA = '',
      CommunicationEquipmentU = '',
      CommunicationEquipmentS = '√'
  }

  if (personalEquipment.OtherEquipment == 'na' || personalEquipment.OtherEquipment == null) {
    OtherEquipmentNA = '√',
      OtherEquipmentU = '',
      OtherEquipmentS = ''
  }
  if (personalEquipment.OtherEquipment == true) {
    OtherEquipmentNA = '',
      OtherEquipmentU = '√',
      OtherEquipmentS = ''
  }
  if (personalEquipment.OtherEquipment == false) {
    OtherEquipmentNA = '',
      OtherEquipmentU = '',
      OtherEquipmentS = '√'
  }

  if (personalEquipment.PersonalEquipmentComments == null) PersonalEquipmentComments = ''

  if (safetyEquipment.SafetyEquipmentAvailable == 'na' || safetyEquipment.SafetyEquipmentAvailable == null) {
    SafetyEquipmentAvailableNA = '√',
      SafetyEquipmentAvailableU = '',
      SafetyEquipmentAvailableS = ''
  }
  if (safetyEquipment.SafetyEquipmentAvailable == true) {
    SafetyEquipmentAvailableNA = '',
      SafetyEquipmentAvailableU = '√',
      SafetyEquipmentAvailableS = ''
  }
  if (safetyEquipment.SafetyEquipmentAvailable == false) {
    SafetyEquipmentAvailableNA = '',
      SafetyEquipmentAvailableU = '',
      SafetyEquipmentAvailableS = '√'
  }

  if (safetyEquipment.FireFightingEquipment == 'na' || safetyEquipment.FireFightingEquipment == null) {
    FireFightingEquipmentNA = '√',
      FireFightingEquipmentU = '',
      FireFightingEquipmentS = ''
  }
  if (safetyEquipment.FireFightingEquipment == true) {
    FireFightingEquipmentNA = '',
      FireFightingEquipmentU = '√',
      FireFightingEquipmentS = ''
  }
  if (safetyEquipment.FireFightingEquipment == false) {
    FireFightingEquipmentNA = '',
      FireFightingEquipmentU = '',
      FireFightingEquipmentS = '√'
  }

  if (safetyEquipment.RotatingEquimentGuards == 'na' || safetyEquipment.RotatingEquimentGuards == null) {
    RotatingEquimentGuardsNA = '√',
      RotatingEquimentGuardsU = '',
      RotatingEquimentGuardsS = ''
  }
  if (safetyEquipment.RotatingEquimentGuards == true) {
    RotatingEquimentGuardsNA = '',
      RotatingEquimentGuardsU = '√',
      RotatingEquimentGuardsS = ''
  }
  if (safetyEquipment.RotatingEquimentGuards == false) {
    RotatingEquimentGuardsNA = '',
      RotatingEquimentGuardsU = '',
      RotatingEquimentGuardsS = '√'
  }

  if (safetyEquipment.FirstAidKit == 'na' || safetyEquipment.FirstAidKit == null) {
    FirstAidKitNA = '√',
      FirstAidKitU = '',
      FirstAidKitS = ''
  }
  if (safetyEquipment.FirstAidKit == true) {
    FirstAidKitNA = '',
      FirstAidKitU = '√',
      FirstAidKitS = ''
  }
  if (safetyEquipment.FirstAidKit == false) {
    FirstAidKitNA = '',
      FirstAidKitU = '',
      FirstAidKitS = '√'
  }

  if (safetyEquipment.FallArrestEquipment == 'na' || safetyEquipment.FallArrestEquipment == null) {
    FallArrestEquipmentNA = '√',
      FallArrestEquipmentU = '',
      FallArrestEquipmentS = ''
  }
  if (safetyEquipment.FallArrestEquipment == true) {
    FallArrestEquipmentNA = '',
      FallArrestEquipmentU = '√',
      FallArrestEquipmentS = ''
  }
  if (safetyEquipment.FallArrestEquipment == false) {
    FallArrestEquipmentNA = '',
      FallArrestEquipmentU = '',
      FallArrestEquipmentS = '√'
  }

  if (safetyEquipment.EmergencySystems == 'na' || safetyEquipment.EmergencySystems == null) {
    EmergencySystemsNA = '√',
      EmergencySystemsU = '',
      EmergencySystemsS = ''
  }
  if (safetyEquipment.EmergencySystems == true) {
    EmergencySystemsNA = '',
      EmergencySystemsU = '√',
      EmergencySystemsS = ''
  }
  if (safetyEquipment.EmergencySystems == false) {
    EmergencySystemsNA = '',
      EmergencySystemsU = '',
      EmergencySystemsS = '√'
  }

  if (safetyEquipment.Other == 'na' || safetyEquipment.Other == null) {
    OtherNA = '√',
      OtherU = '',
      OtherS = ''
  }
  if (safetyEquipment.Other == true) {
    OtherNA = '',
      OtherU = '√',
      OtherS = ''
  }
  if (safetyEquipment.Other == false) {
    OtherNA = '',
      OtherU = '',
      OtherS = '√'
  }

  if (safetyEquipment.SafetyEquipmentComments == null) SafetyEquipmentComments = ''

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
          },
          {
            text: 'Location: ' + header.Location
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
            ['Are equipment and vehicles inspected, and at what frequency? (Examples and documentation)', {text: InspectionFrequencyNA, alignment: 'center'}, {text: InspectionFrequencyU, alignment: 'center'}, {text: InspectionFrequencyS, alignment: 'center'}],
            ['Are there written emergency plans available and communicated to personnel on the work site?', {text: HazardAssessmentSystemNA, alignment: 'center'}, {text: HazardAssessmentSystemU, alignment: 'center'}, {text: HazardAssessmentSystemS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ HazardComments}]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text:'Rules and Work Procedure', style: 'tableHeader'}, {text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['Are there procedures for high risk or critical work? Are they available and used?', {text: ProceduresNA, alignment: 'center'}, {text: ProceduresU, alignment: 'center'}, {text: ProceduresS, alignment: 'center'}],
            ['Are there written emergency plans available and communicated to personnel on the work site?', {text: EmergencyPlanNA, alignment: 'center'}, {text: EmergencyPlanU, alignment: 'center'}, {text: EmergencyPlanS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ RulesComments}]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text:'Incident Reporting', style: 'tableHeader'}, {text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['Is there an Incident reporting process in place? (Briefly explain)', {text: IncidentReportingNA, alignment: 'center'}, {text: IncidentReportingU, alignment: 'center'}, {text: IncidentReportingS, alignment: 'center'}],
            ['Is there a near miss/incident reporting form which includes follow-up?', {text: NearMissReportingNA, alignment: 'center'}, {text: NearMissReportingU, alignment: 'center'}, {text: NearMissReportingS, alignment: 'center'}],
            ['Are incidents reported and was the problem fixed the last time there was a near miss or incident?', {text: ProblemFixedNA, alignment: 'center'},{text: ProblemFixedU, alignment: 'center'},{text: ProblemFixedS, alignment: 'center'}],
            ['Are management and workers involved in solving the issues?', {text: SolvingIssuesNA, alignment: 'center'}, {text: SolvingIssuesU, alignment: 'center'}, {text: SolvingIssuesS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ IncidentComments}]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text:'Communication/Training', style: 'tableHeader'}, {text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['Have you received a safety orientation (When and what)', {text: SafetyOrientationNA, alignment: 'center'}, {text: SafetyOrientationU, alignment: 'center'}, {text: SafetyOrientationS, alignment: 'center'}],
            ['How often are safety meetings held (Show examples and documentation)', {text: SafetyMeetingFrequencyNA, alignment: 'center'}, {text: SafetyMeetingFrequencyU, alignment: 'center'}, {text: SafetyMeetingFrequencyS, alignment: 'center'}],
            ['Is the appropriate training in place', {text: AppropriateTrainingNA, alignment: 'center'}, {text: AppropriateTrainingU, alignment: 'center'}, {text: AppropriateTrainingS, alignment: 'center'}],
            ['First aid training', {text: FirstAidTrainingNA, alignment: 'center'}, {text: FirstAidTrainingU, alignment: 'center'}, {text: FirstAidTrainingS, alignment: 'center'}],
            ['H2S training', {text: H2STrainingNA, alignment: 'center'}, {text: H2STrainingU, alignment: 'center'}, {text: H2STrainingS, alignment: 'center'}],
            ['WHMIS training', {text: WHMISTrainingNA, alignment: 'center'}, {text: WHMISTrainingU, alignment: 'center'}, {text: WHMISTrainingS, alignment: 'center'}],
            ['TDG training', {text: TDGTrainingNA, alignment: 'center'}, {text: TDGTrainingU, alignment: 'center'}, {text: TDGTrainingS, alignment: 'center'}],
            ['Ground disturbance training ', {text: GroundDisturbanceTrainingNA, alignment: 'center'}, {text: GroundDisturbanceTrainingU, alignment: 'center'}, {text: GroundDisturbanceTrainingS, alignment: 'center'}],
            ['eGSO/ CSO training', {text: EGSOCSOTrainingNA, alignment: 'center'}, {text: EGSOCSOTrainingU, alignment: 'center'}, {text: EGSOCSOTrainingS, alignment: 'center'},],
            ['Job Specific training (List any that apply)', {text: JobSpecificTrainingNA, alignment: 'center'}, {text: JobSpecificTrainingU, alignment: 'center'}, {text: JobSpecificTrainingS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ CommunicationComments}]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text:'Is the appropriate PPE available and being used', style: 'tableHeader'}, {text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['appropriate PPE available', {text: PPEAvailableNA, alignment: 'center'}, {text: PPEAvailableU, alignment: 'center'}, {text: PPEAvailableS, alignment: 'center'}],
            ['Hard Hat', {text: HardHatNA, alignment: 'center'}, {text: HardHatU, alignment: 'center'}, {text: HardHatS, alignment: 'center'}],
            ['Safety Glasses', {text: SafetyGlassesNA, alignment: 'center'}, {text: SafetyGlassesU, alignment: 'center'}, {text: SafetyGlassesS, alignment: 'center'}],
            ['Footwear', {text: FootwearNA, alignment: 'center'}, {text: FootwearU, alignment: 'center'}, {text: FootwearS, alignment: 'center'}],
            ['Protective clothing (FR coveralls, gloves, etc)', {text: ProtectiveClothingNA, alignment: 'center'}, {text: ProtectiveClothingU, alignment: 'center'}, {text: ProtectiveClothingS, alignment: 'center'}],
            ['Hearing protection', {text: HearingProtectionNA, alignment: 'center'}, {text: HearingProtectionU, alignment: 'center'}, {text: HearingProtectionS, alignment: 'center'}],
            ['Respiratory protection (Appropriate for the hazard)', {text: RespiratoryProtectionNA, alignment: 'center'}, {text: RespiratoryProtectionU, alignment: 'center'}, {text: RespiratoryProtectionS, alignment: 'center'}],
            ['Personal gas monitor', {text: PersonalGasMonitorNA, alignment: 'center'}, {text: PersonalGasMonitorU, alignment: 'center'}, {text: PersonalGasMonitorS, alignment: 'center'}],
            ['Communication equipment', {text: CommunicationEquipmentNA, alignment: 'center'}, {text: CommunicationEquipmentU, alignment: 'center'}, {text: CommunicationEquipmentS, alignment: 'center'}],
            ['Job Specific training (Other equipment (please specify)', {text: OtherEquipmentNA, alignment: 'center'}, {text: OtherEquipmentU, alignment: 'center'}, {text: OtherEquipmentS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ PersonalEquipmentComments}]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25],
          body: [
            [{text:'Safety Equipment ', style: 'tableHeader'},{text:'N/A', style: 'tableHeader', alignment: 'center'},{text: 'U', style: 'tableHeader', alignment: 'center'},{text:'S', style: 'tableHeader', alignment: 'center'}],
            ['Is the appropriate safety equipment available and being used', {text: SafetyEquipmentAvailableNA, alignment: 'center'}, {text: SafetyEquipmentAvailableU, alignment: 'center'}, {text: SafetyEquipmentAvailableS, alignment: 'center'}],
            ['Fire Fighting equipment (inspected, tagged, accessible, good condition)', {text: FireFightingEquipmentNA, alignment: 'center'}, {text: FireFightingEquipmentU, alignment: 'center'}, {text: FireFightingEquipmentS, alignment: 'center'}],
            ['Rotating equipment guards', {text: RotatingEquimentGuardsNA, alignment: 'center'}, {text: RotatingEquimentGuardsU, alignment: 'center'}, {text: RotatingEquimentGuardsS, alignment: 'center'}],
            ['First aid kit', {text: FirstAidKitNA, alignment: 'center'}, {text: FirstAidKitU, alignment: 'center'}, {text: FirstAidKitS, alignment: 'center'}],
            ['Fall Arrest equipment (Ladders, steps, harness, lanyards, etc.)', {text: FallArrestEquipmentNA, alignment: 'center'}, {text: FallArrestEquipmentU, alignment: 'center'}, {text: FallArrestEquipmentS, alignment: 'center'}],
            ['Emergency Shut down and Alarm Systems (positive air shutoffs, backup alarms, etc.)', {text: EmergencySystemsNA, alignment: 'center'}, {text: EmergencySystemsU, alignment: 'center'}, {text: EmergencySystemsS, alignment: 'center'}],
            ['Other (Specify) ', {text: OtherNA, alignment: 'center'}, {text: OtherU, alignment: 'center'}, {text: OtherS, alignment: 'center'}],
            [{colSpan: 4, text: 'Comments\n'+ SafetyEquipmentComments}]
          ]
        }
      },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Corrective action required: \n\n' + correctiveAction.CorrectiveActionRequired
          }
        ]
      },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Date for corrective actions to be completed: \n\n' + correctiveAction.DateCorrectiveActionToBeCompleted
          }
        ]
      },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Person(s) responsible for corrective actions: \n\n' + correctiveAction.PersonResonsibleCorrectiveAction
          }
        ]
      },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Date corrective actions were complete \n\n' + correctiveAction.DateCorrectiveActionCompleted
          },
          {
            text: 'Signature of person responsible \n\n' + correctiveAction.PersonResonsible
          }
        ]
      },
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
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  pdfDoc.pipe(fs.createWriteStream(pdfPath))
  pdfDoc.end()

  // update form data with path to pdf
  client.release()

}

module.exports = spotCheckSafetyPDF
