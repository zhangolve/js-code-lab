/*
 *   This code consists of code of the Google API snippet:
 *   https://developers.google.com/youtube/v3/docs/videos/insert
 * 
 *   Some of this code was changed by zekro.
 * 
 * 4/qgD7Hez9MIIsP3pt30XcFr8dc-ZGYkcfEazd32GQ8Uewmr8EJndlIfI
 */

var fs = require('fs')
var readline = require('readline')
var util = require('util')
var {google} = require('googleapis')
var googleAuth = require('google-auth-library')

const SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl',
                'https://www.googleapis.com/auth/youtubepartner',
                'https://www.googleapis.com/auth/youtube'];
const CREDS = 'client_secrets.json'
var TOKEN_PATH = 'google-apis-nodejs-quickstart.json'
  
function storeToken(token) {
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), error => {
        console.log(`got error: ${error}`);
    })
    console.log('Token stored to ' + TOKEN_PATH)
}

function getNewToken(oauth2Client, requestData, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question('Enter the code from that page here: ', function(code) {
        rl.close()
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err)
                return
            }
            oauth2Client.credentials = token
            storeToken(token)
            callback(oauth2Client, requestData)
        })
    })
}


function authorize(credentials, requestData, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    console.log('999')
    fs.readFile(TOKEN_PATH, function(err, token) {
        console.log('001')
        if (err) {
            getNewToken(oauth2Client, requestData, callback)
        } else {
            oauth2Client.credentials = JSON.parse(token)
            callback(oauth2Client, requestData)
        }
    });
}


// fs.readFile(CREDS, (err, cont) => {
//     if (err) {
//         console.log('Error loading client secret file: \n', err)
//         return
//     }
// authorize(JSON.parse(cont), {
//     'params': {
//         'part': 'snippet, status'
//     },
//     'properties': {
//         'snippet.categoryId': '22',
//         'snippet.defaultLanguage': '',
//         'snippet.title': '333',
//         'status.embeddable': '',
//         'status.license': '',
//         'status.privacyStatus': 'public',
//         'status.publicStatsViewable': ''
//     },
//     'mediaFilename': 'fafefe'
// }, ()=>{
//     console.log('callback')
// })
// });

module.exports = {
    getNewToken
}
// 4/rgAR1F3fNiyz0QXZNG4X6fI8zDxUNgeBSg1SiIRf3Kloec69Se6w-Js