let agent4 = require('superagent');
//let statusCode2 = require('http-status-codes');
let urlBase4 = '3.145.12.111:8080/';
const chai3 = require('chai').use(require('chai-json-schema')); //npm install chai-json-schema
const utilitiesSchema = require('../../src/utilitiesSchema.schema.ts');

describe('Perform databasehealthchek and check container Id using schemas', () => {
    it('Databasehealthcheck', async () => {
      const response = await agent4.get(`${urlBase4}utility/healthcheck/`)
        .set('User-Agent', 'agent')
        .set('Content-Type', 'application/json');    
      
      chai3.expect(response.status).equal(200)
      chai3.expect(response.body).to.be.jsonSchema(utilitiesSchema.getDatabaseHealthcheck);
    });

    it("Login", async () => {
        const response = await agent4.get(`${urlBase4}utility/containerid/`)
          .set('User-Agent', 'agent');    
        
      chai3.expect(response.status).to.equal(200);
      chai3.expect(response.body).to.be.jsonSchema(utilitiesSchema.getContainerId);
    });
});