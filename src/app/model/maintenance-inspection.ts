export const MAINTENANCE_INSPECTION = {
  "form": {
    "pin": "U2FsdGVkX18UW4VfNWu8CO8FvkydmZcLQo0x87WcNwI=",
    "name": "Apex Incidental Findings",
    "labels": "[\"Latitude\",\"Longitude\",\"Start Date\",\"Completion Date\",\"Location\",\"Service\",\"Tasks\",\"Progression\",\"Informed an EPIC Employee\",\"Informed Building Security\",\"Protocol\",\"Conducted a separate inspection of the roof on a windy day\",\"Informed an EPIC Employee\",\"Informed Building Security\",\"Site Notes\"]",
    "columns": "id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar , user_created varchar , user_archived jsonb , date_updated timestamp , date_archived timestamp , date_created timestamp, Latitude varchar,Longitude varchar,Textbox5 varchar,Textbox10 varchar,Select2 varchar,SelectMulti3 varchar,SelectMulti4 varchar,Select6 varchar,Checkbox71 boolean,Checkbox72 boolean,SelectMulti8 varchar,Textbox9 varchar,Checkbox111 boolean,Checkbox112 boolean,Textarea121 varchar,PRIMARY KEY(id)",
    "details": [
      {
        "lat": {
          "type": "Textbox",
          "label": "Latitude",
          "types": "text",
          "required": false,
          "appearance": "outline",
          "placeholder": "Latitude",
          "formControlName": "Latitude"
        },
        "long": {
          "type": "Textbox",
          "label": "Longitude",
          "types": "text",
          "required": false,
          "appearance": "outline",
          "placeholder": "Longitude",
          "formControlName": "Longitude"
        },
        "type": "GPS"
      },
      {
        "type": "Textbox",
        "error": "Required Field",
        "label": "Start Date",
        "types": "date",
        "required": false,
        "appearance": "outline",
        "placeholder": "Start Date",
        "formControlName": "Textbox5"
      },
      {
        "type": "Textbox",
        "error": "Required Field",
        "label": "Completion Date",
        "types": "date",
        "required": false,
        "appearance": "outline",
        "placeholder": "Completion Date",
        "formControlName": "Textbox10"
      },
      {
        "list": "none",
        "type": "Select",
        "error": "Field is required",
        "label": "Location",
        "multiple": false,
        "required": true,
        "appearance": "outline",
        "selectArray": [
          {
            "label": "Option 1",
            "value": "Client 1"
          },
          {
            "label": "Option 2",
            "value": "Client 2"
          },
          {
            "value": "Client 3"
          },
          {
            "value": "Client 4"
          },
          {
            "value": "Client 5"
          },
          {
            "value": "Client 6"
          },
          {
            "value": "Client 7"
          },
          {
            "value": "Client 8"
          },
          {
            "value": "Client 9"
          },
          {
            "value": "Client 10"
          },
          {
            "value": "Client 11"
          },
          {
            "value": "Client 12"
          },
          {
            "value": "Client 13"
          },
          {
            "value": "Client 14"
          },
          {
            "value": "Client 15"
          },
          {
            "value": "Client 16"
          }
        ],
        "formControlName": "Select2"
      },
      {
        "list": "none",
        "type": "Select",
        "error": "Field is required",
        "label": "Service",
        "multiple": true,
        "required": true,
        "appearance": "outline",
        "selectArray": [
          {
            "label": "Option 1",
            "value": "Preventative Maintenance"
          },
          {
            "label": "Option 2",
            "value": "Repair"
          },
          {
            "value": "Replacement"
          }
        ],
        "formControlName": "SelectMulti3"
      },
      {
        "list": "none",
        "type": "Select",
        "error": "Field is required",
        "label": "Tasks",
        "multiple": true,
        "required": true,
        "appearance": "outline",
        "selectArray": [
          {
            "label": "Option 1",
            "value": "Monthly Roof Inspection"
          },
          {
            "label": "Option 2",
            "value": "Boiler Safety Testing"
          },
          {
            "value": "Inspect Air Filters"
          },
          {
            "value": "Replace Bag Filters in AHU"
          }
        ],
        "formControlName": "SelectMulti4"
      },
      {
        "list": "none",
        "type": "Select",
        "error": "Field is required",
        "label": "Progression",
        "multiple": false,
        "required": true,
        "appearance": "outline",
        "selectArray": [
          {
            "label": "Option 1",
            "value": "Initiated"
          },
          {
            "label": "Option 2",
            "value": "On Hold"
          },
          {
            "value": "Completed"
          }
        ],
        "formControlName": "Select6"
      },
      {
        "type": "Checkbox",
        "label": "Roof Access Entry",
        "checkboxArray": [
          {
            "error": "Field is required",
            "label": "Informed an EPIC Employee",
            "value": false,
            "required": false,
            "labelPosition": "after",
            "formControlName": "Checkbox71"
          },
          {
            "error": "Field is required",
            "label": "Informed Building Security",
            "value": false,
            "required": false,
            "labelPosition": "after",
            "formControlName": "Checkbox72"
          }
        ]
      },
      {
        "list": "none",
        "type": "Select",
        "error": "Field is required",
        "label": "Protocol",
        "multiple": true,
        "required": true,
        "appearance": "outline",
        "selectArray": [
          {
            "label": "Option 1",
            "value": "Is it a clear day?"
          },
          {
            "label": "Option 2",
            "value": "Door - Inspect for damage & proper closure"
          },
          {
            "value": "Cracks - Inspect roof membrane for cracks/tears"
          },
          {
            "value": "Flashing - Inspect for damage and if it is secure"
          },
          {
            "value": "Pooling water - Report any future or current areas that may pool water"
          },
          {
            "value": "Drainage - Verify all drains are clear"
          },
          {
            "value": "Debris - Remove/dispose of any litter or construction materials"
          },
          {
            "value": "Option 8"
          }
        ],
        "formControlName": "SelectMulti8"
      },
      {
        "type": "Textbox",
        "error": "Required Field",
        "label": "Conducted a separate inspection of the roof on a windy day",
        "types": "date",
        "required": false,
        "appearance": "outline",
        "placeholder": "Conducted a separate inspection of the roof on a windy day",
        "formControlName": "Textbox9"
      },
      {
        "type": "Checkbox",
        "label": "Roof Access Exit",
        "checkboxArray": [
          {
            "error": "Field is required",
            "label": "Informed an EPIC Employee",
            "value": false,
            "required": false,
            "labelPosition": "after",
            "formControlName": "Checkbox111"
          },
          {
            "error": "Field is required",
            "label": "Informed Building Security",
            "value": false,
            "required": false,
            "labelPosition": "after",
            "formControlName": "Checkbox112"
          }
        ]
      },
      {
        "type": "Textarea",
        "error": "Required Field",
        "label": "Site Notes",
        "types": "text",
        "required": false,
        "appearance": "outline",
        "placeholder": "TSite Notes",
        "formControlName": "Textarea121"
      }
    ],
    "controls": [
      {
        "type": "GPS",
        "label": "GPS",
        "disabled": true,
        "experiment": false
      },
      {
        "type": "Textbox",
        "label": "Textbox",
        "disabled": false,
        "experiment": false
      },
      {
        "type": "Textbox",
        "label": "Textbox",
        "disabled": false,
        "experiment": false
      },
      {
        "type": "Select",
        "label": "Select",
        "disabled": false,
        "experiment": false
      },
      {
        "type": "SelectMulti",
        "label": "Multi Select",
        "disabled": false,
        "experiment": false
      },
      {
        "type": "SelectMulti",
        "label": "Multi Select",
        "disabled": false,
        "experiment": false
      },
      {
        "type": "Select",
        "label": "Select",
        "disabled": false,
        "experiment": false
      },
      {
        "type": "Checkbox",
        "label": "Checkbox",
        "disabled": false,
        "experiment": false
      },
      {
        "type": "SelectMulti",
        "label": "Multi Select",
        "disabled": false,
        "experiment": false
      },
      {
        "type": "Textbox",
        "label": "Textbox",
        "disabled": false,
        "experiment": false
      },
      {
        "type": "Checkbox",
        "label": "Checkbox",
        "disabled": false,
        "experiment": false
      },
      {
        "type": "Textarea",
        "label": "Textarea",
        "disabled": false,
        "experiment": false
      }
    ]
  },
}
