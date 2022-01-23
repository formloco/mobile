export interface DeviceStateModel {
  lat?: number
  long?: number
  background: string
  screenSize?: string
  screenWidth?: string
  isIOS?: boolean
  isSafari?: boolean
  isDarkMode?: boolean
  pics: []
  voice: any[]
  transcription: string
  // transcriptions: string[]
}
