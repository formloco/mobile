export const MEANINGFUL_SITE_TOUR = {
  columns: 'user_updated, user_created, date_updated, date_created, pdf, data',
  form: {
    id: "meaningful-site-tour",
    name: 'Meaningful Site Tour',
    pin: '369',
    is_published: true,
    type: 'custom',
    columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, pdf text, data jsonb, PRIMARY KEY(id)'
  }
}
