export class SetIsHeaderValid {
  static type = '[VehicleInspection] SetHeader'
  constructor(public isHeaderValid: boolean) {}
}

export class SetSelectedComments {
  static type = '[VehicleInspection] SetSelectedComments'
  constructor(public selectedComments: []) {}
}

