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

async function meaningfulSiteTourPDF(path, reportData, comments, pics, signDate) {

  let dateSigned = 'To be determined'
  if (signDate !== null) dateSigned = signDate

  let messages = []
  if (comments !== null) {
    for (let j = 0; j < comments.length; j++) {
      let str = JSON.stringify(comments[j])
      str = str.replace(/{/g, '')
      str = str.replace(/}/g, '')
      str = str.replace(/"/g, '')
      str = str.replace(/:/g, ': ')
      str = str.split(",").join("\n")
      messages.push(str)
    }
  }

  let header = reportData.data.header
  let notes = reportData.data.notes
  
  SiteOrientation = header.SiteOrientation ? '√ Site Orientation Complete' : 'Site Orientation Complete'
  DailySafetyMeeting = header.DailySafetyMeeting ? '√ Attend a Daily Safety Meeting / Toolbox Talk' : '  Attend a Daily Safety Meeting / Toolbox Talk'
  SiteTour = header.SiteTour ? '√ Site tour' : '  Site tour (2 hrs)'
  SiteTourWithWorker = header.SiteTourWithWorker ? '√ Site tour with worker' : 'Site tour with worker'
  ReviewDiscuss = header.ReviewDiscuss ? '√ Complete/review and discuss FLHA/JSA, HA ect.' : '  Complete/review and discuss FLHA/JSA, HA ect.'
  PositiveInterventionRecognition = header.PositiveInterventionRecognition ? '√ Positive intervention/recognition' : '  Positive intervention/recognition'
  EngageWithContractors = header.EngageWithContractors ? '√ Engage with contractors' : '  Engage with contractors'
  HousekeepingInspection = header.HousekeepingInspection ? '√ Housekeeping inspection' : '  Housekeeping inspection '
  CompleteBBO = header.CompleteBBO ? '√ Complete BBO' : '  Complete BBO'
  OpenTeamDiscussion = header.OpenTeamDiscussion ? '√ Hold an open discussion with the team' : '  Hold an open discussion with the team'
  SafetyAlert = header.SafetyAlert ? '√ Share a recent "Safety Alert" verbally if required' : '  Share a recent "Safety Alert" verbally if required'
  ProvideFeedback = header.ProvideFeedback ? '√ Provide feedback and follow-up' : '  Provide feedback and follow-up'
  FormalAuditInspection = header.FormalAuditInspection ? '√ Participate in a formal audit/insepctions if available or applicable' : '  Participate in a formal audit/insepctions if available or applicable'

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
            {text: 'Conducting Your Tour', style: 'subheader', alignment: 'center'},
            {
              text: 'Name:  ' + header.Name + '\n\n' +
                'Location:  ' + header.Location + '\n\n' +
                'Date:  ' + header.Date + '\n\n' +
                'THINGS TO DO/CHECK\n'
            },
            { text:
              SiteOrientation + '\n\n'+
              DailySafetyMeeting + '\n\n'+
              SiteTour + '\n\n'+
              SiteTourWithWorker + '\n\n'+
              ReviewDiscuss + '\n\n'+
              PositiveInterventionRecognition + '\n\n'+
              EngageWithContractors + '\n\n'+
              HousekeepingInspection + '\n\n'+
              CompleteBBO + '\n\n'+
              OpenTeamDiscussion + '\n\n'+
              SafetyAlert + '\n\n'+
              ProvideFeedback + '\n\n'+
              FormalAuditInspection,
            margin: [0, 20, 0, 20],
            },
          ],
          {
            // image: 'images/logo.png' + `\n\n`,
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
  pdfDoc.pipe(fs.createWriteStream(path+'.pdf'))
  pdfDoc.end()

}

module.exports = meaningfulSiteTourPDF
