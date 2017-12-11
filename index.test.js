const AWS = require('aws-sdk');
const fetch = require('node-fetch');

describe('Integration test for lambda', () => {
  const url = 'http://localhost:3000/send';

  test('GET /send', done => {
    fetch(url)
      .then(res => {
        expect(res.status).toBe(404);
        done();
      });
  });

  test('POST /send', done => {
    const body = { subject: 'Mail Subject', body: 'Mail Body' };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      expect(res.status).toBe(200);
      return res.json()
    }).then(json => {
      expect(json.message).toBe('Succeed to send mail');
      done();
    });
  })
});
