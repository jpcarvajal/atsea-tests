var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let agent2 = require('superagent');
//let statusCode2 = require('http-status-codes');
let urlBase2 = 'http://localhost:8080/';
const { expect } = require('chai').use(require('chai-json-schema')); //npm install chai-json-schema
const customerSchema = require('../../src/customerSchema.schema.ts');
describe('Create a customer, update it and then delete all customers', () => {
    let id;
    let newId;
    let newAddress;
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
        const response = yield agent2.post(`${urlBase2}/api/customer/`)
            .send(datos)
            .set('User-Agent', 'agent')
            .set('Content-Type', 'application/json');
        expect(response.body).length > 0;
        //201 = created
        expect(response.status).equal(201);
        id = response.body.customerId;
    }));
    it('Attempt to create a customer with the same username (should return conflict)', () => __awaiter(this, void 0, void 0, function* () {
        const datos = {
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
        yield agent2.post(`${urlBase2}/api/customer/`)
            .send(datos)
            .set('User-Agent', 'agent')
            .set('Content-Type', 'application/json')
            .catch(error => {
            //409 = conflict
            expect(error.status).to.equal(409);
        });
    }));
    it('Update customer and check updated schema', () => __awaiter(this, void 0, void 0, function* () {
        const datosActualizados = {
            "customerId": 0,
            "name": "Sally Vallery",
            "address": "144 Townsend, San Francisco 9997",
            "email": "sally@example.com",
            "phone": "513 222 5555",
            "username": "sallyv",
            "password": "sallynewpassword",
            "enabled": "true",
            "role": "USER"
        };
        const response = yield agent2.put(`${urlBase2}/api/customer/${id}`)
            .send(datosActualizados)
            .set('User-Agent', 'agent')
            .set('Content-Type', 'application/json');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.jsonSchema(customerSchema.putCustomerSchema);
        newId = response.body.customerId;
        newAddress = response.body.address;
    }));
    it("Attempt to update customer using an Id that doesn't exist", () => __awaiter(this, void 0, void 0, function* () {
        const datosActualizados = {
            "customerId": 0,
            "name": "Sally Vallery",
            "address": "144 Townsend, San Francisco 9997",
            "email": "sally@example.com",
            "phone": "513 222 5555",
            "username": "sallyv",
            "password": "sallynewpassword",
            "enabled": "true",
            "role": "USER"
        };
        yield agent2.put(`${urlBase2}/api/customer/-1`)
            .send(datosActualizados)
            .set('User-Agent', 'agent')
            .set('Content-Type', 'application/json')
            .catch(error => {
            //409 = conflict
            expect(error.status).to.equal(404);
        });
    }));
    it("Get updated customer's address and schema by Id", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield agent2.get(`${urlBase2}/api/customer/${newId}`)
            .set('User-Agent', 'agent');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.jsonSchema(customerSchema.getCustomerSchema);
        expect(response.body.address).to.equal(newAddress);
    }));
    it("Attempt to get a customer using an Id that doesn't exist", () => __awaiter(this, void 0, void 0, function* () {
        yield agent2.get(`${urlBase2}/api/customer/-1`)
            .set('User-Agent', 'agent')
            .catch(error => {
            //409 = conflict
            expect(error.status).to.equal(404);
        });
    }));
    it('Delete all costumers', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield agent2.delete(`${urlBase2}/api/customer/`)
            .set('User-Agent', 'agent');
        //201 = no content
        expect(response.status).to.equal(204);
    }));
});
//# sourceMappingURL=createAndGetCustomer.test.js.map