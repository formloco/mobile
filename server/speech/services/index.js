const speech = require('@google-cloud/speech')

const client = new speech.SpeechClient()
// console.log(client, process.env.GOOGLE_APPLICATION_CREDENTIALS)

// The path to the remote LINEAR16 file
const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw'

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
// const audio = {
//   uri: gcsUri,
// };
const config = {
  // encoding: 'FLAC',
  // sampleRateHertz: 8000,
  languageCode: 'en-US',
  audioChannelCount: 2,
  enableSeparateRecognitionPerChannel: true
};
// const audio = {
// };
// const request = {
//   audio: audio,
//   config: config,
// };

const voiceTranscribe = async (data) => {
  try {
    //  console.log(data.voice)
    // let voiceData = JSON.stringify(data["voice"])
    // let base64Data = `"` + voiceData.slice(36)

    // // console.log(base64Data)
    // const buffer = Buffer.from(data["voice"], "base64")
    const buffer = Buffer.from(data["voice"])
    const audio = {
      content: buffer
    }
    const request = {
      audio: audio,
      config: config,
    };
    // console.log(request)
    // Detects speech in the audio file
    const [response] = await client.recognize(request)
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n')
      console.log(transcription)
    return transcription
    // quickstart();
  } catch (e) {
    console.log(e)
    throw new Error(e.message)
  }
}

module.exports = {
  voiceTranscribe
}