var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let agent4 = require('superagent');
//let statusCode2 = require('http-status-codes');
let urlBase4 = 'http://localhost:8080/utility';
const chai3 = require('chai').use(require('chai-json-schema')); //npm install chai-json-schema
const utilitiesSchema = require('../../src/utilitiesSchema.schema.ts');
describe('Perform databasehealthchek and check container Id using schemas', () => {
    it('Databasehealthcheck', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield agent4.get(`${urlBase4}/healthcheck/`)
            .set('User-Agent', 'agent')
            .set('Content-Type', 'application/json');
        chai3.expect(response.status).equal(200);
        chai3.expect(response.body).to.be.jsonSchema(utilitiesSchema.getDatabaseHealthcheck);
    }));
    it("Login", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield agent4.get(`${urlBase4}/containerid/`)
            .set('User-Agent', 'agent');
        chai3.expect(response.status).to.equal(200);
        chai3.expect(response.body).to.be.jsonSchema(utilitiesSchema.getContainerId);
    }));
});
//# sourceMappingURL=systemUtilities.test.js.map