const PdfPrinter = require('pdfmake')
const fs = require('fs')

async function meaningfulSiteTourPDF(path, reportData, messages, pics, signDate) {
  
  reportData.header.Date = reportData.header.Date.substring(0,10)

  let currentPath = process.cwd()

  const fonts = {
    Roboto: {
      normal: currentPath+'/api/fonts/Roboto-Regular.ttf',
      bold: currentPath+'/api/fonts/Roboto-Medium.ttf',
      italics: currentPath+'/api/fonts/Roboto-Italic.ttf',
      bolditalics: currentPath+'/api/fonts/Roboto-MediumItalic.ttf'
    }
  }

  const printer = new PdfPrinter(fonts)

  let dateSigned = 'To be determined'
  if (signDate) { dateSigned = signDate }

  let header = reportData.header
  let todo = reportData.todo
  let notes = reportData.notes

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
        image: currentPath+'/api/images/meaningful-site-tour-cover-page.png', height: 560, width: 750
      },
      '\n\n',
      {
        columns: [
          {
            image: currentPath+'/api/images/meaningful-site-tour-side-page.png', height: 480, width: 270
          },
          [
            { text: 'Conducting Your Tour\n\n', style: 'subheader', alignment: 'center' },
            {
              text: 'Others Included:  ' + header.Name + '\n' +
                'Summit Representative:  ' + header.Worker + '\n' +
                'Location:  ' + header.Location + '\n' +
                'Date:  ' + header.Date + '\n\n'

            },
            {
              text: 'THINGS TO DO/CHECK\n', decoration: 'underline'
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
          [
            { text: `Positive Observations\n`, decoration: 'underline' },
            { text: notes.PositiveObservations + `\n\n`},
            { text: `Opportunities for Improvement\n`, decoration: 'underline' },
            { text: notes.ImprovementOpportunities + `\n\n`},
            { text: `Summary of Feedback\n`, decoration: 'underline' },
            { text: notes.FeedbackSummary + `\n\n` },
            { text: 'Supervisor\n', decoration: 'underline' },
            { text: header.Supervisor + `\n\n`},
            { text: 'Date Signed\n' + dateSigned }
          ],
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
