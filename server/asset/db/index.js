const moment = require('moment')
const { Pool } = require('pg')

let pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: 'fieldasset',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const assetsGetSQL = async (tenant_id) => {
  let client = await pool.connect()
  const assets = await client.query(
    'SELECT a.id, a.name, a.unit_number, a.lat, a.lng, a.date_created, '
    + 'a.yard_id, c.category, s.status, c.id as category_id, m.id as image, '
    + 'v.hours_billed, v.hours_worked, v.asset_id, v.current_address, v.nearest_city, '
    + 'm.file_name, s.id as status_id FROM public.asset a '
    + 'LEFT JOIN public.category c ON a.category_id = c.id '
    + 'LEFT JOIN public.asset_status s ON a.status_id = s.id '
    + 'LEFT JOIN public.media m ON a.category_id = m.category_id '
    + 'LEFT JOIN public.asset_vitals v ON a.id = v.asset_id '
    + 'WHERE a.date_archived is null AND a.date_archived is null'
  )
  client.release()
  return assets.rows
}

const assetGetSQL = async (id) => {
  let client = await pool.connect()

  const asset = await client.query(
    'SELECT name, unit_number, category_id, status_id FROM public.asset, '
    + 'v.id, v. purchase_date, v.capital_cost, v.maintenance_cost, '
    + 'v.hours_billed, v.hours_worked, v.asset_id, v.current_address, v.nearest_city, '
    + 'a.lat, a.lng, a.unit_number FROM public.asset_vitals v '
    + 'LEFT JOIN public.asset a ON a.id = v.asset_id '
    + 'WHERE asset_id = ($1)', [id])

  client.release()
  return asset.rows[0]
}

const assetUpdateSQL = async (data) => {
  let client = await pool.connect()
  const asset = await client.query(
    'UPDATE public.asset SET name = ($1), unit_number = ($2), '
    +'category_id = ($3), status_id = ($4) WHERE id = ($5)' 
    [data["name"], data["unit_number"], data["category"], data["status"], data["id"]]
  )
  client.release()
  return asset.rows
}

const logGetSQL = async (tenant_id, page_size, page_index) => {
  let client = await pool.connect()
  const logs = await client.query(
    'SELECT * FROM public.asset_log LIMIT ' + page_size + ' OFFSET ' + (page_size * page_index)
  )
  client.release()
  return logs.rows
}

const categoryGetSQL = async (tenant_id) => {
  let client = await pool.connect()
  const categories = await client.query(
    'SELECT id, category FROM public.category '
    + 'WHERE tenant_id = ($1)'
    + 'ORDER BY category', [tenant_id]
  )
  return categories.rows
}

const statusGetSQL = async (tenant_id) => {
  let client = await pool.connect()
  const statuses = client.query(
    'SELECT id, status FROM public.asset_status '
    + 'WHERE tenant_id = ($1) AND date_archived is null '
    + 'ORDER BY status', [tenant_id]
  )
  client.release()
  return statuses
}

const assetCreateSQL = async (data) => {
  let client = await pool.connect()

  await client.query(
    'INSERT INTO public.asset(name, tenant_id, unit_number, '
    + 'category_id, status_id, date_created, user_created) '
    + 'VALUES ($1,$2,$3,$4,$5,$6,$7)', [
    data.name, data.tenant_id, data.unit_number,
    data.category, data.status, new Date(), data.user_id
  ]
  )

  client.release()
  return
}

const assetDeleteSQL = async (data) => {
  let client = await pool.connect()

  await client.query(
    'UPDATE public.asset SET date_archived = ($1), user_archived = ($2) WHERE id = ($3)',
    [new Date(), data.user_id, data.id]
  )

  client.release()
  return
}

const markerAddSQL = async (data) => {
  let client = await pool.connect()

  await client.query(
    'UPDATE public.asset SET lat = ($1), lng = ($2), yard_id = ($3), status_id = ($4) '
    + 'WHERE id = ($5)', [data.lat, data.lng, null, data.yard_id, data.status_id, data.id]
  )

  await client.query(
    'UPDATE public.asset_vitals SET current_address = ($1), nearest_city = ($2) '
    + 'WHERE asset_id = ($3)', [data.address, data.city, data.id]
  )

  client.release()
  return
}

const markerDeleteSQL = async (data) => {
  let client = await pool.connect()

  await client.query(
    'UPDATE public.asset SET lat = ($1), lng = ($2), yard_id = ($3), status_id = ($4) '
    + 'WHERE id = ($5)', [data.lat, data.lng, data.yard.id, data.status_id, data.id]
  )

  client.release()
  return
}

module.exports = {
  assetsGetSQL, assetGetSQL, logGetSQL, categoryGetSQL, statusGetSQL, assetUpdateSQL, assetCreateSQL, assetDeleteSQL, markerAddSQL, markerDeleteSQL
}