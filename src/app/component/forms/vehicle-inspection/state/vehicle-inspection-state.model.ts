export const VEHICLE_INSPECTION = {
  id: "vehicle-inspection",
  name: "Vehicle Inspection",
  icon: "directions_car",
  type: "custom",
  is_published: false,
  is_data: false,
  is_manager: false,
  is_list: false,
  lists: ['stakeholders', 'models', 'years', 'divisions', 'makes'],
  description: "Monthly vehicle inspection"
}
export interface VehicleInspectionStateModel {
  isHeaderValid: boolean
  selectedComments: []
}

export const LABEL = `As you drive, continually check for any strange smells, sounds, vibrations, or Anything that does not feel right. **Vehicles should be serviced as per manufacturer’s recommendations and repairs made only by competent accredited personnel. For monthly inspections done by the employee: This vehicle inspection was done by myself and not by an accredited mechanic. There were no issues or problems identified at the time of inspection and therefore, no corrective actions are necessary to be undertaken. The employee completing this form takes full responsibility of the completeness and accuracy of this inspection as per Summit's Inspection Policy.`