import { MAINTENANCE_INSPECTION } from './maintenance-inspection'

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

export const FIRE_EXTINGUISHER = {
  columns: 'user_updated, user_created, date_updated, date_created, data',

  // columns: 'user_updated, user_created, date_updated, date_created, company_name, company_address, job_number, data',
  form: {
    name: 'Fire Extinguisher',
    lists: [{form_id: 'd6648af2-b6e8-43b0-8c25-a094b8f71759', name: 'company'}],
    pin: '369',
    labels: '[\"Company Name\",\"Job Number\",\"Date Created\",\"User Created\"]',
    columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, data jsonb, PRIMARY KEY(id)'

    // columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, company_name varchar, company_address varchar, job_number varchar, data jsonb, PRIMARY KEY(id)'
  }
}

export const HAZARD_ASSESSMENT = {
  columns: 'user_updated, user_created, date_updated, date_created, data',

  // columns: 'user_updated, user_created, date_updated, date_created, company, location, muster_point, job_number, ppe_inspection, is_pre_inspection_complete, is_working_alone, comment_on_working_alone, warning_ribbon_needed, all_permits_closed_out, area_cleaned_up, hazards_remaining, comment_on_remaining_hazards, any_incidents, comment_on_incidents, data',
  form: {
    name: 'Hazard Assessment',
    lists: [{form_id: 'd6648af2-b6e8-43b0-8c25-a094b8f71759', name: 'company'}],
    pin: '369',
    labels: '[\"Company Name\",\"Job Number\",\"Date Created\",\"User Created\"]',
    columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, data jsonb, PRIMARY KEY(id)'

    // columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, company varchar, location varchar, muster_point varchar, job_number varchar, ppe_inspection boolean, is_pre_inspection_complete boolean, is_working_alone boolean, comment_on_working_alone varchar, warning_ribbon_needed boolean, all_permits_closed_out varchar, area_cleaned_up varchar, hazards_remaining varchar, comment_on_remaining_hazards varchar, any_incidents varchar, comment_on_incidents varchar, data jsonb, PRIMARY KEY(id)'
  }
}

export const QR_CODE_SCANNER = {
  "form": {
    "name": "QR Code Scanner",
    "controls": [
      {
        "type": "QRCodeScanner",
        "label": "QR Code Scanner",
        "experiment": true,
        "disabled": true
      }
    ],
    "details": [
      {
        "files": []
      }
    ],
    "labels": "[]",
    "columns": "id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar , user_created varchar , user_archived jsonb , date_updated timestamp , date_archived timestamp , date_created timestamp, PRIMARY KEY(id)",
    "pin": "U2FsdGVkX19+NGvgUScXGSsA3nlpZEL8sVLDxrxMEmA="
  }
}

export const FIRE_ALARM_FORM = {}

export const EMERGECY_LIGHTING_FORM = {}

export const FORMS = [
  {
    id: "fire-extinguisher",
    name: "Fire Extinguisher",
    icon: "fire_extinguisher",
    type: "custom",
    description: "Onsite inspection",
    formObject: FIRE_EXTINGUISHER
  },
  {
    id: "hazard-assessment",
    name: "Hazard Assessment",
    icon: "warning_amber",
    type: "custom",
    description: "Onsite hazard assessment gathering",
    formObject: HAZARD_ASSESSMENT
  },
  {
    id: "maintenance-inspection",
    name: "Maintenance Inspection",
    icon: "manage_search",
    type: "dynamic",
    description: "Onsite inspection",
    formObject: MAINTENANCE_INSPECTION
  },
  // {
  //   id: "qr-code-scanner",
  //   name: "QR Code Scanner",
  //   icon: "qr_code_2",
  //   description: "QR Code Scanner - scans qr codes",
  //   formObject: QR_CODE_SCANNER
  // },
  {
    id: "fire-alarm",
    name: "Fire Alarm",
    icon: "local_fire_department",
    type: "dynamic",
    description: "Onsite inspection",
    formObject: FIRE_ALARM_FORM
  },
  {
    id: "emergency-lighting",
    name: "Emergency Lighting",
    icon: "lightbulb",
    type: "dynamic",
    description: "Onsite inspection",
    formObject: EMERGECY_LIGHTING_FORM
  }
]