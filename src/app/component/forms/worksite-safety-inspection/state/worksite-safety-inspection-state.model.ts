export interface WorksiteSafetyInspectionStateModel {
  isWorksiteSafetyHeaderValid: boolean
  labels?: any[]
  transcribed?: any[]
  isSiteHazardAssessmentCompleted?: boolean // used to display message in descrepancies
  isFireExtinguisher: boolean
  isErpPlanning: boolean
  isGroundwork: boolean
  isConfinedSpace: boolean
  isHotwork: boolean
}

export const WORKSITE_SAFETY_INSPECTION = {
  columns: 'user_updated, user_created, date_updated, date_created, pdf, data',
  form: {
    id: "worksite-safety-inspection",
    name: 'Worksite Safety Inspection',
    pin: '369',
    is_published: true,
    type: 'custom',
    columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, pdf text, data jsonb, PRIMARY KEY(id)'
  }
}

export enum HazardFormLabels {
  SiteHazardAssessmentCompleted = 'Site Hazard Assessment completed',
  ScopeOfWorkClearlyDefined = 'Scope of work for the project clearly defined',
  PotentialHazardsAndMitigationRequirementsIdentified = 'Potential hazards and mitigation requirements identified in hazard assessment',
  SummitHealthAndSafetyManualAvailable = 'Summit Health and Safety manual available',
  OccupationalHealthAndSafetyLegislationAvailable = 'Occupational Health And Safety legislation available',
  DailySafetyMeetingsConductedDocumented = 'Daily safety meetings conducted and documented',
  AllSitePersonalTrainingAndSafetyTickets = 'All site personal have the appropriate training and safety tickets',
  H2SPersonalGasMonitorsOnsiteHaveBeenBumped = 'The H2S personal gas monitors onsite have been bumped',
  AllSitePersonnelSiteSpecificWearingPPE = 'All site personnel are wearing site-specific PPE'
}

export enum JobsiteFormLabels {
  WorkAreaClearlyIdentified = 'Work area is clearly identified',
  AppropriateAccessAndEgressRoutesAreEstablished = 'Appropriate access and egress routes are established',
  SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns = 'Site is free of trip hazards and other housekeeping concerns',
  AllOpenExcavationsAreClearlyMarked = 'All open excavations are clearly marked',
  PublicAccessToTheSiteControlled = 'Public access to the site controlled',
  PrimeContractorClearlyIdentifiedWithSignage = 'Prime contractor clearly identified with signage',
  IsThereEmergencyEquipmentOnSite = 'Is there emergency equipment on site?',
  FirstAidKitAvailable = 'First aid kit available and stocked',
  BlanketsAndStretcherAvailable = 'Blankets and stretcher available',
  EyeWashBottleAvailable = 'Eye wash bottle available',
  SpillKitAvailable = 'Spill kit available'
}

export enum FireExtinguisherFormLabels {
  TwentyPoundMinimumFireExtinguisherAvailable = '20 lb minimum fire extinguisher available',
  FireExtinguisherInspected = 'Fire extinguisher(s) tag attached Inspected monthly and recorded',
  FireExtinguisherVisibleUnobstructed = 'Fire extinguisher(s) visible and unobstructed',
  FireExtinguisherCharged = 'Fire extinguishers showing charge (gauge indicator must be in the green zone indicating it is fully charged)',
  FireExtinguisherSafetyPinSecured = 'Fire extinguisher safety pins are in place and secured to prevent an accidental discharge',
  FireExtinguisherOperatingInstructions = 'Fire extinguishers operating instructions on the name plate are legible and face outwards',
  FireExtinguisherNoVisibleDamage = 'No signs of visible damage to fire extinguisher (rust, dents or other sighs of damage)',
  FireExtinguisherCertification = 'External fire extinguisher certification within 12 months (must be certified by 3rd party annually)'
}

export enum ErpPlanningFormLabels {
  EmergencyResponsePlanOnSite = 'Emergency Response Plan (ERP) onsite',
  MusterPointsIdentified = 'Muster point(s) identified',
  STARSNumber = 'STARS # (if applicable)',
  ERPIncludesDirectionsToNearestHospital = 'ERP includes directions to nearest hospital',
  ERPResponderRolesAndResponsibilitiesIdentified = 'ERP responder roles and responsibilities identified',
  CellularOrRadioCoverageConfirmed = 'Cellular or radio coverage confirmed. If no, what communication is in place?'
}

export enum GroundFormLabels {
  DoesTheProjectInvolveGroundDisturbance = 'Does the project involve ground disturbance',
  GroundDisturbanceChecklistIsInPlace = 'Ground disturbance checklist is in place',
  OneCallNotificationHasBeenRegistered = '1-Call notification has been registered',
  AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposed = 'All underground lines within 5 metres of the work area manually exposed',
  ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefined = '30 metre search area around the work area clearly defined',
  ThirdPartyLineLocatesCompletedWithinTheSearchArea = 'Third-party line locates completed within the search area',
  AllRequiredCrossingOrProximityAgreementsInPlace = 'All required crossing or proximity agreements in place'
}

export enum ConfinedSpaceLabels {
  DoesTheProjectInvolveConfinedSpaceEntry = 'Does the project involve Confined Space Entry?',
  ConfinedSpacePermitIssued = 'Confined Space Permit Issued',
  ConfinedSpaceSafetyTraining = 'Workers have applicable safety training and competent to perform the work',
  SafetyWatchInPlace = 'Safety Watch in place',
  RescuePlanAvailable = 'Rescue Plan Available'
}

export enum HotWorkLabels {
  DoesTheProjectInvolveHotWork = 'Does the project involve Hot Work (work that could produce a source of ignition, such as a spark or open flame)',
  HotWorkPermitIssued = 'Hot Work Permit Issued',
  FireHazardsIdentifiedControls = 'Fire Hazards identified and controls in place',
  FireSafetyWatchAvailable = 'Fire / Safety Watch Available'
}

export enum EquipmentLabels {    
    ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefects = 'Exterior of vehicle generally clean and free of visual defects',
    InteriorOfVehicleKeptTidyAndClean = 'Interior of vehicle kept tidy and clean',
    VehicleWindshieldFreeOfMajorChipsAndCracks = 'Vehicle windshield free of major chips and cracks',
    DailyPreUseVehicleInspectionCompleted = 'Daily pre-use vehicle inspection completed',
    EquipmentPreUseInspectionCompleted = 'Equipment pre-use inspection completed',
    CargoIinternalAndExternalProperlyStowedAndSecured = 'Cargo (internal and external) properly stowed and secured',
    HornIsInProperWorkingCondition = 'Horn is in proper working condition',
    HeadlightsAreInProperWorkingCondition = 'Headlights are in proper working condition',
    SignalLightsAreInProperWorkingCondition = 'Signal lights are in proper working condition',
    EmergencyWarningStrobeLightEquippedOnVehicle = 'Emergency warning / strobe light equipped on vehicle',
    SafetyBuggyWhipEquippedOnVehicle = 'Safety / buggy whip equipped on vehicle',
    FirstAidKitEquippedInVehicle = 'First aid kit equipped in vehicle',
    EmergencySurvivalKitEquippedInVehicle = 'Emergency survival kit equipped in vehicle',
    OtherCommentsKeyPositiveFindings = 'Other Comments - Key Positive Findings'
  }

// export const WORKSITE_SAFETY_INSPECTION_LABELS = [{
//   headerForm: {
//     Date: { label: 'Date Inspection Completed', placholder: 'Date Inspection Completed' },
//     Client: { label: 'Client Name', placholder: '', placeholder: 'Select or Enter Client Name' },
//     Worker: { label: 'Inspection Completed By', placholder: 'Select or Enter Inspection Completed By' },
//     Supervisor: { label: 'Site Supervisor Name', placholder: 'Select or Enter Site Supervisor Name' },
//     Location: { label: 'Worksite Location', placholder: 'Worksite Location' },
//     LSDUWI: { label: 'LSD/UWI', placholder: 'LSD/UWI' },
//     Latitude: { label: 'Latitude', placholder: 'Latitude' },
//     Longitude: { label: 'Longitude', placholder: 'Longitude' },
//     SupervisorPhone: { label: 'Supervisor Phone Number', placholder: 'Site Supervisor Phone Number' },
//     JobNumber: { label: 'Job/Project#', placholder: 'Job/Project#' },
//     Division: { label: 'Division', placholder: 'Division' },
//     STARSSiteNumber: { label: 'STARS Site # (if applicable)', placholder: 'STARS Site # (if applicable)' },
//     ScopeOfWork: { label: 'Scope of Work', placholder: 'Scope of Work' }
//   }
// }, {
//   hazardForm: {
//     SiteHazardAssessmentCompleted: { label: 'Site Hazard Assessment completed', placholder: '' },
//     ScopeOfWorkClearlyDefined: { label: 'Scope of work for the project clearly defined', placholder: '' },
//     PotentialHazardsAndMitigationRequirementsIdentified: { label: 'Potential hazards and mitigation <br>requirements identified in hazard assessment', placholder: '' },
//     SummitHealthAndSafetyManualAvailable: { label: 'Summit Health and Safety manual available', placholder: '' },
//     OccupationalHealthAndSafetyLegislationAvailable: { label: 'Occupational Health And Safety <br>legislation available', placholder: '' },
//     SafetyDataSheet: { label: 'Daily safety meetings conducted and documented', placholder: '' },
//     DailySafetyMeetingsConductedDocumented: { label: 'Daily safety meetings conducted <br>and documented', placholder: '' },
//     AllSitePersonalTrainingAndSafetyTickets: { label: 'All site personal have the appropriate training and safety tickets', placholder: '' },
//     H2SPersonalGasMonitorsOnsiteHaveBeenBumped: { label: 'The H2S personal gas monitors onsite <br>have been bumped', placholder: '' },
//     AllSitePersonnelSiteSpecificWearingPPE: { label: 'All site personnel are wearing <br>site-specific PPE', placholder: '' }
//   }
// }, {
//   jobsiteForm: {
//     WorkAreaClearlyIdentified: { label: 'Work area is clearly identified', placholder: '' },
//     AppropriateAccessAndEgressRoutesAreEstablished: { label: 'Appropriate access and egress routes are established', placholder: '' },
//     SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns: { label: 'Site is free of trip hazards and other housekeeping concerns', placholder: '' },
//     AllOpenExcavationsAreClearlyMarked: { label: 'All open excavations are clearly marked', placholder: '' },
//     PublicAccessToTheSiteControlled: { label: 'Public access to the site controlled', placholder: '' },
//     PrimeContractorClearlyIdentifiedWithSignage: { label: 'Prime contractor clearly identified <br>with signage', placholder: '' },
//     IsThereEmergencyEquipmentOnSite: { label: 'Is there emergency equipment on site?', placholder: '' },
//     FirstAidKitAvailable: { label: 'First aid kit available and stocked', placholder: '' },
//     BlanketsAndStretcherAvailable: { label: 'Blankets and stretcher available', placholder: '' },
//     EyeWashBottleAvailable: { label: 'Eye wash bottle available', placholder: '' },
//     SpillKitAvailable: { label: 'Spill kit available', placholder: '' }
//   }
// }, {
//   fireExtinguisherForm: {
//   }
// }, {
//   erpPlanningForm: {
//     EmergencyResponsePlanOnSite: { label: 'Emergency Response Plan (ERP) onsite', placholder: '' },
//     MusterPointsIdentified: { label: 'Muster point(s) identified', placholder: '' },
//     STARSNumber: { label: 'STARS # (if applicable)', placholder: '' },
//     ERPIncludesDirectionsToNearestHospital: { label: 'ERP includes directions to nearest hospital', placholder: '' },
//     ERPResponderRolesAndResponsibilitiesIdentified: { label: 'ERP responder roles and <br>responsibilities identified', placholder: '' },
//     CellularOrRadioCoverageConfirmed: { label: 'Cellular or radio coverage confirmed. <br>If no, what communication is in place?', placholder: '' }
//   }
// }, {
 
// }, {
  
// }, {
//   equipmentForm: {
//     ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefects: { label: 'Exterior of vehicle generally clean <br>and free of visual defects', placholder: '' },
//     InteriorOfVehicleKeptTidyAndClean: { label: 'Interior of vehicle kept tidy and clean', placholder: '' },
//     VehicleWindshieldFreeOfMajorChipsAndCracks: { label: 'Vehicle windshield free of major <br>chips and cracks', placholder: '' },
//     DailyPreUseVehicleInspectionCompleted: { label: 'Daily pre-use vehicle inspection completed', placholder: '' },
//     EquipmentPreUseInspectionCompleted: { label: 'Equipment pre-use inspection completed', placholder: '' },
//     CargoIinternalAndExternalProperlyStowedAndSecured: { label: 'Cargo (internal and external) properly <br>stowed and secured', placholder: '' },
//     HornIsInProperWorkingCondition: { label: 'Horn is in proper working condition', placholder: '' },
//     HeadlightsAreInProperWorkingCondition: { label: 'Headlights are in proper working condition', placholder: '' },
//     SignalLightsAreInProperWorkingCondition: { label: 'Signal lights are in proper working condition', placholder: '' },
//     EmergencyWarningStrobeLightEquippedOnVehicle: { label: 'Emergency warning / strobe light <br>equipped on vehicle', placholder: '' },
//     SafetyBuggyWhipEquippedOnVehicle: { label: 'Safety / buggy whip equipped on vehicle', placholder: '' },
//     FirstAidKitEquippedInVehicle: { label: 'First aid kit equipped in vehicle', placholder: '' },
//     EmergencySurvivalKitEquippedInVehicle: { label: 'Emergency survival kit equipped in vehicle', placholder: '' },
//     OtherCommentsKeyPositiveFindings: { label: 'Other Comments - Key Positive Findings', placholder: '' }
//   }
// }, {
//   discrepancyForm: {
//     Discrepancy: { label: 'Discrepancies', placholder: '' }
//   }
// }, {
//   commentForm: {
//     CommentsAndRequiredActionItems: { label: 'Comments', placholder: '' }
//   }
// }]