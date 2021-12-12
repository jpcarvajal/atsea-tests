var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let agent = require('superagent');
let statusCode = require('http-status-codes');
const chai = require('chai');
const urlBase = 'http://localhost:8080/';
describe('Get all products', () => __awaiter(this, void 0, void 0, function* () {
    it('Get all products', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield agent.get(`${urlBase}/api/product/`)
            .set('User-Agent', 'agent');
        chai.expect(response.status).to.equal(statusCode.StatusCodes.OK);
        chai.expect(response.body).length > 0;
    }));
}));
//# sourceMappingURL=getAllProducts.test.js.map