export const VEHICLE_INSPECTION = {
  columns: 'user_updated, user_created, date_updated, date_created, pdf, data',
  form: {
    id: "vehicle-inspection",
    name: 'Vehicle Inspection',
    pin: '369',
    is_published: true,
    type: 'custom',
    columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, pdf text, data jsonb, PRIMARY KEY(id)'
  }
}

export interface VehicleInspectionStateModel {
  isHeaderValid: boolean
  selectedComments: []
}

export const LABEL = `As you drive, continually check for any strange smells, sounds, vibrations, or Anything that does not feel right. **Vehicles should be serviced as per manufacturer’s recommendations and repairs made only by competent accredited personnel. For monthly inspections done by the employee: This vehicle inspection was done by myself and not by an accredited mechanic. There were no issues or problems identified at the time of inspection and therefore, no corrective actions are necessary to be undertaken. The employee completing this form takes full responsibility of the completeness and accuracy of this inspection as per Summit's Inspection Policy.`