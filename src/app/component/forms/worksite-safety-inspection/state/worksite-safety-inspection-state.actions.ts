export class SetIsWorksiteSafetyHeaderValid {
  static type = '[WorksiteSafetyStateModel] SetHeader'
  constructor(public isWorksiteSafetyHeaderValid: boolean) {}
}

export class SetIsFireExtinguisher {
  static type = '[WorksiteSafetyStateModel] SetIsFireExtinguisher'
  constructor(public isFireExtinguisher: boolean) {}
}

export class SetIsErpPlanning {
  static type = '[WorksiteSafetyStateModel] SetIsErpPlanning'
  constructor(public isErpPlanning: boolean) {}
}

export class SetIsGroundwork {
  static type = '[WorksiteSafetyStateModel] SetIsGround'
  constructor(public isGroundwork: boolean) {}
}

export class SetIsHotwork {
  static type = '[WorksiteSafetyStateModel] SetIsHotwork'
  constructor(public isHotwork: boolean) {}
}

export class SetIsConfinedSpace {
  static type = '[WorksiteSafetyStateModel] SetIsConfinedSpace'
  constructor(public isConfinedSpace: boolean) {}
}




