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
let statusCode1 = require('http-status-codes');
let { expect } = require('chai');
const urlBase1 = 'http://localhost:8080/';
it('Get all products', () => __awaiter(this, void 0, void 0, function* () {
    const response = yield agent.get(`${urlBase1}/api/product/`)
        .set('User-Agent', 'agent');
    expect(response.status).to.equal(statusCode1.StatusCodes.OK);
    expect(response.body).length > 0;
}));
module.exports = {};
//# sourceMappingURL=getAllProducts.test.js.map