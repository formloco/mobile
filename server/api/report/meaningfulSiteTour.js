const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
}

const PdfPrinter = require('pdfmake')
const printer = new PdfPrinter(fonts)
const fs = require('fs')

async function meaningfulSiteTourPDF(path, reportData, messages, pics, signDate) {

  let dateSigned = 'To be determined'
  if (signDate) dateSigned = signDate

  let header = reportData.data.header
  let todo = reportData.data.todo
  let notes = reportData.data.notes

  SiteOrientation = todo.SiteOrientation ? '√ Site Orientation Complete' : 'Site Orientation Complete'
  DailySafetyMeeting = todo.DailySafetyMeeting ? '√ Attend a Daily Safety Meeting / Toolbox Talk' : '  Attend a Daily Safety Meeting / Toolbox Talk'
  SiteTour = todo.SiteTour ? '√ Site tour' : '  Site tour (2 hrs)'
  SiteTourWithWorker = todo.SiteTourWithWorker ? '√ Site tour with worker' : 'Site tour with worker'
  ReviewDiscuss = todo.ReviewDiscuss ? '√ Complete/review and discuss FLHA/JSA, HA ect.' : '  Complete/review and discuss FLHA/JSA, HA ect.'
  PositiveInterventionRecognition = todo.PositiveInterventionRecognition ? '√ Positive intervention/recognition' : '  Positive intervention/recognition'
  EngageWithContractors = todo.EngageWithContractors ? '√ Engage with contractors' : '  Engage with contractors'
  HousekeepingInspection = todo.HousekeepingInspection ? '√ Housekeeping inspection' : '  Housekeeping inspection '
  CompleteBBO = todo.CompleteBBO ? '√ Complete BBO' : '  Complete BBO'
  OpenTeamDiscussion = todo.OpenTeamDiscussion ? '√ Hold an open discussion with the team' : '  Hold an open discussion with the team'
  SafetyAlert = todo.SafetyAlert ? '√ Share a recent "Safety Alert" verbally if required' : '  Share a recent "Safety Alert" verbally if required'
  ProvideFeedback = todo.ProvideFeedback ? '√ Provide feedback and follow-up' : '  Provide feedback and follow-up'
  FormalAuditInspection = todo.FormalAuditInspection ? '√ Participate in a formal audit/insepctions if available or applicable' : '  Participate in a formal audit/insepctions if available or applicable'

  const docDefinition = {
    pageOrientation: 'landscape',
    pageMargins: [20, 20, 20, 20],
    content: [
      {
        image: 'images/meaningful-site-tour-cover-page.png', height: 560, width: 750
      },
      '\n\n',
      {
        columns: [
          {
            image: 'images/meaningful-site-tour-side-page.png', height: 480, width: 270
          },
          [
            { text: 'Conducting Your Tour', style: 'subheader', alignment: 'center' },
            {
              text: 'Name:  ' + header.Name + '\n\n' +
                'Location:  ' + header.Location + '\n\n' +
                'Date:  ' + header.Date + '\n\n' +
                'THINGS TO DO/CHECK\n'
            },
            {
              text:
                SiteOrientation + '\n\n' +
                DailySafetyMeeting + '\n\n' +
                SiteTour + '\n\n' +
                SiteTourWithWorker + '\n\n' +
                ReviewDiscuss + '\n\n' +
                PositiveInterventionRecognition + '\n\n' +
                EngageWithContractors + '\n\n' +
                HousekeepingInspection + '\n\n' +
                CompleteBBO + '\n\n' +
                OpenTeamDiscussion + '\n\n' +
                SafetyAlert + '\n\n' +
                ProvideFeedback + '\n\n' +
                FormalAuditInspection,
              margin: [0, 20, 0, 20],
            },
          ],
          {
            text: `Positive Observations\n\n` + notes.PositiveObservations + `\n\n` +
              `Opportunities for Improvement\n\n` + notes.ImprovementOpportunities + `\n\n` +
              `Summary of Feedback\n\n` + notes.FeedbackSummary + `\n\n` +
              'Signature' + `\n\n` + header.Supervisor + `\n\n` +
              'Date: ' + dateSigned,
            margin: [0, 20, 0, 20],
          },
        ],
      },
      '\n\n',
      {
        alignment: 'justify',
        text: 'Messages', style: 'subheader'
      },
      '\n',
      messages,
      '\n',
      pics
    ],
    styles: {
      headerBig: {
        fontSize: 18,
        bold: true
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      },
      strikethrough: {
        decoration: 'line-through'
      }
    }
  }

  // create pdf
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  pdfDoc.pipe(fs.createWriteStream(path + '.pdf'))
  pdfDoc.end()

}

module.exports = meaningfulSiteTourPDF
