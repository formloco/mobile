export class SetIsWorksiteSafetyHeaderValid {
  static type = '[WorksiteSafetyStateModel] SetHeader'
  constructor(public isWorksiteSafetyHeaderValid: boolean) {}
}

export class SetIsSafetyEquipment {
  static type = '[WorksiteSafetyStateModel] SetIsSafetyEquipment'
  constructor(public IsSafetyEquipment: boolean) {}
}

export class SetIsAppropriateTraining {
  static type = '[WorksiteSafetyStateModel] SetAppropriateTraining'
  constructor(public isAppropriateTraining: boolean) {}
}