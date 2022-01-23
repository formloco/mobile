export interface AssetModel {
  asset?: Asset
  assets?: Asset[]
  assetVitals?: Vitals
  assetYard?: Yard[]
  assetCategory?: Category[]
  assetStatus?: Status[]
  assetLog?: Log[]
  assetMarker?: Marker[]
}

export interface Asset {
  id: number,
  name: string
  tenant_id: string
  lat: number
  lng: number
  date_created: string
  unit_number: number
  category: string
  status: string
  vitals: Vitals
  marker: Marker
  log: Log
  yard: Yard
}

export interface Log {
  id: number
  asset_label: string
  lat: number
  lng: number
  move_date: string
  move_user_label: string
  status_label: string
  unit_number: number
}

export interface Vitals {
  id: number
  purchase_date: string
  capital_cost: number
  maintenance_cost: number
  hours_billed: number
  hours_worked: number
  asset_id: number
  current_address: string
  nearest_city: string
  unit_number: number
}

export interface Yard {
  id: number
  image: number
  file_name: string
  yard_name: string
}

export interface Marker {
  lat: number
  lng: number
}

export interface Category {
  id: number
  tenant_id: string
  category: string
}

export interface Status {
  id: number
  tenant_id: string
  status: string
}