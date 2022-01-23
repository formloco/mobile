export interface SpotCheckSafeyModel {
  isWorksiteSafetyHeaderValid: boolean
  isAppropriateTraining?: boolean
  isSpotCheckSafeyCompleted?: boolean // used to display message in descrepancies
}

export const SPOT_CHECK_SAFETY = {
  columns: 'user_updated, user_created, date_updated, date_created, pdf, data',
  form: {
    id: "spot-check-safety",
    name: 'Spot Check Safety',
    pin: '369',
    is_published: true,
    type: 'custom',
    columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, pdf text, data jsonb, PRIMARY KEY(id)'
  }
}