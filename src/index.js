import * as AWS from 'aws-sdk';
import { formHandler } from './formHandler';

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  endpoint: new AWS.Endpoint(process.env.AWS_END_POINT),
});

const config = {
  fromMailAddress: process.env.FROM_MAIL_ADDRESS,
  toMailAddress: process.env.TO_MAIL_ADDRESS,
};


exports.handler = (event, context, callback) => {
  formHandler({ event, context, callback, ses, config });
};
