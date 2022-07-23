export interface SpotCheckSafetyModel {
  isWorksiteSafetyHeaderValid: boolean
  isAppropriateTraining?: boolean
  isSpotCheckSafetyCompleted?: boolean // used to display message in discrepancies
}

export const SPOT_CHECK_SAFETY = {
  id: "spot-check-safety",
  name: "Spot Check Safety",
  icon: "grading",
  type: "custom",
  is_published: true,
  is_data: false,
  is_manager: false,
  is_list: false,
  lists: [],
  description: "Worksite Safety Management Review"
}
