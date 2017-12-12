
const createResponse = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

const sendMail = (ses, subject, body, config) => {
  return new Promise((resolve, reject) => {
    const params = {
      Source: config.fromMailAddress,
      Destination: {
        ToAddresses: [ config.toMailAddress ],
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
};

export const formHandler = ({ event, context, callback, ses, config }) => {
  switch(event.httpMethod) {
    case 'POST': {
      const json = JSON.parse(event.body);
      sendMail(ses, json.subject, json.body, config).then((result) => {
        callback(null, createResponse(200, { message: 'Succeed to send mail' }))
      }).catch((err) => {
        callback(null, createResponse(500, { message: err.message }))
      });
      break;
    }
    default: {
      callback(null, createResponse(500, { message: 'Internal Server Error' } ))
    }
  }
};

