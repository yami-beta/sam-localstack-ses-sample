import * as AWS from 'aws-sdk';
import { formHandler } from './formHandler';

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  endpoint: new AWS.Endpoint('http://localhost:4579'),
  region: 'us-east-1',
  credentials: new AWS.Credentials('dummy', 'dummy', 'dummy'),
});

describe('formHandler', () => {
  const url = 'http://localhost:3000/send';
  const config = {
    fromMailAddress: 'foo@example.com',
    toMailAddress: 'bar@example.com',
  };


  beforeAll(done => {
    ses.verifyDomainIdentity({
      Domain: 'example.com'
    }, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        done();
      }
    });
  });

  afterAll(done => {
    ses.deleteIdentity({
      Identity: 'example.com'
    }, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        done();
      }
    });
  });

  test('GET /send', done => {
    const event = { httpMethod: 'GET' };
    const context = null;
    const callback = (err, data) => {
      if (!err) {
        expect(data.statusCode).toBe(500);
        done();
      }
    };
    formHandler({ event, context, callback, ses, config });
  });

  test('POST /send', done => {
    const requestBody = {
      subject: 'Mail Subject',
      body: 'Mail Body'
    };

    const event = { httpMethod: 'POST', body: JSON.stringify(requestBody) };
    const context = null;
    const callback = (err, data) => {
      if (!err) {
        expect(data.statusCode).toBe(200);
        done();
      }
    };

    formHandler({ event, context, callback, ses, config });
  });
});
