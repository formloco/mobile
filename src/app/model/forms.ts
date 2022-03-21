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