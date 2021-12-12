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
//let statusCode = require('http-status-codes');
let { expect } = require('chai');
const urlBase = 'http://localhost:8080/';
describe('Create customer the use get on it and delete it', () => {
    it('Create customer', () => __awaiter(this, void 0, void 0, function* () {
        const datos = 
        //El customer id que se envíe no importa finalmente, no necesariamente se recibe el mismo
        {
            "customerId": 0,
            "name": "Sally Vallery",
            "address": "144 Townsend, San Francisco 99999",
            "email": "sally@example.com",
            "phone": "513 222 5555",
            "username": "sallyv",
            "password": "sallypassword",
            "enabled": "true",
            "role": "USER"
        };
        const response = yield agent.post(`${urlBase}/api/customer/`)
            .query(datos)
            .set('User-Agent', 'agent');
        expect(response.body).length > 0;
        const id = response.body.customerId;
        it('Get customer', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield agent.get(`${urlBase}/api/customer/${id}`)
                .query(datos)
                .set('User-Agent', 'agent');
            const user = response.body.find((x) => x.customerIf === id);
            console.log(user); // si el usuario no existe -> undefined
            expect(user).to.not.equal(undefined);
        }));
    }));
});
module.exports = {};
//# sourceMappingURL=createAndGetCustomer.test.js.map