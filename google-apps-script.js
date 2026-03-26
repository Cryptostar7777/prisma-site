// ===================================================
// Google Apps Script for Prisma Quote Requests
// ===================================================
// HOW TO DEPLOY:
// 1. Go to https://script.google.com
// 2. Create new project, paste this code
// 3. Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy the web app URL
// 5. Paste it into index.html GOOGLE_SCRIPT_URL variable
// ===================================================

var SHEET_ID = '14yhNYXnkZk4USMzdXvhqQ-eM669YMDGQynvKHaY743g';
var SHEET_NAME = 'Лист1';
var NOTIFY_EMAIL = 'info@prismacanada.ca'; // Change to actual email

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    sheet.appendRow([
      new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.city || '',
      data.project || '',
      data.source || 'website'
    ]);
    
    // Send email notification
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: '🏠 New Quote Request from ' + (data.name || 'Website'),
        htmlBody: '<h2>New Quote Request</h2>' +
          '<p><strong>Name:</strong> ' + (data.name || '-') + '</p>' +
          '<p><strong>Phone:</strong> ' + (data.phone || '-') + '</p>' +
          '<p><strong>Email:</strong> ' + (data.email || '-') + '</p>' +
          '<p><strong>City:</strong> ' + (data.city || '-') + '</p>' +
          '<p><strong>Project:</strong> ' + (data.project || '-') + '</p>' +
          '<p><strong>Source:</strong> ' + (data.source || 'website') + '</p>' +
          '<hr><p><em>Prisma Windows & Doors — Quote System</em></p>'
      });
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Prisma Quote API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
