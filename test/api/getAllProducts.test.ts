let agent = require('superagent');
let statusCode = require('http-status-codes');
const chai = require('chai');
const urlBase = 'http://localhost:8080/';

describe('Get all products', async () => {
  it('Get all products', async () => {
      const response = await agent.get(`${urlBase}/api/product/`)
        .set('User-Agent', 'agent');

      chai.expect(response.status).to.equal(statusCode.StatusCodes.OK);
      chai.expect(response.body).length>0;
  });
});
