
const { voiceTranscribe } = require('../services')

const transcribeVoice = async(req, res) => {
  try {
    const transcription = await voiceTranscribe(req.body)
    res.status(201).json({transcription: transcription, "message": "Message transcribed."})
  } catch(e) {
    res.sendStatus(500)
  }
}

module.exports = {
  transcribeVoice
}