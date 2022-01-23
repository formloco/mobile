import { VEHICLE_INSPECTION } from '../component/forms/vehicle-inspection/state/vehicle-inspection-state.model'
import { WORKSITE_SAFETY_INSPECTION } from '../component/forms/worksite-safety-inspection/state/worksite-safety-inspection-state.model'
import { MEANINGFUL_SITE_TOUR } from '../component/forms/meaningful-site-tour/state/meaningful-site-tour.model'
import { SPOT_CHECK_SAFETY } from '../component/forms/spot-check-safety/state/spot-check-safety.model'

export const LIST_FORM = {
  columns: 'user_updated, user_created, date_updated, date_created, data',
  is_list: true,
  form: {
    name: '',
    pin: '369',
    labels: '[\"Data\"]',
    columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, data varchar, PRIMARY KEY(id)'
  }
}

// list used to populate all data at startup
export const LISTS = [
  'stakeholders', 'models', 'years', 'divisions', 'makes', 'clients'
]

// list array to prime forms state
export const FORMS = [
  {
    id: "vehicle-inspection",
    name: "Vehicle Inspection",
    icon: "directions_car",
    type: "custom",
    lists: ['stakeholders', 'models', 'years', 'divisions', 'makes'],
    description: "Monthly vehicle inspection",
    formObject: VEHICLE_INSPECTION,
    history: false
  },
  {
    id: "worksite-safety-inspection",
    name: "Worksite Safety Inspection",
    icon: "checklist",
    type: "custom",
    lists: ['clients'],
    description: "Worksite Safety Inspection",
    formObject: WORKSITE_SAFETY_INSPECTION,
    history: false
  },
  {
    id: "meaningful-site-tour",
    name: "Meaningful Site Tour",
    icon: "tour",
    type: "custom",
    lists: [],
    description: "Safety Environment Compliance",
    formObject: MEANINGFUL_SITE_TOUR,
    history: false
  },
  {
    id: "spot-check-safety",
    name: "Spot Check Safety",
    icon: "grading",
    type: "custom",
    lists: [],
    description: "Worksite Safety Management Review",
    formObject: SPOT_CHECK_SAFETY,
    history: false
  }
]