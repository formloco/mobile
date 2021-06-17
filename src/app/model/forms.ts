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

export const VEHICLE_INSPECTION = {
  columns: 'user_updated, user_created, date_updated, date_created, data',
  form: {
    name: 'Vehicle Inspection',
    lists: [],
    pin: '369',
    is_published: true,
    type: 'custom',
    columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, data jsonb, PRIMARY KEY(id)'
  }
}

export const FORMS = [
  {
    id: "vehicle-inspection",
    name: "Vehicle Inspection",
    icon: "directions_car",
    type: "custom",
    description: "Monthly vehicle inspection",
    formObject: VEHICLE_INSPECTION,
    history: false
  }
]