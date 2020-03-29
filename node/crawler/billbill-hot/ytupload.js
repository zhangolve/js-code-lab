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
var EventEmitter = require('events')

const SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl',
                'https://www.googleapis.com/auth/youtube.upload',
                'https://www.googleapis.com/auth/youtube'];
const CREDS = 'client_secrets.json'
var TOKEN_PATH = 'google-apis-nodejs-quickstart.json'
// process.env.HTTPS_PROXY = 'http://127.0.0.1:8123';

class Emitter extends EventEmitter {}
var event = new Emitter()


function createResource(properties) {
    var resource = {};
    var normalizedProps = properties;
    for (var p in properties) {
        var value = properties[p];
        if (p && p.substr(-2, 2) == '[]') {
            var adjustedName = p.replace('[]', '');
            if (value) {
                normalizedProps[adjustedName] = value.split(',');
            }
            delete normalizedProps[p];
        }
    }
    for (var p in normalizedProps) {
        // Leave properties that don't have values out of inserted resource.
        if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
            var propArray = p.split('.');
            var ref = resource;
            for (var pa = 0; pa < propArray.length; pa++) {
                var key = propArray[pa];
                if (pa == propArray.length - 1) {
                    ref[key] = normalizedProps[p];
                } else {
                    ref = ref[key] = ref[key] || {};
                }
            }
        };
    }
    return resource;
  }
  
var tryCount = 0;

function videosInsert(auth, requestData) {
    // var service = google.youtube({ version: 'v3', proxy: 'http://127.0.0.1:' });
    var service = google.youtube({ version: 'v3', auth: auth });
    var fileName = requestData['mediaFilename'];
    var parameters = removeEmptyParameters(requestData['params']);
    parameters['auth'] = auth;
    parameters['media'] = { body: fs.createReadStream(requestData['mediaFilename']) };
    parameters['notifySubscribers'] = false;
    parameters['resource'] = createResource(requestData['properties']);
    var req = service.videos.insert(parameters, function(err, data) {
        if (err) {
            console.log('The API returned an error: ' + err);
            tryCount++
            // if(tryCount<3) {
            //     console.log(`retry uploading ${fileName}`)
            //     videosInsert(auth, requestData);
            // } else {
            //     tryCount = 0;
            //     event.emit('finished')
            // }
            // tryCount++
            // if(tryCount<5) {
            //     console.log(`retry uploading ${fileName}`)
            //     videosInsert(auth, requestData);
            // } else {
                    // event.emit('finished')
            //     process.exit();
            // }
            event.emit('finished')
        }
        if (data) {
            tryCount = 0;
            // service.playlistItems.insert({
            //     PLoHxWFMhISQy1npPfFLCzVpjV8SwSdTDU
            // }, function(err, response) {
            //     if (err) {
            //       console.log('The API returned an error: ' + err);
            //       return;
            //     }
            //     console.log(response);
            //   });
            }
            fs.unlink(fileName, function (err) {            
                if (err) {                                                 
                    console.error(err);                                    
                }                                                          
               console.log(fileName+ 'File has been Deleted');                           
            });
            console.log(util.inspect(data, false, null));
            event.emit('finished')
        }
    );
  
    var fileSize = fs.statSync(requestData['mediaFilename']).size;
    // show some progress
    event.emit('progress')

    // var id = setInterval(function () {
    //     // var uploadedBytes = req.req.connection._bytesDispatched;
    //     // var uploadedMBytes = uploadedBytes / 1048576;
    //     // var progress = uploadedBytes > fileSize ? 100 : (uploadedBytes / fileSize) * 100;
    //     // event.emit('progress', uploadedMBytes, fileSize / 1048576, progress)
    //     //console.log(uploadedMBytes.toFixed(2) + ' MBs uploaded. ' + progress.toFixed(2) + '% completed.');
    //     if (progress === 100) {
    //         console.log('Done uploading, waiting for response...');
    //         clearInterval(id);
    //     }
    // }, 250);
}


function removeEmptyParameters(params) {
    for (var p in params) {
        if (!params[p] || params[p] == 'undefined') {
            delete params[p];
        }
    }
    return params;
}


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

function upload(prop) {
    if (!prop.file) {
        console.log('No file is specified to upload!')
        process.exit()
    }
    fs.readFile(CREDS, (err, cont) => {
        if (err) {
            console.log('Error loading client secret file: \n', err)
            return
        }
        authorize(JSON.parse(cont), {
            'params': {
                'part': 'snippet, status'
            },
            'properties': {
                'snippet.categoryId': '22',
                'snippet.defaultLanguage': '',
                'snippet.description': prop.description ? prop.description : '',
                'snippet.tags[]': prop.tags ? prop.tags : '',
                'snippet.title': prop.title ? prop.title : prop.file,
                'status.embeddable': '',
                'status.license': '',
                'status.privacyStatus': prop.privacy ? prop.privacy : 'public',
                'status.publicStatsViewable': ''
            },
            'mediaFilename': prop.file
        }, videosInsert)
    })
}
fs.readFile(CREDS, (err, cont) => {
    if (err) {
        console.log('Error loading client secret file: \n', err)
        return
    }
authorize(JSON.parse(cont), {
    'params': {
        'part': 'snippet, status'
    },
    'properties': {
        'snippet.categoryId': '22',
        'snippet.defaultLanguage': '',
        'snippet.title': '333',
        'status.embeddable': '',
        'status.license': '',
        'status.privacyStatus': 'public',
        'status.publicStatsViewable': ''
    },
    'mediaFilename': 'fafefe'
}, ()=>{
    console.log('callback')
})
});

exports.upload = upload
exports.event = event

// 4/rgAR1F3fNiyz0QXZNG4X6fI8zDxUNgeBSg1SiIRf3Kloec69Se6w-Js