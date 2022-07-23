const TEST = {
  "header":
  {
    "Date": "2022-07-23T00:59:06.336Z",
    "Client": "Advantage Energy Ltd",
    "Location": "321",
    "LSDUWI": "321",
    "Latitude": 51.0480852,
    "Longitude": -114.0815552,
    "SupervisorPhone": "321",
    "JobNumber": "321",
    "Division": "Corporate Services",
    "STARSSiteNumber": "321",
    "ScopeOfWork": "test",
    "Worker": "Form Loco",
    "Supervisor": "Alvin"
  },
  "erpPlanning":
  {
    "EmergencyResponsePlanOnSite": "na",
    "MusterPointsIdentified": null,
    "STARSNumber": null,
    "ERPIncludesDirectionsToNearestHospital": null,
    "ERPResponderRolesAndResponsibilitiesIdentified": null,
    "CellularOrRadioCoverageConfirmed": null
  },
  "jobsite":
  {
    "WorkAreaClearlyIdentified": "no",
    "SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns": "yes",
    "AllOpenExcavationsAreClearlyMarked": "yes",
    "PublicAccessToTheSiteControlled": "yes",
    "PrimeContractorClearlyIdentifiedWithSignage": "yes",
    "IsThereEmergencyEquipmentOnSite": "yes",
    "FirstAidKitAvailable": "yes",
    "BlanketsAndStretcherAvailable": "yes",
    "EyeWashBottleAvailable": "yes",
    "SpillKitAvailable": "yes",
    "H2SPersonalGasMonitorsOnsiteHaveBeenBumped": "yes"
  },
  "fireExtinguisher":
  {
    "TwentyPoundMinimumFireExtinguisherAvailable": "no",
    "FireExtinguisherInspected": null,
    "FireExtinguisherVisibleUnobstructed": null,
    "FireExtinguisherCharged": null,
    "FireExtinguisherSafetyPinSecured": null,
    "FireExtinguisherOperatingInstructions": null,
    "FireExtinguisherNoVisibleDamage": null,
    "FireExtinguisherCertification": null
  },
  "ground":
  {
    "DoesTheProjectInvolveGroundDisturbance": "no",
    "GroundDisturbanceChecklistIsInPlace": null,
    "OneCallNotificationHasBeenRegistered": null,
    "AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposed": null,
    "ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefined": null,
    "ThirdPartyLineLocatesCompletedWithinTheSearchArea": null,
    "AllRequiredCrossingOrProximityAgreementsInPlace": null
  },
  "confinedSpace":
  {
    "DoesTheProjectInvolveConfinedSpaceEntry": "no",
    "ConfinedSpacePermitIssued": null,
    "ConfinedSpaceSafetyTraining": null,
    "SafetyWatchInPlace": null,
    "RescuePlanAvailable": null
  },
  "hotWork":
  {
    "DoesTheProjectInvolveHotWork": "no",
    "HotWorkPermitIssued": null,
    "FireHazardsIdentifiedControls": null,
    "FireSafetyWatchAvailable": null
  },
  "equipment":
  {
    "ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefects": null,
    "InteriorOfVehicleKeptTidyAndClean": null,
    "VehicleWindshieldFreeOfMajorChipsAndCracks": null,
    "DailyPreUseVehicleInspectionCompleted": null,
    "EquipmentPreUseInspectionCompleted": null,
    "CargoIinternalAndExternalProperlyStowedAndSecured": null,
    "HornIsInProperWorkingCondition": null,
    "HeadlightsAreInProperWorkingCondition": null,
    "SignalLightsAreInProperWorkingCondition": null,
    "EmergencyWarningStrobeLightEquippedOnVehicle": null,
    "SafetyBuggyWhipEquippedOnVehicle": null,
    "FirstAidKitEquippedInVehicle": null,
    "EmergencySurvivalKitEquippedInVehicle": null
  },
  "keyPositiveFindings":
    { "KeyPositiveFindings": "test25" },
  "comments": [
    {
      "text": "trest",
      "type": "isWorksiteSafetyJobsite",
      "field": "WorkAreaClearlyIdentified",
      "label": "Work area is clearly identified"
    }, {
      "text": "test2",
      "type": "isFireExtinguisher",
      "field": "TwentyPoundMinimumFireExtinguisherAvailable",
      "label": "20 lb minimum fire extinguisher available"
    }, {
      "text": "test4",
      "type": "isErpPlanning",
      "field": "EmergencyResponsePlanOnSite",
      "label": "Emergency Response Plan (ERP) onsite"
    }],
  "correctiveActions": [
    {
      "type": "isWorksiteSafetyJobsite",
      "field": "WorkAreaClearlyIdentified",
      "label": "Work area is clearly identified",
      "actionItem": "trest",
      "dateCompleted": null,
      "dateToComplete": "2022-07-21T21:27:27.203-06:00",
      "personResponsible": "Form Loco",
      "correctiveActionRequired": "test1"
    }, {
      "type": "isFireExtinguisher",
      "field": "TwentyPoundMinimumFireExtinguisherAvailable",
      "label": "20 lb minimum fire extinguisher available",
      "actionItem": "test2",
      "dateCompleted": null,
      "dateToComplete": "2022-07-21T21:27:45.286-06:00",
      "personResponsible": "Form Loco",
      "correctiveActionRequired": "test2"
    }, {
      "type": "isErpPlanning",
      "field": "EmergencyResponsePlanOnSite",
      "label": "Emergency Response Plan (ERP) onsite",
      "actionItem": "test4",
      "dateCompleted": null,
      "dateToComplete": "2022-07-21T21:27:54.296-06:00",
      "personResponsible": "Form Loco",
      "correctiveActionRequired": "test3"
    }],
  "hazard":
  {
    "SiteHazardAssessmentCompleted": "yes",
    "ScopeOfWorkClearlyDefined": "yes",
    "PotentialHazardsAndMitigationRequirementsIdentified": "yes",
    "SummitHealthAndSafetyManualAvailable": "yes",
    "OccupationalHealthAndSafetyLegislationAvailable": "yes",
    "DailySafetyMeetingsConductedDocumented": "yes",
    "AllSitePersonalTrainingAndSafetyTickets": "yes",
    "AllSitePersonnelSiteSpecificWearingPPE": "yes"
  }
}