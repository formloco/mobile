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

async function worksiteSafetyInspectionPDF(formID, path, docID, signDate, comments) {

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
  fs.readdir(path, (err, files) => {
    if (err) return;
    if (files && files.length > 0) {
      for (let j = 0; j < files.length; j++) {
        const img = path + '/' + files[j]
        images.push({ image: img, width: 500 })
      }
    }
  })

  let client = await pool.connect()
  let formData = await client.query(`SELECT * FROM "` + formID + `" WHERE id = $1`, [docID])

  let header = formData.rows[0]["data"]["header"]
  let hazard = formData.rows[0]["data"]["hazard"]
  let jobsite = formData.rows[0]["data"]["jobsite"]
  let fireExtinguisher = formData.rows[0]["data"]["fireExtinguisher"]
  let erpPlanning = formData.rows[0]["data"]["erpPlanning"]
  let ground = formData.rows[0]["data"]["ground"]
  let equipment = formData.rows[0]["data"]["equipment"]
  let confinedSpace = formData.rows[0]["data"]["confinedSpace"]
  let hotWork = formData.rows[0]["data"]["hotWork"]
  let descrepancy = formData.rows[0]["data"]["discrepancy"]
  let comment = formData.rows[0]["data"]["comment"]

  SiteHazardAssessmentCompletedYes = hazard.SiteHazardAssessmentCompleted == 'yes' ? '√' : ''

  // hazard
  ScopeOfWorkClearlyDefinedYes = hazard.ScopeOfWorkClearlyDefined == 'yes' ? '√' : ''
  PotentialHazardsAndMitigationRequirementsIdentifiedYes = hazard.PotentialHazardsAndMitigationRequirementsIdentified == 'yes' ? '√' : ''
  SummitHealthAndSafetyManualAvailableYes = hazard.SummitHealthAndSafetyManualAvailable == 'yes' ? '√' : ''
  OccupationalHealthAndSafetyLegislationAvailableYes = hazard.OccupationalHealthAndSafetyLegislationAvailable == 'yes' ? '√' : ''
  SafetyDataSheetYes = hazard.SafetyDataSheet == 'yes' ? '√' : ''
  DailySafetyMeetingsConductedDocumentedYes = hazard.DailySafetyMeetingsConductedDocumented == 'yes' ? '√' : ''
  AllSitePersonalTrainingAndSafetyTicketsYes = hazard.AllSitePersonalTrainingAndSafetyTickets == 'yes' ? '√' : ''
  H2SPersonalGasMonitorsOnsiteHaveBeenBumpedYes = hazard.H2SPersonalGasMonitorsOnsiteHaveBeenBumped == 'yes' ? '√' : ''
  AllSitePersonnelSiteSpecificWearingPPEYes = hazard.AllSitePersonnelSiteSpecificWearingPPE == 'yes' ? '√' : ''

  SiteHazardAssessmentCompletedNo = hazard.SiteHazardAssessmentCompleted == 'no' ? '√' : ''
  ScopeOfWorkClearlyDefinedNo = hazard.ScopeOfWorkClearlyDefined == 'no' ? '√' : ''
  PotentialHazardsAndMitigationRequirementsIdentifiedNo = hazard.PotentialHazardsAndMitigationRequirementsIdentified == 'no' ? '√' : ''
  SummitHealthAndSafetyManualAvailableNo = hazard.SummitHealthAndSafetyManualAvailable == 'no' ? '√' : ''
  OccupationalHealthAndSafetyLegislationAvailableNo = hazard.OccupationalHealthAndSafetyLegislationAvailable == 'no' ? '√' : ''
  SafetyDataSheetNo = hazard.SafetyDataSheet == 'no' ? '√' : ''
  DailySafetyMeetingsConductedDocumentedNo = hazard.DailySafetyMeetingsConductedDocumented == 'no' ? '√' : ''
  AllSitePersonalTrainingAndSafetyTicketsNo = hazard.AllSitePersonalTrainingAndSafetyTickets == 'no' ? '√' : ''
  H2SPersonalGasMonitorsOnsiteHaveBeenBumpedNo = hazard.H2SPersonalGasMonitorsOnsiteHaveBeenBumped == 'no' ? '√' : ''
  AllSitePersonnelSiteSpecificWearingPPENo = hazard.AllSitePersonnelSiteSpecificWearingPPE == 'no' ? '√' : ''

  // jobsite
  WorkAreaClearlyIdentifiedYes = jobsite.WorkAreaClearlyIdentified == 'yes' ? '√' : ''
  AppropriateAccessAndEgressRoutesAreEstablishedYes = jobsite.AppropriateAccessAndEgressRoutesAreEstablished == 'yes' ? '√' : ''
  SiteIsFreeOfTripHazardsAndOtherHousekeepingConcernsYes = jobsite.SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns == 'yes' ? '√' : ''
  AllOpenExcavationsAreClearlyMarkedYes = jobsite.AllOpenExcavationsAreClearlyMarked == 'yes' ? '√' : ''
  PublicAccessToTheSiteControlledYes = jobsite.PublicAccessToTheSiteControlled == 'yes' ? '√' : ''
  PrimeContractorClearlyIdentifiedWithSignageYes = jobsite.PrimeContractorClearlyIdentifiedWithSignage == 'yes' ? '√' : ''
  IsThereEmergencyEquipmentOnSiteYes = jobsite.IsThereEmergencyEquipmentOnSite == 'yes' ? '√' : ''
  FirstAidKitAvailableYes = jobsite.FirstAidKitAvailable == 'yes' ? '√' : ''
  BlanketsAndStretcherAvailableYes = jobsite.BlanketsAndStretcherAvailable == 'yes' ? '√' : ''
  EyeWashBottleAvailableYes = jobsite.EyeWashBottleAvailable == 'yes' ? '√' : ''
  SpillKitAvailableYes = jobsite.SpillKitAvailable == 'yes' ? '√' : ''

  WorkAreaClearlyIdentifiedNo = jobsite.WorkAreaClearlyIdentified == 'no' ? '√' : ''
  AppropriateAccessAndEgressRoutesAreEstablishedNo = jobsite.AppropriateAccessAndEgressRoutesAreEstablished == 'no' ? '√' : ''
  SiteIsFreeOfTripHazardsAndOtherHousekeepingConcernsNo = jobsite.SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns == 'no' ? '√' : ''
  AllOpenExcavationsAreClearlyMarkedNo = jobsite.AllOpenExcavationsAreClearlyMarked == 'no' ? '√' : ''
  PublicAccessToTheSiteControlledNo = jobsite.PublicAccessToTheSiteControlled == 'no' ? '√' : ''
  PrimeContractorClearlyIdentifiedWithSignageNo = jobsite.PrimeContractorClearlyIdentifiedWithSignage == 'no' ? '√' : ''
  IsThereEmergencyEquipmentOnSiteNo = jobsite.IsThereEmergencyEquipmentOnSite == 'no' ? '√' : ''
  FirstAidKitAvailableNo = jobsite.FirstAidKitAvailable == 'no' ? '√' : ''
  BlanketsAndStretcherAvailableNo = jobsite.BlanketsAndStretcherAvailable == 'no' ? '√' : ''
  EyeWashBottleAvailableNo = jobsite.EyeWashBottleAvailable == 'no' ? '√' : ''
  SpillKitAvailableNo = jobsite.SpillKitAvailable == 'no' ? '√' : ''

  WorkAreaClearlyIdentifiedNa = jobsite.WorkAreaClearlyIdentified == 'na' ? '√' : ''
  AppropriateAccessAndEgressRoutesAreEstablishedNa = jobsite.AppropriateAccessAndEgressRoutesAreEstablished == 'na' ? '√' : ''
  SiteIsFreeOfTripHazardsAndOtherHousekeepingConcernsNa = jobsite.SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns == 'na' ? '√' : ''
  AllOpenExcavationsAreClearlyMarkedNa = jobsite.AllOpenExcavationsAreClearlyMarked == 'na' ? '√' : ''
  PublicAccessToTheSiteControlledNa = jobsite.PublicAccessToTheSiteControlled == 'na' ? '√' : ''
  PrimeContractorClearlyIdentifiedWithSignageNa = jobsite.PrimeContractorClearlyIdentifiedWithSignage == 'na' ? '√' : ''
  IsThereEmergencyEquipmentOnSiteNa = jobsite.IsThereEmergencyEquipmentOnSite == 'na' ? '√' : ''
  FirstAidKitAvailableNa = jobsite.FirstAidKitAvailable == 'na' ? '√' : ''
  BlanketsAndStretcherAvailableNa = jobsite.BlanketsAndStretcherAvailable == 'na' ? '√' : ''
  BlanketsAndStretcherAvailableNa = jobsite.BlanketsAndStretcherAvailable == 'na' ? '√' : ''
  EyeWashBottleAvailableNa = jobsite.EyeWashBottleAvailable == 'na' ? '√' : ''
  SpillKitAvailableNa = jobsite.SpillKitAvailable == 'na' ? '√' : ''

  // FireExtinguisher
  TwentyPoundMinimumFireExtinguisherAvailableYes = fireExtinguisher.TwentyPoundMinimumFireExtinguisherAvailable == 'yes' ? '√' : ''
  FireExtinguisherInspectedYes = fireExtinguisher.FireExtinguisherInspected == 'yes' ? '√' : ''
  FireExtinguisherVisibleUnobstructedYes = fireExtinguisher.FireExtinguisherVisibleUnobstructed == 'yes' ? '√' : ''
  FireExtinguisherChargedYes = fireExtinguisher.FireExtinguisherCharged == 'yes' ? '√' : ''
  FireExtinguisherSafetyPinSecuredYes = fireExtinguisher.FireExtinguisherSafetyPinSecured == 'yes' ? '√' : ''
  FireExtinguisherOperatingInstructionsYes = fireExtinguisher.FireExtinguisherOperatingInstructions == 'yes' ? '√' : ''
  FireExtinguisherNoVisibleDamageYes = fireExtinguisher.FireExtinguisherNoVisibleDamage == 'yes' ? '√' : ''
  FireExtinguisherCertificationYes = fireExtinguisher.FireExtinguisherCertification == 'yes' ? '√' : ''

  TwentyPoundMinimumFireExtinguisherAvailableNo = fireExtinguisher.TwentyPoundMinimumFireExtinguisherAvailable == 'no' ? '√' : ''
  FireExtinguisherInspectedNo = fireExtinguisher.FireExtinguisherInspected == 'no' ? '√' : ''
  FireExtinguisherVisibleUnobstructedNo = fireExtinguisher.FireExtinguisherVisibleUnobstructed == 'no' ? '√' : ''
  FireExtinguisherChargedNo = fireExtinguisher.FireExtinguisherChargedNo == 'no' ? '√' : ''
  FireExtinguisherSafetyPinSecuredNo = fireExtinguisher.FireExtinguisherSafetyPinSecured == 'no' ? '√' : ''
  FireExtinguisherOperatingInstructionsNo = fireExtinguisher.FireExtinguisherOperatingInstructions == 'no' ? '√' : ''
  FireExtinguisherNoVisibleDamageNo = fireExtinguisher.FireExtinguisherNoVisibleDamage == 'no' ? '√' : ''
  FireExtinguisherCertificationNo = fireExtinguisher.FireExtinguisherCertification == 'no' ? '√' : ''

  //erpPlanning
  EmergencyResponsePlanOnSiteYes = erpPlanning.EmergencyResponsePlanOnSite == 'yes' ? '√' : ''
  MusterPointsIdentifiedYes = erpPlanning.MusterPointsIdentified == 'yes' ? '√' : ''
  STARSNumberYes = erpPlanning.STARSNumber == 'yes' ? '√' : ''
  ERPIncludesDirectionsToNearestHospitalYes = erpPlanning.ERPIncludesDirectionsToNearestHospital == 'yes' ? '√' : ''
  ERPResponderRolesAndResponsibilitiesIdentifiedYes = erpPlanning.ERPResponderRolesAndResponsibilitiesIdentified == 'yes' ? '√' : ''
  CellularOrRadioCoverageConfirmedYes = erpPlanning.CellularOrRadioCoverageConfirmed == 'yes' ? '√' : ''

  EmergencyResponsePlanOnSiteNo = erpPlanning.EmergencyResponsePlanOnSite == 'no' ? '√' : ''
  MusterPointsIdentifiedNo = erpPlanning.MusterPointsIdentified == 'no' ? '√' : ''
  STARSNumberNo = erpPlanning.STARSNumber == 'no' ? '√' : ''
  ERPIncludesDirectionsToNearestHospitalNo = erpPlanning.ERPIncludesDirectionsToNearestHospital == 'no' ? '√' : ''
  ERPResponderRolesAndResponsibilitiesIdentifiedNo = erpPlanning.ERPResponderRolesAndResponsibilitiesIdentified == 'no' ? '√' : ''
  CellularOrRadioCoverageConfirmedNo = erpPlanning.CellularOrRadioCoverageConfirmed == 'no' ? '√' : ''

  EmergencyResponsePlanOnSiteNa = erpPlanning.EmergencyResponsePlanOnSite == 'na' ? '√' : ''
  MusterPointsIdentifiedNa = erpPlanning.MusterPointsIdentified == 'na' ? '√' : ''
  STARSNumberNa = erpPlanning.STARSNumberNa == 'na' ? '√' : ''
  ERPIncludesDirectionsToNearestHospitalNa = erpPlanning.ERPIncludesDirectionsToNearestHospital == 'na' ? '√' : ''
  ERPResponderRolesAndResponsibilitiesIdentifiedNa = erpPlanning.ERPResponderRolesAndResponsibilitiesIdentified == 'na' ? '√' : ''
  CellularOrRadioCoverageConfirmedNa = erpPlanning.CellularOrRadioCoverageConfirmed == 'na' ? '√' : ''

  // ground
  DoesTheProjectInvolveGroundDisturbanceYes = ground.DoesTheProjectInvolveGroundDisturbance == 'yes' ? '√' : ''
  GroundDisturbanceChecklistIsInPlaceYes = ground.GroundDisturbanceChecklistIsInPlace == 'yes' ? '√' : ''
  OneCallNotificationHasBeenRegisteredYes = ground.OneCallNotificationHasBeenRegistered == 'yes' ? '√' : ''
  AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposedYes = ground.AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposed == 'yes' ? '√' : ''
  ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefinedYes = ground.ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefined == 'yes' ? '√' : ''
  ThirdPartyLineLocatesCompletedWithinTheSearchAreaYes = ground.ThirdPartyLineLocatesCompletedWithinTheSearchArea == 'yes' ? '√' : ''
  AllRequiredCrossingOrProximityAgreementsInPlaceYes = ground.AllRequiredCrossingOrProximityAgreementsInPlace == 'yes' ? '√' : ''

  DoesTheProjectInvolveGroundDisturbanceNo = ground.DoesTheProjectInvolveGroundDisturbance == 'no' ? '√' : ''
  GroundDisturbanceChecklistIsInPlaceNo = ground.GroundDisturbanceChecklistIsInPlace == 'no' ? '√' : ''
  OneCallNotificationHasBeenRegisteredNo = ground.OneCallNotificationHasBeenRegistered == 'no' ? '√' : ''
  AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposedNo = ground.AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposed == 'no' ? '√' : ''
  ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefinedNo = ground.ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefined == 'no' ? '√' : ''
  ThirdPartyLineLocatesCompletedWithinTheSearchAreaNo = ground.ThirdPartyLineLocatesCompletedWithinTheSearchArea == 'no' ? '√' : ''
  AllRequiredCrossingOrProximityAgreementsInPlaceNo = ground.AllRequiredCrossingOrProximityAgreementsInPlace == 'no' ? '√' : ''

  // confinedSpace
  DoesTheProjectInvolveConfinedSpaceEntryYes = confinedSpace.DoesTheProjectInvolveConfinedSpaceEntry == 'yes' ? '√' : ''
  ConfinedSpacePermitIssuedYes = confinedSpace.ConfinedSpacePermitIssued == 'yes' ? '√' : ''
  ConfinedSpaceSafetyTrainingYes = confinedSpace.ConfinedSpaceSafetyTraining == 'yes' ? '√' : ''
  SafetyWatchInPlaceYes = confinedSpace.SafetyWatchInPlace == 'yes' ? '√' : ''
  RescuePlanAvailableYes = confinedSpace.RescuePlanAvailable == 'yes' ? '√' : ''

  DoesTheProjectInvolveConfinedSpaceEntryNo = confinedSpace.DoesTheProjectInvolveConfinedSpaceEntry == 'no' ? '√' : ''
  ConfinedSpacePermitIssuedNo = confinedSpace.ConfinedSpacePermitIssued == 'no' ? '√' : ''
  ConfinedSpaceSafetyTrainingNo = confinedSpace.ConfinedSpaceSafetyTraining == 'no' ? '√' : ''
  SafetyWatchInPlaceNo = confinedSpace.SafetyWatchInPlace == 'no' ? '√' : ''
  RescuePlanAvailableNo = confinedSpace.RescuePlanAvailable == 'no' ? '√' : ''

  // hotWork
  DoesTheProjectInvolveHotWorkYes = hotWork.DoesTheProjectInvolveHotWork == 'yes' ? '√' : ''
  HotWorkPermitIssuedYes = hotWork.HotWorkPermitIssued == 'yes' ? '√' : ''
  FireHazardsIdentifiedControlsYes = hotWork.FireHazardsIdentifiedControls == 'yes' ? '√' : ''
  FireSafetyWatchAvailableYes = hotWork.FireSafetyWatchAvailable == 'yes' ? '√' : ''

  DoesTheProjectInvolveHotWorkNo = hotWork.DoesTheProjectInvolveHotWork == 'no' ? '√' : ''
  HotWorkPermitIssuedNo = hotWork.HotWorkPermitIssued == 'no' ? '√' : ''
  FireHazardsIdentifiedControlsNo = hotWork.FireHazardsIdentifiedControls == 'no' ? '√' : ''
  FireSafetyWatchAvailableNo = hotWork.FireSafetyWatchAvailable == 'no' ? '√' : ''

  // equipment
  ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefectsYes = equipment.ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefects == 'yes' ? '√' : ''
  InteriorOfVehicleKeptTidyAndCleanYes = equipment.InteriorOfVehicleKeptTidyAndClean == 'yes' ? '√' : ''
  VehicleWindshieldFreeOfMajorChipsAndCracksYes = equipment.VehicleWindshieldFreeOfMajorChipsAndCracks == 'yes' ? '√' : ''
  DailyPreUseVehicleInspectionCompletedYes = equipment.DailyPreUseVehicleInspectionCompleted == 'yes' ? '√' : ''
  EquipmentPreUseInspectionCompletedYes = equipment.EquipmentPreUseInspectionCompleted == 'yes' ? '√' : ''
  CargoIinternalAndExternalProperlyStowedAndSecuredYes = equipment.CargoIinternalAndExternalProperlyStowedAndSecured == 'yes' ? '√' : ''
  HornIsInProperWorkingConditionYes = equipment.HornIsInProperWorkingCondition == 'yes' ? '√' : ''
  HeadlightsAreInProperWorkingConditionYes = equipment.HeadlightsAreInProperWorkingCondition == 'yes' ? '√' : ''
  SignalLightsAreInProperWorkingConditionYes = equipment.SignalLightsAreInProperWorkingCondition == 'yes' ? '√' : ''
  EmergencyWarningStrobeLightEquippedOnVehicleYes = equipment.EmergencyWarningStrobeLightEquippedOnVehicle == 'yes' ? '√' : ''
  SafetyBuggyWhipEquippedOnVehicleYes = equipment.SafetyBuggyWhipEquippedOnVehicle == 'yes' ? '√' : ''
  FirstAidKitEquippedInVehicleYes = equipment.FirstAidKitEquippedInVehicle == 'yes' ? '√' : ''
  EmergencySurvivalKitEquippedInVehicleYes = equipment.EmergencySurvivalKitEquippedInVehicle == 'yes' ? '√' : ''

  ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefectsNo = equipment.ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefects == 'no' ? '√' : ''
  InteriorOfVehicleKeptTidyAndCleanNo = equipment.InteriorOfVehicleKeptTidyAndClean == 'no' ? '√' : ''
  VehicleWindshieldFreeOfMajorChipsAndCracksNo = equipment.VehicleWindshieldFreeOfMajorChipsAndCracks == 'no' ? '√' : ''
  DailyPreUseVehicleInspectionCompletedNo = equipment.DailyPreUseVehicleInspectionCompleted == 'no' ? '√' : ''
  EquipmentPreUseInspectionCompletedNo = equipment.EquipmentPreUseInspectionCompleted == 'no' ? '√' : ''
  CargoIinternalAndExternalProperlyStowedAndSecuredNo = equipment.CargoIinternalAndExternalProperlyStowedAndSecured == 'no' ? '√' : ''
  HornIsInProperWorkingConditionNo = equipment.HornIsInProperWorkingCondition == 'no' ? '√' : ''
  HeadlightsAreInProperWorkingConditionNo = equipment.HeadlightsAreInProperWorkingCondition == 'no' ? '√' : ''
  SignalLightsAreInProperWorkingConditionNo = equipment.SignalLightsAreInProperWorkingCondition == 'no' ? '√' : ''
  EmergencyWarningStrobeLightEquippedOnVehicleNo = equipment.EmergencyWarningStrobeLightEquippedOnVehicle == 'no' ? '√' : ''
  SafetyBuggyWhipEquippedOnVehicleNo = equipment.SafetyBuggyWhipEquippedOnVehicle == 'no' ? '√' : ''
  FirstAidKitEquippedInVehicleNo = equipment.FirstAidKitEquippedInVehicle == 'no' ? '√' : ''
  EmergencySurvivalKitEquippedInVehicleNo = equipment.EmergencySurvivalKitEquippedInVehicle == 'no' ? '√' : ''

  ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefectsNa = equipment.ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefects == 'na' ? '√' : ''
  InteriorOfVehicleKeptTidyAndCleanNa = equipment.InteriorOfVehicleKeptTidyAndClean == 'na' ? '√' : ''
  VehicleWindshieldFreeOfMajorChipsAndCracksNa = equipment.VehicleWindshieldFreeOfMajorChipsAndCracks == 'na' ? '√' : ''
  DailyPreUseVehicleInspectionCompletedNa = equipment.DailyPreUseVehicleInspectionCompleted == 'na' ? '√' : ''
  EquipmentPreUseInspectionCompletedNa = equipment.EquipmentPreUseInspectionCompleted == 'na' ? '√' : ''
  CargoIinternalAndExternalProperlyStowedAndSecuredNa = equipment.CargoIinternalAndExternalProperlyStowedAndSecured == 'na' ? '√' : ''
  HornIsInProperWorkingConditionNa = equipment.HornIsInProperWorkingCondition == 'na' ? '√' : ''
  HeadlightsAreInProperWorkingConditionNa = equipment.HeadlightsAreInProperWorkingCondition == 'na' ? '√' : ''
  SignalLightsAreInProperWorkingConditionNa = equipment.SignalLightsAreInProperWorkingCondition == 'na' ? '√' : ''
  EmergencyWarningStrobeLightEquippedOnVehicleNa = equipment.EmergencyWarningStrobeLightEquippedOnVehicle == 'na' ? '√' : ''
  SafetyBuggyWhipEquippedOnVehicleNa = equipment.SafetyBuggyWhipEquippedOnVehicle == 'na' ? '√' : ''
  FirstAidKitEquippedInVehicleNa = equipment.FirstAidKitEquippedInVehicle == 'na' ? '√' : ''
  EmergencySurvivalKitEquippedInVehicleNa = equipment.EmergencySurvivalKitEquippedInVehicle == 'na' ? '√' : ''

  const docDefinition = {
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            image: 'images/logo.png'
          },
          {
            text: 'Worksite Safety Inspection Checklist', style: 'header'
          }
        ]
      },
      '\n\n',
      {
        alignment: 'justify',
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
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Date: ' + header.Date.slice(0, 10)
          },
          {
            text: 'Site Supervisor: ' + header.Supervisor
          },
          {
            text: 'Supervisor Phone: ' + header.SupervisorPhone
          }
        ]
      },
      '\n\n',
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
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Scope of Work: ' + header.ScopeOfWork
          }
        ]
      },
      '\n\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, '*', 25, 25],
          body: [
            [{ text:'Hazard Identification and Communication',style: 'tableHeader'}, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: '', style: 'tableHeader', alignment: 'center' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }],
            ['Site Hazard Assessment completed', { text: SiteHazardAssessmentCompletedYes, alignment: 'center' }, { text: SiteHazardAssessmentCompletedNo, alignment: 'center' }, { text: 'Safety Data Sheet (SDS) Available' }, { text: SafetyDataSheetYes, alignment: 'center' }, { text: SafetyDataSheetNo, alignment: 'center' }],
            ['Scope of work for the project clearly defined', { text: ScopeOfWorkClearlyDefinedYes, alignment: 'center' }, { text: ScopeOfWorkClearlyDefinedNo, alignment: 'center' }, { text: 'Daily safety meetings conducted and documented' }, { text: DailySafetyMeetingsConductedDocumentedYes, alignment: 'center' }, { text: DailySafetyMeetingsConductedDocumentedNo, alignment: 'center' }],
            ['Potential hazards and mitigation requirements identified in hazard assessment', { text: PotentialHazardsAndMitigationRequirementsIdentifiedYes, alignment: 'center' }, { text: PotentialHazardsAndMitigationRequirementsIdentifiedNo, alignment: 'center' }, { text: 'All site personal have the appropriate training and safety tickets' }, { text: AllSitePersonalTrainingAndSafetyTicketsYes, alignment: 'center' }, { text: AllSitePersonalTrainingAndSafetyTicketsNo, alignment: 'center' }],
            ['Summit Health and Safety manual available', { text: SummitHealthAndSafetyManualAvailableYes, alignment: 'center' }, { text: SummitHealthAndSafetyManualAvailableNo, alignment: 'center' }, { text: 'The H2S personal gas monitors onsite have been bumped' }, { text: H2SPersonalGasMonitorsOnsiteHaveBeenBumpedYes, alignment: 'center' }, { text: H2SPersonalGasMonitorsOnsiteHaveBeenBumpedNo, alignment: 'center' }],
            ['Occupational Health And Safety legislation available', { text: OccupationalHealthAndSafetyLegislationAvailableYes, alignment: 'center' }, OccupationalHealthAndSafetyLegislationAvailableNo, { text: 'All site personnel are wearing site-specific PPE' }, { text: AllSitePersonnelSiteSpecificWearingPPEYes, alignment: 'center' }, { text: AllSitePersonnelSiteSpecificWearingPPENo, alignment: 'center' }],
          ]
        }
      },
      '\n\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25, '*', 25, 25, 25],
          body: [
            [{ text: 'Job Site Management', style: 'tableHeader'}, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: 'N/A', style: 'tableHeader', alignment: 'center' }, { text: '', style: 'tableHeader', alignment: 'center' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: 'N/A', style: 'tableHeader', alignment: 'center' }],
            ['Work area is clearly identified Appropriate access and egress routes are established', { text: WorkAreaClearlyIdentifiedYes, alignment: 'center' }, { text: WorkAreaClearlyIdentifiedNo, alignment: 'center' }, { text: WorkAreaClearlyIdentifiedNa, alignment: 'center' }, { text: 'Is there emergency equipment on site?', alignment: 'center' }, { text: IsThereEmergencyEquipmentOnSiteYes, alignment: 'center' }, { text: IsThereEmergencyEquipmentOnSiteNo, alignment: 'center' }, { text: IsThereEmergencyEquipmentOnSiteNa, alignment: 'center' }],
            ['Appropriate access and egress routes are established', { text: AppropriateAccessAndEgressRoutesAreEstablishedYes, alignment: 'center' }, { text: AppropriateAccessAndEgressRoutesAreEstablishedNo, alignment: 'center' }, { text: AppropriateAccessAndEgressRoutesAreEstablishedNa, alignment: 'center' }, { text: 'First aid kit available and stocked', alignment: 'center' }, { text: FirstAidKitAvailableYes, alignment: 'center' }, { text: FirstAidKitAvailableNo, alignment: 'center' }, { text: FirstAidKitAvailableNa, alignment: 'center' }],
            ['Site is free of trip hazards and other housekeeping concerns', { text: SiteIsFreeOfTripHazardsAndOtherHousekeepingConcernsYes, alignment: 'center' }, { text: SiteIsFreeOfTripHazardsAndOtherHousekeepingConcernsNo, alignment: 'center' }, { text: SiteIsFreeOfTripHazardsAndOtherHousekeepingConcernsNa, alignment: 'center' }, { text: 'Blankets and stretcher available', alignment: 'center' }, { text: BlanketsAndStretcherAvailableYes, alignment: 'center' }, { text: BlanketsAndStretcherAvailableNo, alignment: 'center' }, { text: BlanketsAndStretcherAvailableNa, alignment: 'center' }],
            ['All open excavations are clearly marked', { text: AllOpenExcavationsAreClearlyMarkedYes, alignment: 'center' }, { text: AllOpenExcavationsAreClearlyMarkedNo, alignment: 'center' }, { text: AllOpenExcavationsAreClearlyMarkedNa, alignment: 'center' }, { text: 'Eye wash bottle available', alignment: 'center' }, { text: EyeWashBottleAvailableYes, alignment: 'center' }, { text: EyeWashBottleAvailableNo, alignment: 'center' }, { text: EyeWashBottleAvailableNa, alignment: 'center' }],
            ['Public access to the site controlled', { text: PublicAccessToTheSiteControlledYes, alignment: 'center' }, { text: PublicAccessToTheSiteControlledNo, alignment: 'center' }, { text: PublicAccessToTheSiteControlledNa, alignment: 'center' }, { text: 'Spill kit available', alignment: 'center' }, { text: SpillKitAvailableYes, alignment: 'center' }, { text: SpillKitAvailableNo, alignment: 'center' }, { text: SpillKitAvailableNa, alignment: 'center' }],
            ['Prime contractor clearly identified with signage', { text: PrimeContractorClearlyIdentifiedWithSignageYes, alignment: 'center' }, { text: PrimeContractorClearlyIdentifiedWithSignageNo, alignment: 'center' }, { text: PrimeContractorClearlyIdentifiedWithSignageNa, alignment: 'center'},'','','','']
          ]
        }
      },
      '\n\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, '*', 25, 25],
          body: [
            [{ text:'Fire Extinguisher(s)', style: 'tableHeader'}, { text: 'Y', alignment: 'center' }, { text:'N',alignment: 'center' },  { text:' '}, { text: 'Y',alignment: 'center' }, { text: 'N', alignment: 'center' }],
            ['20 lb minimum fire extinguisher available', { text: TwentyPoundMinimumFireExtinguisherAvailableYes, alignment: 'center' }, { text: TwentyPoundMinimumFireExtinguisherAvailableNo, alignment: 'center' }, { text: 'Fire extinguisher safety pins are in place and secured to prevent an accidental discharge' }, { text: FireExtinguisherSafetyPinSecuredYes, alignment: 'center' }, { text: FireExtinguisherSafetyPinSecuredNo, alignment: 'center' }],
            ['Fire extinguisher(s) tag attached - Inspected monthly and recorded', { text: FireExtinguisherInspectedYes, alignment: 'center' }, { text: FireExtinguisherInspectedNo, alignment: 'center' }, { text: 'Fire extinguishers operating instructions on the name plate are legible and face outwards' }, { text: FireExtinguisherOperatingInstructionsYes, alignment: 'center' }, { text: FireExtinguisherOperatingInstructionsNo, alignment: 'center' }],
            ['Fire extinguisher(s) visible and unobstructed', { text: FireExtinguisherVisibleUnobstructedYes, alignment: 'center' }, { text: FireExtinguisherVisibleUnobstructedNo, alignment: 'center' }, { text: 'No signs of visible damage to fire extinguisher (rust, dents or other sighs of damage)' }, { text: FireExtinguisherNoVisibleDamageYes, alignment: 'center' }, { text: FireExtinguisherNoVisibleDamageNo, alignment: 'center' }],
            ['Fire extinguishers showing charge (gauge indicator must be in the green zone indicating it is fully charged)', { text: FireExtinguisherChargedYes, alignment: 'center' }, { text: FireExtinguisherChargedNo, alignment: 'center' }, { text: 'External fire extinguisher certification within 12 months (must be certified by 3rd party annually)' }, { text: FireExtinguisherCertificationYes, alignment: 'center' }, { text: FireExtinguisherCertificationNo, alignment: 'center' }],
          ]
        }
      },
      '\n\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25, '*', 25, 25, 25],
          body: [
            [{ text:'Emergency Response Planning', style: 'tableHeader'}, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: 'N/A', style: 'tableHeader', alignment: 'center' }, { text: '', style: 'tableHeader', alignment: 'center' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: 'N/A', style: 'tableHeader', alignment: 'center' }],
            ['Emergency Response Plan (ERP) onsite', { text: EmergencyResponsePlanOnSiteYes, alignment: 'center' }, { text: EmergencyResponsePlanOnSiteNo, alignment: 'center' }, { text: EmergencyResponsePlanOnSiteNa, alignment: 'center' }, { text: 'STARS # (if applicable)'}, { text: STARSNumberYes, alignment: 'center' }, { text: STARSNumberNo, alignment: 'center' }, { text: STARSNumberNa, alignment: 'center' }],
            ['Muster point(s) identified', { text: MusterPointsIdentifiedYes, alignment: 'center' }, { text: MusterPointsIdentifiedNo, alignment: 'center' }, { text: MusterPointsIdentifiedNa, alignment: 'center' }, { text: 'ERP responder roles and responsibilities identified'}, { text: ERPResponderRolesAndResponsibilitiesIdentifiedYes, alignment: 'center' }, { text: ERPResponderRolesAndResponsibilitiesIdentifiedNo, alignment: 'center' }, { text: ERPResponderRolesAndResponsibilitiesIdentifiedNa, alignment: 'center' }],
            ['ERP includes directions to nearest hospital', { text: ERPIncludesDirectionsToNearestHospitalYes, alignment: 'center' }, { text: ERPIncludesDirectionsToNearestHospitalNo, alignment: 'center' }, { text: ERPIncludesDirectionsToNearestHospitalNa, alignment: 'center' }, { text: 'Cellular or radio coverage confirmed. If no, what communication is in place?', alignment: 'center' }, { text: CellularOrRadioCoverageConfirmedYes, alignment: 'center' }, { text: CellularOrRadioCoverageConfirmedNo, alignment: 'center' }, { text: CellularOrRadioCoverageConfirmedNa, alignment: 'center' }],
          ]
        }
      },
      '\n\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25],
          body: [
            [{ text:'Ground Disturbance', style: 'tableHeader'}, { text:'Y', style: 'tableHeader', alignment: 'center' }, { text:'N', style: 'tableHeader', alignment: 'center' }],
            ['Does the project involve ground disturbance If YES, compelete the following', { text: DoesTheProjectInvolveGroundDisturbanceYes, alignment: 'center' }, { text: DoesTheProjectInvolveGroundDisturbanceNo, alignment: 'center' }],
            ['Ground disturbance checklist is in place', { text: GroundDisturbanceChecklistIsInPlaceYes, alignment: 'center' }, { text: GroundDisturbanceChecklistIsInPlaceNo, alignment: 'center' }],
            ['1-Call notification has been registered', { text: OneCallNotificationHasBeenRegisteredYes, alignment: 'center' }, { text: OneCallNotificationHasBeenRegisteredNo, alignment: 'center' }],
            ['All underground lines within 5 metres of the work area manually exposed', { text: AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposedYes, alignment: 'center' }, { text: AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposedNo, alignment: 'center' }],
            ['30 metre search area around the work area clearly defined', { text: ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefinedYes, alignment: 'center' }, { text: ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefinedNo, alignment: 'center' }],
            ['Third-party line locates completed within the search area', { text: ThirdPartyLineLocatesCompletedWithinTheSearchAreaYes, alignment: 'center' }, { text: ThirdPartyLineLocatesCompletedWithinTheSearchAreaNo, alignment: 'center' }],
            ['All required crossing or proximity agreements in place', { text: AllRequiredCrossingOrProximityAgreementsInPlaceYes, alignment: 'center' }, { text: AllRequiredCrossingOrProximityAgreementsInPlaceNo, alignment: 'center' }]
          ]
        }
      },
      '\n\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25],
          body: [
            [{ text: 'Confined Space', style: 'tableHeader'}, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text:'N', style: 'tableHeader', alignment: 'center' }],
            ['Confined Space Permit Issued', { text: DoesTheProjectInvolveConfinedSpaceEntryYes, alignment: 'center' }, { text: DoesTheProjectInvolveConfinedSpaceEntryNo, alignment: 'center' }],
            ['Ground disturbance checklist is in place', { text: ConfinedSpacePermitIssuedYes, alignment: 'center' }, { text: ConfinedSpacePermitIssuedNo, alignment: 'center' }],
            ['Workers have applicable safety training and competent to perform the work', { text: ConfinedSpaceSafetyTrainingYes, alignment: 'center' }, { text: ConfinedSpaceSafetyTrainingNo, alignment: 'center' }],
            ['Safety Watch in place', { text: SafetyWatchInPlaceYes, alignment: 'center' }, { text: SafetyWatchInPlaceNo, alignment: 'center' }],
            ['Rescue Plan Available', { text: RescuePlanAvailableYes, alignment: 'center' }, { text: RescuePlanAvailableNo, alignment: 'center' }]
          ]
        }
      },
      '\n\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25],
          body: [
            [{ text:'Hot Work', style: 'tableHeader'}, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text:'N', style: 'tableHeader', alignment: 'center' }],
            ['Does the project involve Hot Work (work that could produce a source of ignition, such as a spark or open flame)', { text: DoesTheProjectInvolveHotWorkYes, alignment: 'center' }, { text: DoesTheProjectInvolveHotWorkNo, alignment: 'center' }],
            ['Hot Work Permit Issued', { text: HotWorkPermitIssuedYes, alignment: 'center' }, { text: HotWorkPermitIssuedNo, alignment: 'center' }],
            ['Fire Hazards identified and controls in place', { text: FireHazardsIdentifiedControlsYes, alignment: 'center' }, { text: FireHazardsIdentifiedControlsNo, alignment: 'center' }],
            ['Fire / Safety Watch Available', { text: FireSafetyWatchAvailableYes, alignment: 'center' }, { text: FireSafetyWatchAvailableNo, alignment: 'center' }]
          ]
        }
      },
      '\n\n',
      {
        style: 'tableExample',
        table: {
          widths: ['*', 25, 25, 25, '*', 25, 25, 25],
          body: [
            [{ text: 'Summit Vehicles & Equipment', style: 'tableHeader'}, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: 'N/A', style: 'tableHeader', alignment: 'center' }, { text: '', style: 'tableHeader', alignment: 'center' }, { text: 'Y', style: 'tableHeader', alignment: 'center' }, { text: 'N', style: 'tableHeader', alignment: 'center' }, { text: 'N/A', style: 'tableHeader', alignment: 'center' }],
            ['Exterior of vehicle generally clean and free of visual defects', { text: ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefectsYes, alignment: 'center' }, { text: ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefectsNo, alignment: 'center' }, { text: ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefectsNa, alignment: 'center' }, { text: 'Headlights are in proper working condition' }, { text: HeadlightsAreInProperWorkingConditionYes, alignment: 'center' }, { text: HeadlightsAreInProperWorkingConditionNo, alignment: 'center' }, { text: HeadlightsAreInProperWorkingConditionNa, alignment: 'center' }],
            ['Interior of vehicle kept tidy and clean', { text: InteriorOfVehicleKeptTidyAndCleanYes, alignment: 'center' }, { text: InteriorOfVehicleKeptTidyAndCleanNo, alignment: 'center' }, { text: InteriorOfVehicleKeptTidyAndCleanNa, alignment: 'center' }, { text: 'Signal lights are in proper working condition' }, { text: SignalLightsAreInProperWorkingConditionYes, alignment: 'center' }, { text: SignalLightsAreInProperWorkingConditionNo, alignment: 'center' }, { text: SignalLightsAreInProperWorkingConditionNa, alignment: 'center' }],
            ['Vehicle windshield free of major chips and cracks', { text: VehicleWindshieldFreeOfMajorChipsAndCracksYes, alignment: 'center' }, { text: VehicleWindshieldFreeOfMajorChipsAndCracksNo, alignment: 'center' }, { text: VehicleWindshieldFreeOfMajorChipsAndCracksNa, alignment: 'center' }, { text: 'Safety / buggy whip equipped on vehicle' }, { text: SafetyBuggyWhipEquippedOnVehicleYes, alignment: 'center' }, { text: SafetyBuggyWhipEquippedOnVehicleNo, alignment: 'center' }, { text: SafetyBuggyWhipEquippedOnVehicleNa, alignment: 'center' }],
            ['Daily pre-use vehicle inspection completed', { text: DailyPreUseVehicleInspectionCompletedYes, alignment: 'center' }, { text: DailyPreUseVehicleInspectionCompletedNo, alignment: 'center' }, { text: DailyPreUseVehicleInspectionCompletedNa, alignment: 'center' }, { text: 'First aid kit equipped in vehicle' }, { text: FirstAidKitEquippedInVehicleYes, alignment: 'center' }, { text: FirstAidKitEquippedInVehicleNo, alignment: 'center' }, { text: FirstAidKitEquippedInVehicleNa, alignment: 'center' }],
            ['Cargo (internal and external) properly stowed and secured', { text: CargoIinternalAndExternalProperlyStowedAndSecuredYes, alignment: 'center' }, { text: CargoIinternalAndExternalProperlyStowedAndSecuredNo, alignment: 'center' }, { text: CargoIinternalAndExternalProperlyStowedAndSecuredNa, alignment: 'center' }, { text: 'Emergency survival kit equipped in vehicle' }, { text: EmergencySurvivalKitEquippedInVehicleYes, alignment: 'center' }, { text: EmergencySurvivalKitEquippedInVehicleNo, alignment: 'center' }, { text: EmergencySurvivalKitEquippedInVehicleNa, alignment: 'center' }],
            ['Horn is in proper working condition', { text: HornIsInProperWorkingConditionYes, alignment: 'center' }, { text: HornIsInProperWorkingConditionNo, alignment: 'center' }, { text: HornIsInProperWorkingConditionNa, alignment: 'center' }, '', '', '', '']
          ]
        }
      },
      '\n\n',
      {
        alignment: 'justify',
        text: 'Descrepancies', style: 'subheader',
        text: descrepancy
      },
      '\n\n',
      {
        alignment: 'justify',
        text: 'Comments and Required Action Items', style: 'subheader',
        text: comment
      },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Summit Supervisor Signature:' + header.Supervisor
          },
          {
            text: 'Date:' + header.Date.slice(0, 10)
          }
        ]
      },
      '\n\n',
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Conducted by Signature: ' + header.Worker
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
  pdfDoc.pipe(fs.createWriteStream(path+'.pdf'))
  pdfDoc.end()

  // update form data with path to pdf
  client.release()

}

module.exports = worksiteSafetyInspectionPDF
