import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { merge, Observable, of, Subject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { SpeechError, SpeechEvent, SpeechNotification } from '../../model/speech'

import { MatDialogRef } from "@angular/material/dialog"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { SpeechRecognitionService } from '../../service/speech-recognition.service'

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../state/auth/auth.state'
import { DeviceState } from '../../state/device/device.state'
import { SetTranscription } from '../../state/device/device-state.actions'

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class VoiceComponent implements OnInit {

  @Select(AuthState.selectedVoiceFieldLabel) selectedVoiceFieldLabel$: Observable<string>

  @ViewChild('transcriptInput') input:ElementRef; 

  isDone = false
  totalTranscript?: string

  voiceForm: FormGroup

  transcript$?: Observable<string>
  listening$?: Observable<boolean>
  errorMessage$?: Observable<string>
  defaultError$ = new Subject<string | undefined>()

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VoiceComponent>,
    private speechRecognitionService: SpeechRecognitionService,
  ) {
    this.voiceForm = this.formBuilder.group({
      transcription: [null]
    })
  }

  ngOnInit(): void {
    this.totalTranscript = this.store.selectSnapshot(DeviceState.transcription)
    if (this.totalTranscript) this.isDone = true

    const webSpeechReady = this.speechRecognitionService.initialize()
    if (webSpeechReady) {
      this.initRecognition()
    }else {
      this.errorMessage$ = of('Your Browser is not supported. Please try Google Chrome.')
    }
  }

  start(): void {
    this.isDone = false
    if (this.speechRecognitionService.isListening) {
      this.stop()
      return
    }

    this.defaultError$.next(undefined)
    this.speechRecognitionService.start()
  }

  stop(): void {
    this.isDone = true
    this.speechRecognitionService.stop()
  }

  save(): void {
    console.log(this.input.nativeElement.value)
    this.store.dispatch(new SetTranscription(this.input.nativeElement.value)) 
    this.dialogRef.close()
  }

  private initRecognition(): void {
    this.transcript$ = this.speechRecognitionService.onResult().pipe(
      tap((notification) => {
        this.processNotification(notification)
      }),
      map((notification) => notification.content || '')
    )

    this.listening$ = merge(
      this.speechRecognitionService.onStart(),
      this.speechRecognitionService.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start))

    this.errorMessage$ = merge(
      this.speechRecognitionService.onError(),
      this.defaultError$
    ).pipe(
      map((data) => {
        if (data === undefined) {
          return ''
        }
        if (typeof data === 'string') {
          return data
        }
        let message
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`
            break
          case SpeechError.NoSpeech:
            message = `No speech has been detected. Please try again.`
            break
          case SpeechError.AudioCapture:
            message = `Microphone is not available. Plese verify the connection of your microphone and try again.`
            break
          default:
            message = ''
            break
        }
        return message
      })
    )
  }

  private processNotification(notification: SpeechNotification<string>): void {
    if (notification.event === SpeechEvent.FinalContent) {
      const message = notification.content?.trim() || ''
      this.totalTranscript = this.totalTranscript
        ? `${this.totalTranscript}\n${message}`
        : notification.content
    }
  }
}
