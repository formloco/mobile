export class SetLat {
  static type = '[Device] SetLat'
  constructor(public lat: number) {}
}

export class SetLong {
  static type = '[Device] SetLong'
  constructor(public long: number) {}
}

export class SetBackground {
  static type = '[Device] SetBackground'
  constructor(public background: string) {}
}

export class SetScreenSize {
  static type = '[Device] SetScreenSize'
  constructor(public screenSize: string) {}
}

export class SetScreenWidth {
  static type = '[Device] SetScreenWidth'
  constructor(public screenWidth: string) {}
}

export class SetIsIOS {
  static type = '[Device] SetIsIOS'
  constructor(public isIOS: boolean) {}
}

export class SetIsSafari {
  static type = '[Device] SetIsSafari'
  constructor(public isSafari: boolean) {}
}

export class SetPics {
  static type = '[Device] SetPics'
  constructor(public pics: []) {}
}

export class SetIsDarkMode {
  static type = '[Device] SetIsDarkMode'
  constructor(public isDarkMode: boolean) {}
}

export class SetVoice{
  static type = '[Device] SetVoice'
  constructor(public voice: any[]) {}
}

export class SetTranscription{
  static type = '[Device] SetTranscription'
  constructor(public transcription: string) {}
}



