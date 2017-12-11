const AWS = require('aws-sdk');
const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  endpoint: new AWS.Endpoint('http://127.0.0.1:4579'),
});

ses.verifyDomainIdentity({
  Domain: 'example.com'
}, (err, data) => {
  if (err) {
    console.log(`[ERROR] Failed to verify domain: ${err.stack || err}`);
  } else {
    console.log(data);
  }
});
