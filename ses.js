const AWS = require('aws-sdk');

ses.verifyDomainIdentity({
  Domain: 'example.com'
}, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
    // ses.verifyEmailIdentity({
    //   EmailAddress: 'bar@example.com',
    // }, (err, data) => {
    //     if (err) {
    //       console.log(err, err.stack);
    //     } else {
    //       console.log(data);
    //     }
    // });
  }
});

export default class MailClient {
  constructor(config) {
    this.endPoint = config.endPoint;
    this.fromMailAddress = config.fromMailAddress;
    this.toMailAddress = config.toMailAddress;

    this.ses = new AWS.SES({
      apiVersion: '2010-12-01',
      endpoint: new AWS.Endpoint(this.config.endPoint),
    });
  }

  sendMail(subject, body) {
    return new Promise((resolve, reject) => {
      const params = {
        Source: this.config.fromMailAddress,
        Destination: {
          ToAddresses: [ this.config.toMailAddress ],
        },
        Message: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8'
          },
          Body: {
            Text: {
              Data: body,
              Charset: 'UTF-8'
            }
          }
        }
      };

      this.ses.sendEmail(params, (err, data) => {
        if (err) {
          console.log(`[ERROR] Failed to send mail: ${err}`, err.stack);
          reject(err);
        }
        resolve(data);
      });
    });

  }
}

