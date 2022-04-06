export interface WorksiteSafetyInspectionStateModel {
  isWorksiteSafetyHeaderValid: boolean
  labels?: any[]
  transcribed?: any[]
  // isSiteHazardAssessmentCompleted?: boolean // used to display message in descrepancies
  isFireExtinguisher: boolean
  isErpPlanning: boolean
  isGroundwork: boolean
  isConfinedSpace: boolean
  isHotwork: boolean
}

export const WORKSITE_SAFETY_INSPECTION = {
  id: "worksite-safety-inspection",
  name: "Worksite Safety Inspection",
  icon: "checklist",
  type: "custom",
  is_published: false,
  is_data: false,
  is_manager: false,
  is_list: false,
  lists: ['clients'],
  description: "Monthly vehicle inspection"
}

export enum HazardFormLabels {
  SiteHazardAssessmentCompleted = 'Site Hazard Assessment completed',
  ScopeOfWorkClearlyDefined = 'Scope of work for the project clearly defined',
  PotentialHazardsAndMitigationRequirementsIdentified = 'Potential hazards and mitigation requirements identified in hazard assessment',
  SummitHealthAndSafetyManualAvailable = 'Summit Health and Safety manual available',
  OccupationalHealthAndSafetyLegislationAvailable = 'Occupational Health And Safety legislation available',
  DailySafetyMeetingsConductedDocumented = 'Daily safety meetings conducted and documented',
  AllSitePersonalTrainingAndSafetyTickets = 'All site personal have the appropriate training and safety tickets',
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
  SpillKitAvailable = 'Spill kit available',
  H2SPersonalGasMonitorsOnsiteHaveBeenBumped = 'The H2S personal gas monitors onsite have been bumped'
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
