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

async function vehicleInspectionPDF(path, reportData, messages, pics, signDate ) {

  let currentPath = process.cwd()
  
  let dateSigned = 'To be determined'
  if (signDate) dateSigned = signDate


  let header = reportData.header
  let detail = reportData.detail

  // let inspectionArray = []
  // let inspections = 'No Inspection Data'

  // const inspectionHeader = {
  //   header: {
  //     col_1: { text: 'Inspection Completed', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
  //     col_2: { text: 'Type', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
  //     col_3: { text: 'Action Items', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
  //     col_4: { text: 'Corrective Action', style: 'tableHeader', alignment: 'center' },
  //     col_5: { text: 'Corrective Action Date', style: 'tableHeader', alignment: 'center' },
  //   }
  // }

  // for (let key in inspection.rows) {
  //   if (inspection.rows.hasOwnProperty(key)) {
  //     const data = inspectionData[key];
  //     const row = new Array();
  //     row.push(null);
  //     row.push(data.type);
  //     row.push(data.corrective_action_label);
  //     row.push(data.corrective_action);
  //     row.push(data.action_item);
  //     inspectionArray.push(row);
  //   }
  // }

  // if (inspectionArray.length == 0) {let inspections = 'No Inspection Data'}
  // let descrepancy = formData.rows[0]["data"]["discrepancy"]["Discrepancy"]

  IgnitionKey = detail.IgnitionKey ? '√ Ignition Key' : 'Ignition Key'
  FuelKey = detail.FuelKey ? '√ Fuel Key, if used' : 'Fuel Key, if used'
  OilLevel = detail.OilLevel ? '√ Oil Level' : 'Oil Level'
  WasherFluidLevel = detail.WasherFluidLevel ? '√ Washer Fluid Level' : 'Washer Fluid Level'
  CoolantLevel = detail.CoolantLevel ? '√ Coolant Level' : 'Coolant Level'
  PowerSteeringFluidLevel = detail.PowerSteeringFluidLevel ? '√ Power Steering Fluid Level' : 'Power Steering Fluid Level'
  AirGauge = detail.AirGauge ? '√ Check for Air Gauge' : 'Check for Air Gauge'
  Horn = detail.Horn ? '√ Check Horn' : 'Check Horn'
  HeaterDefroster = detail.HeaterDefroster ? '√ Check Heater/Defroste' : 'Check Heater/Defroste'
  WindshieldWipersWashers = detail.WindshieldWipersWashers ? '√ Check Windshield Wipers/Washers' : 'Check Windshield Wipers/Washers'
  AllSignalLights = detail.AllSignalLights ? '√ Check all signal lights' : 'Check all signal lights'
  InteriorLights = detail.InteriorLights ? '√ Check Interior lights' : 'Check Interior lights'
  MirrorsDamageAdjustments = detail.MirrorsDamageAdjustments ? '√ Check Mirrors for damage and adjustments' : 'Check Mirrors for damage and adjustments'
  WindshieldVisibility = detail.WindshieldVisibility ? '√ Windshield clear visibility' : 'Windshield clear visibility'


  TwoWayRadio = detail.TwoWayRadio ? '√ Check Radio (Two-way check), if required' : 'Check Radio (Two-way check), if required'
  VisualInspectionExterior = detail.VisualInspectionExterior ? '√ Visual Inspection for Exterior Damage/Leaks under vehicle' : 'Visual Inspection for Exterior Damage/Leaks under vehicle'
  InsideEngineCompartment = detail.InsideEngineCompartment ? '√ Check inside Engine compartment for Leaks/loose items' : 'Check inside Engine compartment for Leaks/loose items'
  TransmissionFluidLevel = detail.TransmissionFluidLevel ? '√ Start Engine & check Transmission Fluid Level (Fluid should be hot)' : 'Start Engine & check Transmission Fluid\nLevel (Fluid should be hot)'
  HighlightSignal4wayTailBackup = detail.HighlightSignal4wayTailBackup ? '√ Check Highlight/Signal lights/4way flashes/Tail lights/Backup lights/Horn' : ' Check Highlight/Signal lights/4way\nflashes/Tail lights/Backup lights/Horn'
  FuelLevel = detail.FuelLevel ? '√ Check fuel level (Should Not be Less Than ½ Tank)' : 'Check fuel level (Should Not be Less Than ½ Tank)'
  FirstAidKit = detail.FirstAidKit ? '√ Check First Aid Kit on Board and full' : 'Check First Aid Kit on Board and full'
  FireExtinguisher = detail.FireExtinguisher ? '√ Check Fire Extinguisher on board/Gauge showing charged, proper seal, pin and inspection' : 'Check Fire Extinguisher on board/Gauge showing charged, proper seal, pin and\u200B\tinspection'
  SurvivalKit = detail.SurvivalKit ? '√ Survival kit (in winter): candles, blanket/sleeping bag, water' : 'Survival kit (in winter): candles, blanket/tsleeping bag, water'
  Tires = detail.Tires ? '√ Check Tires for wear and pressure (as per manufacturer)' : 'Check Tires for wear and pressure (as per manufacturer)'
  SpillKit = detail.SpillKit ? '√ Check Spill Kit, if required' : 'Check Spill Kit, if required'

  const docDefinition = {
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            image: currentPath+'/api/images/logo.png'
          },
          {
            text: 'Vehicle Inspection', style: 'header'
          }
        ]
      },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Date: ' + header.Date.slice(0, 10)
          },
          {
            text: 'Worker: ' + header.Worker
          },
          {
            text: 'Vehicle: ' + header.Year + ', ' + header.Make + ', ' + header.Model
          }
        ]
      },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Milage: ' + header.Mileage
          },
          {
            text: 'Registration Expiry Date: ' + header.RegistrationDate.slice(0, 10)
          }
        ]
      },
      '\nThe items on this inspection sheet should be checked monthly. A separate sheet should be filled out for each vehicle driven. Place an √ by any item that needs attention. Place a check mark by the rest. Any discrepancies should be detailed on the bottom of this sheet.\n\n',
      {
        columns: [
          {
            ul: [
              { text: IgnitionKey, listType: 'none' },
              { text: FuelKey, listType: 'none' },
              { text: OilLevel, listType: 'none' },
              { text: WasherFluidLevel, listType: 'none' },
              { text: CoolantLevel, listType: 'none' },
              { text: PowerSteeringFluidLevel, listType: 'none' },
              { text: AirGauge, listType: 'none' },
              { text: Horn, listType: 'none' },
              { text: HeaterDefroster, listType: 'none' },
              { text: WindshieldWipersWashers, listType: 'none' },
              { text: AllSignalLights, listType: 'none' },
              { text: InteriorLights, listType: 'none' },
              { text: MirrorsDamageAdjustments, listType: 'none' },
              { text: WindshieldVisibility, listType: 'none' },
              { text: TwoWayRadio, listType: 'none' },
              { text: VisualInspectionExterior, listType: 'none' },
            ]
          },
          {
            ul: [
              { text: InsideEngineCompartment, listType: 'none' },
              { text: TransmissionFluidLevel, listType: 'none' },
              { text: HighlightSignal4wayTailBackup, listType: 'none' },
              { text: FuelLevel, listType: 'none' },
              { text: FirstAidKit, listType: 'none' },
              { text: FireExtinguisher, listType: 'none' },
              { text: SurvivalKit, listType: 'none' },
              { text: Tires, listType: 'none' },
              { text: SpillKit, listType: 'none' }
            ]
          }
        ]
      },
      '\nAs you drive, continually check for any strange smells, sounds, vibrations, or Anything that does not feel right.\n',
      '\n**Vehicles should be serviced as per manufacturer’s recommendations and repairs made only by competent accredited personnel.\n',
      '\nFor monthly inspections done by the employee: This vehicle inspection was done by myself and not by an accredited mechanic. There were no issues or problems identified at the time of inspection and therefore, no corrective actions are necessary to be undertaken. The employee completing this form takes full responsibility of the completeness and accuracy of this inspection as per PP20 IP (Inspection Policy).\n\n',
      '\n\n',
      // {
      //   alignment: 'justify',
      //   text: 'Inspection Action Items', style: 'subheader'
      // },
      // '\n',
      //   inspections,
      // '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Driver’s Signature: ' + header.Worker
          },
          {
            text: 'Date: ' + header.Date.slice(0, 10)
          }
        ]
      },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Manager/Supervisor Signature: ' + header.Supervisor
          },
          {
            text: 'Date: ' + dateSigned
          }
        ],
        text: [
          { text: '', style: 'icon' }, //icon gift
          " my present"
        ]
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
      }
    }
  }

  // create pdf
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  pdfDoc.pipe(fs.createWriteStream(path + '.pdf'))
  pdfDoc.end()

}

module.exports = vehicleInspectionPDF
