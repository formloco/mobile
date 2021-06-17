export const BEHAVIOUR_BASED_OBSERVATION = {
  "form": {
    "pin": "U2FsdGVkX1+6LbL15172c0rQDOwQFfTELj6fARNrA8w=",
    "name": "BEHAVIOUR BASED OBSERVATION",
    "form_id": "ca00198c-6ae1-485e-99c8-f2d66d50681e",
    "labels": "[\"Client\",\"Location\",\"LSD/UWI\",\"Date\",\"Observed Company\",\"Project\",\"Scope of Work\",\"What was observed\",\"Housekeeping\",\"Toxic Atmosphere\",\"Work Plans / Procedures Available\",\"Condition of Tools and Equipment\",\"Hazard Awareness / Mitigation\",\"Using PPE\",\"Procedures Followed\",\"Communicating\",\"Proximity to Other Workers\",\"Team Work\",\"Horseplay\",\"Focus on Work\",\"Balance, Traction, Grip\",\"Pre-Task Planning / Permits\",\"Reaching / Extending\",\"Lifting / Bending\",\"Repetitive Motion\",\"Standing / Sitting\",\"What was Said\",\"Body Position\",\"Energy Sources\",\"Lock Out\",\"Guards and Barriers\",\"Engineering Controls\",\"Workplace Design / Condition\",\"Congested Work Area\",\"Pre-Job Inspection\",\"Correct for Task\",\"Safe Use\",\"Congested Work Area\",\"Congested Work Area\",\"Training / Coaching\",\"Worker / Supervisor Competency\",\"Procedures Available, Adequate, Understood\"]",
    "columns": "id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar , user_created varchar , user_archived jsonb , date_updated timestamp , date_archived timestamp , date_created timestamp, Select46 varchar,Textbox1 varchar,Textbox2 varchar,Textbox3 varchar,Select47 varchar,Select48 varchar,Textbox7 varchar,Textarea81 varchar,Radio101 varchar,Radio102 varchar,Radio103 varchar,Radio104 varchar,Radio105 varchar,Radio106 varchar,Radio107 varchar,Radio108 varchar,Radio109 varchar,Radio110 varchar,Radio111 varchar,Radio112 varchar,Radio113 varchar,Radio114 varchar,Radio115 varchar,Radio116 varchar,Radio117 varchar,Radio118 varchar,Textarea111 varchar,Radio131 varchar,Radio132 varchar,Radio133 varchar,Radio134 varchar,Radio135 varchar,Radio136 varchar,Radio137 varchar,Radio140 varchar,Radio141 varchar,Radio142 varchar,Radio143 varchar,Radio144 varchar,Radio145 varchar,Radio146 varchar,Radio147 varchar,PRIMARY KEY(id)",
    "details": [
      {
        "list": {
          "src": "assets/logo/formlocoshield.png",
          "name": "Clients",
          "type": "formloco",
          "form_id": "087af666-d4f6-42e4-a712-8e1df712d46c",
          "tenant_id": "06632206-3cd4-4751-9e5d-b8839a454ca8"
        },
        "type": "Select",
        "error": "Clients",
        "label": "Client",
        "multiple": false,
        "required": true,
        "appearance": "outline",
        "selectArray": [
          {
            "label": "Positive",
            "value": "1"
          },
          {
            "label": "Negative",
            "value": "2"
          },
          {
            "label": "Option 3",
            "value": 3
          },
          {
            "label": "Option 4",
            "value": 4
          }
        ],
        "formControlName": "Select46"
      },
      {
        "type": "Textbox",
        "error": "Required Field",
        "label": "Location",
        "types": "text",
        "required": false,
        "appearance": "outline",
        "placeholder": "Location",
        "formControlName": "Textbox1"
      },
      {
        "type": "Textbox",
        "error": "Required Field",
        "label": "LSD/UWI",
        "types": "text",
        "required": false,
        "appearance": "outline",
        "placeholder": "LSD/UWI",
        "formControlName": "Textbox2"
      },
      {
        "type": "Textbox",
        "error": "Required Field",
        "label": "Date",
        "types": "date",
        "required": false,
        "appearance": "outline",
        "placeholder": "Date",
        "formControlName": "Textbox3"
      },
      {
        "list": {
          "src": "assets/logo/formlocoshield.png",
          "name": "Clients",
          "type": "formloco",
          "form_id": "087af666-d4f6-42e4-a712-8e1df712d46c",
          "tenant_id": "06632206-3cd4-4751-9e5d-b8839a454ca8"
        },
        "type": "Select",
        "error": "Observed Company is required",
        "label": "Observed Company",
        "multiple": false,
        "required": true,
        "appearance": "outline",
        "selectArray": [
          {
            "label": "Positive",
            "value": "1"
          },
          {
            "label": "Negative",
            "value": "2"
          }
        ],
        "formControlName": "Select47"
      },
      {
        "list": {
          "src": "assets/logo/formlocoshield.png",
          "name": "Project",
          "type": "formloco",
          "form_id": "94e1c833-1ff9-4400-8c05-f9c69053a601",
          "tenant_id": "06632206-3cd4-4751-9e5d-b8839a454ca8"
        },
        "type": "Select",
        "error": "Project is required",
        "label": "Project",
        "multiple": false,
        "required": true,
        "appearance": "outline",
        "selectArray": [
          {
            "label": "Positive",
            "value": "1"
          },
          {
            "label": "Negative",
            "value": "2"
          }
        ],
        "formControlName": "Select48"
      },
      {
        "type": "Textbox",
        "error": "Required Field",
        "label": "Scope of Work",
        "types": "text",
        "required": false,
        "appearance": "outline",
        "placeholder": "Scope of Work",
        "formControlName": "Textbox7"
      },
      {
        "type": "Textarea",
        "error": "Required Field",
        "label": "What was observed",
        "types": "text",
        "required": false,
        "appearance": "outline",
        "placeholder": "What was observed",
        "formControlName": "Textarea81"
      },
      {
        "type": "Label",
        "label": "Environment / Working Conditions",
        "fontValue": "mat-headline",
        "appearance": "outline"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Housekeeping",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio101"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Toxic Atmosphere",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio102"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Work Plans / Procedures Available",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio103"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Condition of Tools and Equipment",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio104"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Hazard Awareness / Mitigation",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio105"
      },
      {
        "type": "Label",
        "label": "Behaviors",
        "fontValue": "mat-headline"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Using PPE",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio106"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Procedures Followed",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio107"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Communicating",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio108"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Proximity to Other Workers",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio109"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Team Work",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio110"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Horseplay",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio111"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Focus on Work",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio112"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Balance, Traction, Grip",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio113"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Pre-Task Planning / Permits",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio114"
      },
      {
        "type": "Label",
        "label": "Ergonomics",
        "fontValue": "mat-headline"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Reaching / Extending",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio115"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Lifting / Bending",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio116"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Repetitive Motion",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio117"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Standing / Sitting",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "Negative",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio118"
      },
      {
        "type": "Textarea",
        "error": "Required Field",
        "label": "What was Said",
        "types": "text",
        "required": false,
        "appearance": "outline",
        "placeholder": "What was Said",
        "formControlName": "Textarea111"
      },
      {
        "type": "Label",
        "label": "Line of Fire",
        "fontValue": "mat-headline"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Body Position",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio131"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Energy Sources",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio132"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Lock Out",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio133"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Guards and Barriers",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio134"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Engineering Controls",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio135"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Workplace Design / Condition",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio136"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Congested Work Area",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio137"
      },
      {
        "type": "Label",
        "label": "Tools and Equipment",
        "fontValue": "mat-headline"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Pre-Job Inspection",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio140"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Correct for Task",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio141"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Safe Use",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio142"
      },
      {
        "type": "Label",
        "label": "Employee Competency Check",
        "fontValue": "mat-headline"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Congested Work Area",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio143"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Congested Work Area",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio144"
      },
      {
        "type": "Label",
        "label": "Management / Supervisory",
        "fontValue": "mat-headline"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Training / Coaching",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio145"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Worker / Supervisor Competency",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio146"
      },
      {
        "type": "Radio",
        "error": "My Field is required",
        "label": "Procedures Available, Adequate, Understood",
        "required": false,
        "radioArray": [
          {
            "label": "Positive",
            "value": "Positive",
            "labelPosition": "after"
          },
          {
            "label": "Negative",
            "value": "2",
            "labelPosition": "after"
          }
        ],
        "formControlName": "Radio147"
      }
    ],
    "controls": [
      {
        "type": "Select",
        "label": "Select"
      },
      {
        "type": "Textbox",
        "label": "Textbox"
      },
      {
        "type": "Textbox",
        "label": "Textbox"
      },
      {
        "type": "Textbox",
        "label": "Textbox"
      },
      {
        "type": "Select",
        "label": "Select"
      },
      {
        "type": "Select",
        "label": "Select"
      },
      {
        "type": "Textbox",
        "label": "Textbox"
      },
      {
        "type": "Textarea",
        "label": "Textarea"
      },
      {
        "type": "Label",
        "label": "Label"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Label",
        "label": "Label"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Label",
        "label": "Label"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Textarea",
        "label": "Textarea"
      },
      {
        "type": "Label",
        "label": "Label"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Label",
        "label": "Label"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Label",
        "label": "Label"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Label",
        "label": "Label"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      },
      {
        "type": "Radio",
        "label": "Radio"
      }
    ]
  }
}