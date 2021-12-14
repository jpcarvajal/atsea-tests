let agent3 = require('superagent');
//let statusCode2 = require('http-status-codes');
let urlBase3 = '3.145.12.111:8080/';
const chai2 = require('chai')

describe('Create a customer, login, make a purchase and finally delete it', () => {
    let id
    let token
    it('Create customer', async () => {
      const datos = 
      //El customer id que se envíe no importa finalmente, no necesariamente se recibe el mismo
      {
        "customerId" : 0,
        "name"       : "Sally Vallery",
        "address"    : "144 Townsend, San Francisco 99999",
        "email"      : "sally@example.com",
        "phone"      : "513 222 5555",
        "username"   : "sallyv",
        "password"   : "sallypassword",
        "enabled"    : "true",
        "role"       : "USER"
      }
      const response = await agent3.post(`${urlBase3}/api/customer/`)
        .send(datos)
        .set('User-Agent', 'agent')
        .set('Content-Type', 'application/json');    
      
      //201 = created
      chai2.expect(response.status).equal(201)
      chai2.expect(response.body).length>0;

      id = response.body.customerId
      });
    
      it("Login", async () => {
        const response = await agent3.post(`${urlBase3}/login/`)
          .send({ username : 'sallyv', password: 'sallypassword' })
          .set('User-Agent', 'agent');    
        
      chai2.expect(response.status).to.equal(200);
      token = response.body.token
    });

    it("Attempt to login with wrong password", async () => {
        await agent3.post(`${urlBase3}/login/`)
          .send({ username : 'sallyv', password: 'sallypassword2' })
          .set('User-Agent', 'agent')
          .catch(error => {
            //401 = unauthorized
            chai2.expect(error.status).to.equal(401);
          });    
    });

    it("Attempt to login with wrong username", async () => {
      await agent3.post(`${urlBase3}/login/`)
        .send({ username : 'sallyv2', password: 'sallypassword' })
        .set('User-Agent', 'agent')
        .catch(error => {
          //401 = unauthorized
          chai2.expect(error.status).to.equal(404);
        });    
  });

    it("Purchase", async () => {
        const response = await agent3.get(`${urlBase3}/purchase/`)
          .set("Authorization", `Bearer ${token}`)
          .set('User-Agent', 'agent');    
        
      chai2.expect(response.status).to.equal(200);
      chai2.expect(response.body).length>0;
    });

    it("Delete customer", async () => {
        const response = await agent3.delete(`${urlBase3}/api/customer/${id}`)
          .set('User-Agent', 'agent');    
        
      chai2.expect(response.status).to.equal(204);
    });

    it("Attempt to purchase without logging in", async () => {
      await agent3.get(`${urlBase3}/purchase/`)
        .set('User-Agent', 'agent')
        .catch(error => {
          //500 = Internal server error
          chai2.expect(error.status).to.equal(500);
      });   
  });
});