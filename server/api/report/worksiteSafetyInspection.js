const PdfPrinter = require('pdfmake')
const fs = require('fs')

async function worksiteSafetyInspectionPDF(path, reportData, messages, pics, signDate) {

  let descrepancies = []
  let descrepancyActions = []

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
  let jobsite = reportData.jobsite
  let fireExtinguisher = reportData.fireExtinguisher
  let erpPlanning = reportData.erpPlanning
  let ground = reportData.ground
  let equipment = reportData.equipment
  let confinedSpace = reportData.confinedSpace
  let hotWork = reportData.hotWork
  let correctiveActions = reportData.correctiveActions
  let comments = reportData.comments

  const formObj = Object.assign(hazard, jobsite, fireExtinguisher, erpPlanning, ground, equipment, confinedSpace, hotWork);

  Object.entries(formObj).forEach(([key, value]) => {
    if (value === 'yes') {
      formObj[`${key}`] = '√'
      formObj[`${key}No`] = ''
    }
    else if (value === 'na') {
      formObj[`${key}`] = ''
      formObj[`${key}No`] = ''
      formObj[`${key}Na`] = '√'
    }
    else if (value === null) {
      formObj[`${key}`] = ''
      formObj[`${key}No`] = ''
      formObj[`${key}Na`] = ''
    }
    else {
      formObj[`${key}`] = ''
      formObj[`${key}No`] = '√'
    }
  })

  descrepancies.push([
    { text: 'Description', style: 'tableHeader' }, { text: 'Details', style: 'tableHeader' }
  ])
  if (comments && comments.length > 0) {
    comments.forEach(comment => {
      descrepancies.push([
        { text: comment.label }, 
        { text: comment.text }
      ])
    })
  }
  else descrepancies.push([{ text: 'No descrepancies', colSpan: 2 }])

  descrepancyActions.push([
    { text: 'Description', style: 'tableHeader' }, 
    { text: 'Details', style: 'tableHeader' }, 
    { text: 'Date Requested', style: 'tableHeader' }, 
    { text: 'Date Completed', style: 'tableHeader' }, 
    { text: 'Person Responsible', style: 'tableHeader' }])

  if (correctiveActions && correctiveActions.length > 0) {
    correctiveActions.forEach(action => {
    
      descrepancyActions.push([
        { text: action.label }, 
        { text: action.correctiveActionRequired }, 
        { text: action.dateToComplete.slice(0, 10) }, 
        { text: action.dateCompleted.slice(0, 10)}, 
        { text: action.personResponsible }])
    })
  }
  else descrepancyActions.push([{ text: 'No corrective actions', colSpan: 5 }])

  if (header.Location === null) header.Location = ''
  if (header.LSDUWI === null) header.LSDUWI = ''
  if (header.STARSSiteNumber === null) header.STARSSiteNumber = ''

  const docDefinition = {
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            image: currentPath + '/api/images/logo.png'
          }
        ]
      },
      '\n',
      {
        alignment: 'center',
        columns: [
          {
            text: 'Worksite Safety Inspection Checklist', style: 'header'
          }
        ]
      },
      '\n',
      {
        columns: [
          {
            text: 'Date: ' + header.Date.slice(0, 10)
          }
        ]
      },
      '\n',
      {
        columns: [
          {
            text: 'Client: ' + header.Client
          },
          {
            text: 'Location: ' + header.Location
          },
          {
            text: 'LSD/UWI: ' + header.LSDUWI
          }
        ]
      },
      '\n',
      {
        columns: [
          {
            text: 'Site Supervisor: ' + header.Supervisor
          },
          {
            text: 'Supervisor Phone: ' + header.SupervisorPhone
          }
        ]
      },
      '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Job/Project#: ' + header.JobNumber
          },
          {
            text: 'STARS Site # (if applicable): ' + header.STARSSiteNumber
          }
        ]
      },
      '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Scope of Work: ' + header.ScopeOfWork
          }
        ]
      },
      '\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, '*', 25, 25],
          body: [
            [
              { text: 'Hazard Identification and Communication', style: 'tableHeader' },
              { text: 'Y', style: 'tableHeader', alignment: 'center' },
              { text: 'N', style: 'tableHeader', alignment: 'center' },
              { text: '', style: 'tableHeader', alignment: 'center' },
              { text: 'Y', style: 'tableHeader', alignment: 'center' },
              { text: 'N', style: 'tableHeader', alignment: 'center' }
            ],
            [
              'Site Hazard Assessment completed',
              { text: formObj.SiteHazardAssessmentCompleted, alignment: 'center' },
              { text: formObj.SiteHazardAssessmentCompletedNo, alignment: 'center' },
              'Scope of work for the project clearly defined',
              { text: formObj.ScopeOfWorkClearlyDefined, alignment: 'center' },
              { text: formObj.ScopeOfWorkClearlyDefinedNo, alignment: 'center' },
            ],
            [
              'Daily safety meetings conducted and documented',
              { text: formObj.DailySafetyMeetingsConductedDocumented, alignment: 'center' },
              { text: formObj.DailySafetyMeetingsConductedDocumentedNo, alignment: 'center' },
              'Potential hazards and mitigation requirements identified in hazard assessment',
              { text: formObj.PotentialHazardsAndMitigationRequirementsIdentified, alignment: 'center' },
              { text: formObj.PotentialHazardsAndMitigationRequirementsIdentifiedNo, alignment: 'center' }
            ],
            [
              'All site personal have the appropriate training and safety tickets',
              { text: formObj.AllSitePersonalTrainingAndSafetyTickets, alignment: 'center' },
              { text: formObj.AllSitePersonalTrainingAndSafetyTicketsNo, alignment: 'center' },
              'Summit Health and Safety manual available',
              { text: formObj.SummitHealthAndSafetyManualAvailable, alignment: 'center' },
              { text: formObj.SummitHealthAndSafetyManualAvailableNo, alignment: 'center' }
            ],
            [
              'Occupational Health And Safety legislation available',
              { text: formObj.OccupationalHealthAndSafetyLegislationAvailable, alignment: 'center' },
              { text: formObj.OccupationalHealthAndSafetyLegislationAvailableNo, alignment: 'center' },
              'All site personnel are wearing site-specific PPE',
              { text: formObj.AllSitePersonnelSiteSpecificWearingPPE, alignment: 'center' },
              { text: formObj.AllSitePersonnelSiteSpecificWearingPPENo, alignment: 'center' }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25, '*', 25, 25, 25],
          body: [
            [{ text: 'Job Site Management', style: 'tableHeader' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: 'N/A', style: 'tableHeader', alignment: 'center' }, { text: '', style: 'tableHeader', alignment: 'center' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: 'N/A', style: 'tableHeader', alignment: 'center' }],
            [
              'Site is free of trip hazards and other housekeeping concerns',
              { text: formObj.SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns, alignment: 'center' },
              { text: formObj.SiteIsFreeOfTripHazardsAndOtherHousekeepingConcernsNo, alignment: 'center' },
              { text: formObj.SiteIsFreeOfTripHazardsAndOtherHousekeepingConcernsNa, alignment: 'center' },
              'Blankets and stretcher available',
              { text: formObj.BlanketsAndStretcherAvailable, alignment: 'center' },
              { text: formObj.BlanketsAndStretcherAvailableNo, alignment: 'center' },
              { text: formObj.BlanketsAndStretcherAvailableNa, alignment: 'center' }
            ],
            [
              'All open excavations are clearly marked',
              { text: formObj.AllOpenExcavationsAreClearlyMarked, alignment: 'center' },
              { text: formObj.AllOpenExcavationsAreClearlyMarkedNo, alignment: 'center' },
              { text: formObj.AllOpenExcavationsAreClearlyMarkedNa, alignment: 'center' },
              'Eye wash bottle available',
              { text: formObj.EyeWashBottleAvailable, alignment: 'center' },
              { text: formObj.EyeWashBottleAvailableNo, alignment: 'center' },
              { text: formObj.EyeWashBottleAvailableNa, alignment: 'center' }
            ],
            [
              'Public access to the site controlled',
              { text: formObj.PublicAccessToTheSiteControlled, alignment: 'center' },
              { text: formObj.PublicAccessToTheSiteControlledNo, alignment: 'center' },
              { text: formObj.PublicAccessToTheSiteControlledNa, alignment: 'center' },
              'Spill kit available',
              { text: formObj.SpillKitAvailable, alignment: 'center' },
              { text: formObj.SpillKitAvailableNo, alignment: 'center' },
              { text: formObj.SpillKitAvailableNa, alignment: 'center' }
            ],
            [
              'Prime contractor clearly identified with signage',
              { text: formObj.PrimeContractorClearlyIdentifiedWithSignage, alignment: 'center' },
              { text: formObj.PrimeContractorClearlyIdentifiedWithSignageNo, alignment: 'center' },
              { text: formObj.PrimeContractorClearlyIdentifiedWithSignageNa, alignment: 'center' },
              'The H2S personal gas monitors onsite have been bumped',
              { text: formObj.H2SPersonalGasMonitorsOnsiteHaveBeenBumped, alignment: 'center' },
              { text: formObj.H2SPersonalGasMonitorsOnsiteHaveBeenBumpedNo, alignment: 'center' },
              { text: formObj.H2SPersonalGasMonitorsOnsiteHaveBeenBumpedNa, alignment: 'center' }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, '*', 25, 25],
          pageBreak: 'before',
          body: [
            [{ text: 'Fire Extinguisher(s)', style: 'tableHeader' }, { text: 'Y', alignment: 'center' }, { text: 'N', alignment: 'center' }, { text: ' ' }, { text: 'Y', alignment: 'center' }, { text: 'N', alignment: 'center' }],
            [
              '20 lb minimum fire extinguisher available',
              { text: formObj.TwentyPoundMinimumFireExtinguisherAvailable, alignment: 'center' },
              { text: formObj.TwentyPoundMinimumFireExtinguisherAvailableNo, alignment: 'center' },
              { text: 'Fire extinguisher safety pins are in place and secured to prevent an accidental discharge' },
              { text: formObj.FireExtinguisherSafetyPinSecured, alignment: 'center' },
              { text: formObj.FireExtinguisherSafetyPinSecuredNo, alignment: 'center' }
            ],
            [
              'Fire extinguisher(s) tag attached - Inspected monthly and recorded',
              { text: formObj.FireExtinguisherInspected, alignment: 'center' },
              { text: formObj.FireExtinguisherInspectedNo, alignment: 'center' },
              { text: 'Fire extinguishers operating instructions on the name plate are legible and face outwards' },
              { text: formObj.FireExtinguisherOperatingInstructions, alignment: 'center' },
              { text: formObj.FireExtinguisherOperatingInstructionsNo, alignment: 'center' }
            ],
            [
              'Fire extinguisher(s) visible and unobstructed',
              { text: formObj.FireExtinguisherVisibleUnobstructed, alignment: 'center' },
              { text: formObj.FireExtinguisherVisibleUnobstructedNo, alignment: 'center' },
              { text: 'No signs of visible damage to fire extinguisher (rust, dents or other signs of damage)' },
              { text: formObj.FireExtinguisherNoVisibleDamage, alignment: 'center' },
              { text: formObj.FireExtinguisherNoVisibleDamageNo, alignment: 'center' }
            ],
            [
              'Fire extinguishers showing charge (gauge indicator must be in the green zone indicating it is fully charged)',
              { text: formObj.FireExtinguisherCharged, alignment: 'center' },
              { text: formObj.FireExtinguisherChargedNo, alignment: 'center' },
              { text: 'External fire extinguisher certification within 12 months (must be certified by 3rd party annually)' },
              { text: formObj.FireExtinguisherCertification, alignment: 'center' },
              { text: formObj.FireExtinguisherCertificationNo, alignment: 'center' }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25, '*', 25, 25, 25],
          body: [
            [{ text: 'Emergency Response Planning', style: 'tableHeader' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: 'N/A', style: 'tableHeader', alignment: 'center' }, { text: '', style: 'tableHeader', alignment: 'center' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: 'N/A', style: 'tableHeader', alignment: 'center' }],
            [
              'Emergency Response Plan (ERP) onsite',
              { text: formObj.EmergencyResponsePlanOnSite, alignment: 'center' },
              { text: formObj.EmergencyResponsePlanOnSiteNo, alignment: 'center' },
              { text: formObj.EmergencyResponsePlanOnSiteNa, alignment: 'center' },
              { text: 'STARS # (if applicable)' },
              { text: formObj.STARSNumberYes, alignment: 'center' },
              { text: formObj.STARSNumberNo, alignment: 'center' },
              { text: formObj.STARSNumberNa, alignment: 'center' }
            ],
            [
              'Muster point(s) identified',
              { text: formObj.MusterPointsIdentified, alignment: 'center' },
              { text: formObj.MusterPointsIdentifiedNo, alignment: 'center' },
              { text: formObj.MusterPointsIdentifiedNa, alignment: 'center' },
              { text: 'ERP responder roles and responsibilities identified' },
              { text: formObj.ERPResponderRolesAndResponsibilitiesIdentified, alignment: 'center' },
              { text: formObj.ERPResponderRolesAndResponsibilitiesIdentifiedNo, alignment: 'center' },
              { text: formObj.ERPResponderRolesAndResponsibilitiesIdentifiedNa, alignment: 'center' }
            ],
            [
              'ERP includes directions to nearest hospital',
              { text: formObj.ERPIncludesDirectionsToNearestHospital, alignment: 'center' },
              { text: formObj.ERPIncludesDirectionsToNearestHospitalNo, alignment: 'center' },
              { text: formObj.ERPIncludesDirectionsToNearestHospitalNa, alignment: 'center' },
              'Cellular or radio coverage confirmed. If no, what communication is in place?',
              { text: formObj.CellularOrRadioCoverageConfirmed, alignment: 'center' },
              { text: formObj.CellularOrRadioCoverageConfirmedNo, alignment: 'center' },
              { text: formObj.CellularOrRadioCoverageConfirmedNa, alignment: 'center' }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25],
          body: [
            [{ text: 'Ground Disturbance', style: 'tableHeader' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }],
            [
              'Does the project involve ground disturbance If YES, complete the following',
              { text: formObj.DoesTheProjectInvolveGroundDisturbance, alignment: 'center' },
              { text: formObj.DoesTheProjectInvolveGroundDisturbanceNo, alignment: 'center' }
            ],
            [
              'Ground disturbance checklist is in place',
              { text: formObj.GroundDisturbanceChecklistIsInPlace, alignment: 'center' },
              { text: formObj.GroundDisturbanceChecklistIsInPlaceNo, alignment: 'center' }
            ],
            [
              '1-Call notification has been registered',
              { text: formObj.OneCallNotificationHasBeenRegistered, alignment: 'center' },
              { text: formObj.OneCallNotificationHasBeenRegisteredNo, alignment: 'center' }
            ],
            [
              'All underground lines within 5 metres of the work area manually exposed',
              { text: formObj.AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposed, alignment: 'center' },
              { text: formObj.AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposedNo, alignment: 'center' }
            ],
            [
              '30 metre search area around the work area clearly defined',
              { text: formObj.ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefined, alignment: 'center' },
              { text: formObj.ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefinedNo, alignment: 'center' }
            ],
            [
              'Third-party line locates completed within the search area',
              { text: formObj.ThirdPartyLineLocatesCompletedWithinTheSearchArea, alignment: 'center' },
              { text: formObj.ThirdPartyLineLocatesCompletedWithinTheSearchAreaNo, alignment: 'center' }
            ],
            [
              'All required crossing or proximity agreements in place',
              { text: formObj.AllRequiredCrossingOrProximityAgreementsInPlace, alignment: 'center' },
              { text: formObj.AllRequiredCrossingOrProximityAgreementsInPlaceNo, alignment: 'center' }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25],
          body: [
            [{ text: 'Confined Space', style: 'tableHeader' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }],
            [
              'Does the project involve Confined Space Entry?',
              { text: formObj.DoesTheProjectInvolveConfinedSpaceEntry, alignment: 'center' },
              { text: formObj.DoesTheProjectInvolveConfinedSpaceEntryNo, alignment: 'center' }
            ],
            [
              'Confined Space Permit Issued',
              { text: formObj.ConfinedSpacePermitIssued, alignment: 'center' },
              { text: formObj.ConfinedSpacePermitIssuedNo, alignment: 'center' }
            ],
            [
              'Workers have applicable safety training and competent to perform the work',
              { text: formObj.ConfinedSpaceSafetyTraining, alignment: 'center' },
              { text: formObj.ConfinedSpaceSafetyTrainingNo, alignment: 'center' }
            ],
            [
              'Safety Watch in place',
              { text: formObj.SafetyWatchInPlace, alignment: 'center' },
              { text: formObj.SafetyWatchInPlaceNo, alignment: 'center' }
            ],
            [
              'Rescue Plan Available',
              { text: formObj.RescuePlanAvailable, alignment: 'center' },
              { text: formObj.RescuePlanAvailableNo, alignment: 'center' }
            ]
          ]
        }
      },
      '\n\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25],
          pageBreak: 'before',
          body: [
            [{ text: 'Hot Work', style: 'tableHeader' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }],
            ['Does the project involve Hot Work (work that could produce a source of ignition, such as a spark or open flame)',
              { text: formObj.DoesTheProjectInvolveHotWork, alignment: 'center' },
              { text: formObj.DoesTheProjectInvolveHotWorkNo, alignment: 'center' }
            ],
            ['Hot Work Permit Issued',
              { text: formObj.HotWorkPermitIssued, alignment: 'center' },
              { text: formObj.HotWorkPermitIssuedNo, alignment: 'center' }
            ],
            ['Fire Hazards identified and controls in place',
              { text: formObj.FireHazardsIdentifiedControls, alignment: 'center' },
              { text: formObj.FireHazardsIdentifiedControlsNo, alignment: 'center' }
            ],
            [
              'Fire / Safety Watch Available',
              { text: formObj.FireSafetyWatchAvailable, alignment: 'center' },
              { text: formObj.FireSafetyWatchAvailableNo, alignment: 'center' }
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25, '*', 25, 25, 25],
          body: [
            [
              { text: 'Summit Vehicles & Equipment', style: 'tableHeader' },
              { text: 'Y', style: 'tableHeader', alignment: 'center' },
              { text: 'N', style: 'tableHeader', alignment: 'center' },
              { text: 'N/A', style: 'tableHeader', alignment: 'center' },
              { text: '', style: 'tableHeader', alignment: 'center' },
              { text: 'Y', style: 'tableHeader', alignment: 'center' },
              { text: 'N', style: 'tableHeader', alignment: 'center' },
              { text: 'N/A', style: 'tableHeader', alignment: 'center' }],
            [
              'Exterior of vehicle generally clean and free of visual defects',
              { text: formObj.ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefects, alignment: 'center' },
              { text: formObj.ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefectsNo, alignment: 'center' },
              { text: formObj.ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefectsNa, alignment: 'center' },
              'Headlights are in proper working condition',
              { text: formObj.HeadlightsAreInProperWorkingCondition, alignment: 'center' },
              { text: formObj.HeadlightsAreInProperWorkingConditionNo, alignment: 'center' },
              { text: formObj.HeadlightsAreInProperWorkingConditionNa, alignment: 'center' }
            ],
            [
              'Interior of vehicle kept tidy and clean',
              { text: formObj.InteriorOfVehicleKeptTidyAndClean, alignment: 'center' },
              { text: formObj.InteriorOfVehicleKeptTidyAndCleanNo, alignment: 'center' },
              { text: formObj.InteriorOfVehicleKeptTidyAndCleanNa, alignment: 'center' },
              { text: 'Signal lights are in proper working condition' },
              { text: formObj.SignalLightsAreInProperWorkingCondition, alignment: 'center' },
              { text: formObj.SignalLightsAreInProperWorkingConditionNo, alignment: 'center' },
              { text: formObj.SignalLightsAreInProperWorkingConditionNa, alignment: 'center' }
            ],
            [
              'Vehicle windshield free of major chips and cracks',
              { text: formObj.VehicleWindshieldFreeOfMajorChipsAndCracks, alignment: 'center' },
              { text: formObj.VehicleWindshieldFreeOfMajorChipsAndCracksNo, alignment: 'center' },
              { text: formObj.VehicleWindshieldFreeOfMajorChipsAndCracksNa, alignment: 'center' },
              { text: 'Emergency warning / strobe light equipped on vehicle' },
              { text: formObj.EmergencyWarningStrobeLightEquippedOnVehicle, alignment: 'center' },
              { text: formObj.EmergencyWarningStrobeLightEquippedOnVehicleNo, alignment: 'center' },
              { text: formObj.EmergencyWarningStrobeLightEquippedOnVehicleNa, alignment: 'center' }
            ],
            [
              'Daily pre-use vehicle inspection completed',
              { text: formObj.DailyPreUseVehicleInspectionCompleted, alignment: 'center' },
              { text: formObj.DailyPreUseVehicleInspectionCompletedNo, alignment: 'center' },
              { text: formObj.DailyPreUseVehicleInspectionCompletedNa, alignment: 'center' },
              { text: 'Safety / buggy whip equipped on vehicle' },
              { text: formObj.SafetyBuggyWhipEquippedOnVehicle, alignment: 'center' },
              { text: formObj.SafetyBuggyWhipEquippedOnVehicleNo, alignment: 'center' },
              { text: formObj.SafetyBuggyWhipEquippedOnVehicleNa, alignment: 'center' }
            ],
            [
              'Equipment pre-use inspection completed',
              { text: formObj.EquipmentPreUseInspectionCompleted, alignment: 'center' },
              { text: formObj.EquipmentPreUseInspectionCompletedNo, alignment: 'center' },
              { text: formObj.EquipmentPreUseInspectionCompletedNa, alignment: 'center' },
              { text: 'First aid kit equipped in vehicle' },
              { text: formObj.FirstAidKitEquippedInVehicle, alignment: 'center' },
              { text: formObj.FirstAidKitEquippedInVehicleNo, alignment: 'center' },
              { text: formObj.FirstAidKitEquippedInVehicleNa, alignment: 'center' }
            ],
            [
              'Cargo (internal and external) properly stowed and secured',
              { text: formObj.CargoIinternalAndExternalProperlyStowedAndSecured, alignment: 'center' },
              { text: formObj.CargoIinternalAndExternalProperlyStowedAndSecuredNo, alignment: 'center' },
              { text: formObj.CargoIinternalAndExternalProperlyStowedAndSecuredNa, alignment: 'center' },
              { text: 'Emergency survival kit equipped in vehicle' },
              { text: formObj.EmergencySurvivalKitEquippedInVehicle, alignment: 'center' },
              { text: formObj.EmergencySurvivalKitEquippedInVehicleNo, alignment: 'center' },
              { text: formObj.EmergencySurvivalKitEquippedInVehicleNa, alignment: 'center' }
            ],
            [
              'Horn is in proper working condition',
              { text: formObj.HornIsInProperWorkingCondition, alignment: 'center' },
              { text: formObj.HornIsInProperWorkingConditionNo, alignment: 'center' },
              { text: formObj.HornIsInProperWorkingConditionNa, alignment: 'center' }, '', '', '', ''
            ]
          ]
        }
      },
      {
        alignment: 'justify',
        text: 'Discrepancies', style: 'subheader'
      },
      {
        table: {
          widths: ['*', '*'],
          body: descrepancies,
        }
      },
      {
        alignment: 'justify',
        text: 'Corrective Actions', style: 'subheader', pageBreak: 'before'
      },
      {
        table: {
          widths: ['*', '*', 100, 100, 100],
          body: descrepancyActions
        }
      },
      '\n',
      {
        alignment: 'justify',
        text: 'Signatures', style: 'subheader'
      },
      '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Conducted by Signature: ' + header.Worker
          },
          {
            text: 'Date: ' + header.Date.slice(0, 10)
          }
        ],
      },
      '\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Summit Supervisor: ' + header.Supervisor
          },
          {
            text: 'Sign-off Date: ' + dateSigned
          }
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

module.exports = worksiteSafetyInspectionPDF
