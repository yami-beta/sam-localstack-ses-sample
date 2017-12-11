const AWS = require('aws-sdk');

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  endpoint: new AWS.Endpoint(process.env.AWS_END_POINT),
});

const sendMail = (subject, body) => {
  return new Promise((resolve, reject) => {
    const params = {
      Source: process.env.FROM_MAIL_ADDRESS,
      Destination: {
        ToAddresses: [ process.env.TO_MAIL_ADDRESS ],
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

    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.log(`[ERROR] Failed to send mail: ${err}`, err.stack);
        reject(err);
      }
      resolve(data);
    });
  });
}

const createResponse = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

exports.handler = (event, context, callback) => {
  switch(event.httpMethod) {
    case 'POST': {
      const json = JSON.parse(event.body);
      sendMail(json.subject, json.body).then((result) => {
        callback(null, createResponse(200, { message: 'Succeed to send mail' }))
      }).catch((err) => {
        callback(null, createResponse(500, { message: 'Faild to send mail' }))
      });
      break;
    }
    default: {
      callback(null, createResponse(500, { message: 'Internal Server Error' } ))
    }
  }
};
