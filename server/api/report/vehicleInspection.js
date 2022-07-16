const PdfPrinter = require('pdfmake')
const fs = require('fs')

async function vehicleInspectionPDF(path, reportData, messages, pics, signDate ) {

  let descrepancies = []
  let descrepancyActions = []

  let currentPath = process.cwd()

  const fonts = {
    Roboto: {
      normal: currentPath+'/api/fonts/Roboto-Regular.ttf',
      bold: currentPath+'/api/fonts/Roboto-Medium.ttf',
      italics: currentPath+'/api/fonts/Roboto-Italic.ttf',
      bolditalics: currentPath+'/api/fonts/Roboto-MediumItalic.ttf'
    }
  }

  const printer = new PdfPrinter(fonts)
  
  let dateSigned = 'To be determined'
  if (signDate) dateSigned = signDate

  let header = reportData.header
  let detail = reportData.detail
  let correctiveActions = reportData.correctiveActions
  let comments = reportData.comments

  descrepancies.push([
    { text: 'Description', style: 'tableHeader' }, 
    { text: 'Details', style: 'tableHeader' }
  ])
  if (comments && comments.length > 0) {
    comments.forEach(comment => {
      descrepancies.push([
        { text: comment.label }, 
        { text: comment.text }
      ])
    })
  }
  else  descrepancies.push([
    { text: 'No Discrepancies', colSpan: 2 }
  ])

  descrepancyActions.push([
    { text: 'Description', style: 'tableHeader' }, 
    { text: 'Details', style: 'tableHeader' }, 
    { text: 'Date Requested', style: 'tableHeader' }, 
    { text: 'Date Completed', style: 'tableHeader' }, 
    { text: 'Person Responsible', style: 'tableHeader' }
  ])
  if (correctiveActions && correctiveActions.length > 0) {
    correctiveActions.forEach(action => {
      descrepancyActions.push([
        { text: action.label }, 
        { text: action.correctiveActionRequired }, 
        { text: action.dateToComplete?.slice(0, 10) }, 
        { text: action.dateCompleted?.slice(0, 10) }, 
        { text: action.personResponsible }
      ])
    })
  }
  else descrepancyActions.push([
    { text: 'No corrective actions', colSpan: 5 }
  ])

  IgnitionKey = detail.IgnitionKey ? '√ Ignition Key' : 'Ignition Key'
  FuelKey = detail.FuelKey ? '√ Fuel Key, check used' : 'Fuel Key, check used'
  OilLevel = detail.OilLevel ? '√ Oil Level' : 'Oil Level'
  WasherFluidLevel = detail.WasherFluidLevel ? '√ Washer Fluid Level' : 'Washer Fluid Level'
  CoolantLevel = detail.CoolantLevel ? '√ Coolant Level' : 'Coolant Level'
  PowerSteeringFluidLevel = detail.PowerSteeringFluidLevel ? '√ Power Steering Fluid Level' : 'Power Steering Fluid Level'
  AirGauge = detail.AirGauge ? '√ Check for Air Gauge' : 'Check for Air Gauge'
  Horn = detail.Horn ? '√ Check Horn' : 'Check Horn'
  HeaterDefroster = detail.HeaterDefroster ? '√ Check Heater/Defroster' : 'Check Heater/Defroster'
  WindshieldWipersWashers = detail.WindshieldWipersWashers ? '√ Check Windshield Wipers/Washers' : 'Check Windshield Wipers/Washers'
  AllSignalLights = detail.AllSignalLights ? '√ Check all signal lights' : 'Check all signal lights'
  InteriorLights = detail.InteriorLights ? '√ Check Interior lights' : 'Check Interior lights'
  MirrorsDamageAdjustments = detail.MirrorsDamageAdjustments ? '√ Check Mirrors for damage and adjustments' : 'Check Mirrors for damage and adjustments'
  WindshieldVisibility = detail.WindshieldVisibility ? '√ Windshield clear visibility, no cracks' : 'Windshield clear visibility, no cracks'

  TwoWayRadio = detail.TwoWayRadio ? '√ Check Radio (Two-way check), if required' : 'Check Radio (Two-way check), if required'
  VisualInspectionExterior = detail.VisualInspectionExterior ? '√ Visual Inspection for Exterior Damage/Leaks under vehicle' : 'Visual Inspection for Exterior Damage/Leaks under vehicle'
  InsideEngineCompartment = detail.InsideEngineCompartment ? '√ Check inside Engine compartment for Leaks/loose items' : 'Check inside Engine compartment for Leaks/loose items'
  TransmissionFluidLevel = detail.TransmissionFluidLevel ? '√ Start Engine & check Transmission Fluid Level (Fluid should be hot)' : 'Start Engine & check Transmission Fluid\nLevel (Fluid should be hot)'
  HighlightSignal4wayTailBackup = detail.HighlightSignal4wayTailBackup ? '√ Check Highlight/Signal lights/4way flashes/Tail lights/Backup lights/Horn' : ' Check Highlight/Signal lights/4way\nflashes/Tail lights/Backup lights'
  FuelLevel = detail.FuelLevel ? '√ Check fuel level (Should Not be Less Than ½ Tank)' : 'Check fuel level (Should Not be Less Than ½ Tank)'
  FirstAidKit = detail.FirstAidKit ? '√ Check First Aid Kit available and full, check expiry dates on contents' : 'Check First Aid Kit available and full, check expiry dates on contents'
  FireExtinguisher = detail.FireExtinguisher ? '√ Check Fire Extinguisher on board/Gauge showing charged, proper seal, pin and inspection' : 'Check Fire Extinguisher on board/Gauge showing charged, proper seal, pin and\u200B\tinspection'
  SurvivalKit = detail.SurvivalKit ? '√ Survival kit: candles, emergency blanket, tow rope, booster cables, light sticks, water' : 'Survival kit: candles, emergency blanket, tow rope, booster cables, light sticks, water'
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
      '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Date: ' + header.Date?.slice(0, 10)
          }
        ]
      },
      '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Worker: ' + header.Worker + '  Stakeholder: ' + header.Stakeholder + '  Division: ' + header.Division
          }
        ]
      },
      '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Unit #: ' + 
            header.UnitNumber + 
            ' License Plate #: ' + 
            header.LicensePlate +
            '  Milage: ' + 
            header.Mileage + 
            '  Insurance Expiry Date: ' + 
            header.RegistrationDate?.slice(0, 10)
          }
        ]
      },
      '\nThe items on this inspection sheet should be checked monthly. A separate sheet should be filled out for each vehicle driven. Place an √ by any item that needs attention. Any discrepancies should be detailed on the bottom of this sheet.\n\n',
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
      {
        alignment: 'justify',
        text: 'Discrepancies', 
        style: 'subheader', 
        pageBreak: 'before'
      },
      {
        table: {
          widths: ['*', '*'],
          body: descrepancies,
        }
      },
      '\n\n',
      {
        alignment: 'justify',
        text: 'Corrective Actions', style: 'subheader'
      },
      {
        table: {
          widths: ['*', '*', 100, 100, 100],
          body: descrepancyActions
        }
      },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Driver’s Signature: ' + header.Worker
          },
          {
            text: 'Date: ' + header.Date?.slice(0, 10)
          }
        ]
      },
      '\n',
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
      'For monthly inspections done by the employee: This vehicle inspection was done by myself and not by an accredited mechanic. There were no issues or problems identified at the time of inspection and therefore, no corrective actions are necessary to be undertaken. The employee completing this form takes full responsibility of the completeness and accuracy of this inspection as per PP20 IP (Inspection Policy).\n\n',
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
